import { useCallback, useEffect, useRef, useState } from "react";
import { ARTISTS } from "./artists";
import {
  createStats,
  nextPair,
  pairKey,
  recordResult,
  rankArtists,
  makeShareText,
  makeHistoryEntry,
  pluralMatches,
  totalPairs,
  loadHistory,
  saveHistoryEntry,
  clearHistory,
} from "./battleLogic";
import ParticleBackground from "./ParticleBackground";
import "./ArtistBattle.css";

const TOTAL_PAIRS = totalPairs(ARTISTS.length);
const DEFAULT_MATCHES = Math.min(30, TOTAL_PAIRS);
const MIN_MATCHES = Math.min(5, TOTAL_PAIRS);
const QUICK_COUNTS = [10, 20, 30, 50, 100].filter((n) => n < TOTAL_PAIRS);

function Avatar({ artist, className = "" }) {
  const [failed, setFailed] = useState(false);
  const initials =
    artist.name.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "").slice(0, 2).toUpperCase() || "?";

  return (
    <div
      className={"avatar " + className}
      style={{ "--accent": artist.accent }}
    >
      {failed || !artist.photo ? (
        <div className="avatar-fallback">{initials}</div>
      ) : (
        <img
          src={artist.photo}
          alt={artist.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ objectPosition: artist.objectPosition || "center" }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* пробуем старый способ */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function ArtistBattle({ onBack }) {
  const [stage, setStage] = useState("intro");
  const [matchCount, setMatchCount] = useState(DEFAULT_MATCHES);
  const [stats, setStats] = useState(null);
  const [usedPairs, setUsedPairs] = useState(null);
  const [pair, setPair] = useState(null);
  const [played, setPlayed] = useState(0);
  const [picked, setPicked] = useState(null);
  const [boost, setBoost] = useState(0);
  const [history, setHistory] = useState(() => loadHistory());
  const [shareNote, setShareNote] = useState("");

  const timeoutRef = useRef(null);
  const lockRef = useRef(false);
  const voteRef = useRef(null);

  const ranking = stats ? rankArtists(ARTISTS, stats) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const start = () => {
    clearTimeout(timeoutRef.current);
    const freshStats = createStats(ARTISTS);
    const freshUsed = new Set();
    const firstPair = nextPair(ARTISTS, freshStats, freshUsed);
    if (!firstPair) return;
    setStats(freshStats);
    setUsedPairs(freshUsed);
    setPair(firstPair);
    setPlayed(0);
    setPicked(null);
    setBoost(0);
    setShareNote("");
    lockRef.current = false;
    setStage("battle");
  };

  const finish = useCallback((finalStats, playedCount) => {
    const finalRanking = rankArtists(ARTISTS, finalStats);
    setHistory(saveHistoryEntry(makeHistoryEntry(finalRanking, playedCount)));
    setStats(finalStats);
    setPlayed(playedCount);
    setPair(null);
    setPicked(null);
    setBoost(1);
    lockRef.current = false;
    setStage("result");
  }, []);

  const vote = useCallback((winnerId) => {
    if (stage !== "battle" || !pair || picked || lockRef.current) return;
    lockRef.current = true;
    setPicked(winnerId);

    const loserId = pair[0].id === winnerId ? pair[1].id : pair[0].id;
    const nextStats = recordResult(stats, winnerId, loserId);
    const nextUsed = new Set(usedPairs);
    nextUsed.add(pairKey(pair[0].id, pair[1].id));
    const nextPlayed = played + 1;
    const target = Math.min(matchCount, TOTAL_PAIRS);

    timeoutRef.current = setTimeout(() => {
      const followingPair =
        nextPlayed >= target ? null : nextPair(ARTISTS, nextStats, nextUsed);

      if (!followingPair) {
        finish(nextStats, nextPlayed);
        return;
      }

      setStats(nextStats);
      setUsedPairs(nextUsed);
      setPlayed(nextPlayed);
      setPair(followingPair);
      setPicked(null);
      lockRef.current = false;
    }, 620);
  }, [stage, pair, picked, stats, usedPairs, played, matchCount, finish]);

  useEffect(() => {
    voteRef.current = vote;
  }, [vote]);

  useEffect(() => {
    if (stage !== "battle" || !pair) return;
    const onKey = (event) => {
      if (event.key === "ArrowLeft" || event.key === "1") {
        event.preventDefault();
        voteRef.current?.(pair[0].id);
      } else if (event.key === "ArrowRight" || event.key === "2") {
        event.preventDefault();
        voteRef.current?.(pair[1].id);
      } else if (event.key === "Escape") {
        onBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, pair, onBack]);

  const share = async () => {
    const text = makeShareText(ranking, played);
    if (navigator.share) {
      try {
        await navigator.share({ title: "Моя битва артистов", text });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const ok = await copyText(text);
    setShareNote(ok ? "Топ скопирован в буфер" : "Не удалось скопировать");
    setTimeout(() => setShareNote(""), 2600);
  };

  const copyTop = async () => {
    const ok = await copyText(makeShareText(ranking, played));
    setShareNote(ok ? "Топ скопирован в буфер" : "Не удалось скопировать");
    setTimeout(() => setShareNote(""), 2600);
  };

  const resetHistory = () => setHistory(clearHistory());

  const percent = TOTAL_PAIRS
    ? ((matchCount - MIN_MATCHES) / Math.max(1, TOTAL_PAIRS - MIN_MATCHES)) * 100
    : 100;
  const progressCount = Math.min(played + (picked ? 1 : 0), matchCount);
  const progressPercent = matchCount
    ? Math.min(100, (progressCount / matchCount) * 100)
    : 0;

  return (
    <>
      <ParticleBackground boost={boost} symbol="⚔️" />

      <div className="app">
        <div className="inner">
          <header className="header battle-header">
            <h1>⚔️ Битва артистов</h1>
            <div className="subtitle">
              {stage === "intro"
                ? "КТО ЛУЧШИЙ ИЗ ЛУЧШИХ"
                : stage === "battle"
                  ? `МАТЧ ${Math.min(played + 1, matchCount)} ИЗ ${matchCount}`
                  : "ТВОЙ ТОП"}
            </div>
          </header>

          {stage === "intro" && (
            <div className="board battle-board">
              <button className="btn ghost back-btn" onClick={onBack}>
                ← В лобби
              </button>

              <div className="battle-intro-head">
                <h2>Выбери лучшего из лучших</h2>
                <p>
                  Пары выпадают случайно, поэтому каждый раз топ получается
                  новым. Голосуй сердцем — рейтинг считается автоматически.
                </p>
              </div>

              <div className="roster-grid">
                {ARTISTS.map((artist) => (
                  <div
                    key={artist.id}
                    className="roster-item"
                    style={{ "--accent": artist.accent }}
                  >
                    <Avatar artist={artist} className="roster-avatar" />
                    <span className="roster-symbol">{artist.symbol}</span>
                    <span className="roster-name" title={artist.name}>
                      {artist.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="battle-setting">
                <div className="setting-top">
                  <span>Сколько матчей сыграем?</span>
                  <b>
                    {matchCount} {pluralMatches(matchCount)}
                  </b>
                </div>

                <input
                  className="battle-range"
                  type="range"
                  min={MIN_MATCHES}
                  max={TOTAL_PAIRS}
                  value={matchCount}
                  style={{ "--fill": `${percent}%` }}
                  onChange={(event) => setMatchCount(Number(event.target.value))}
                  aria-label="Количество матчей"
                />

                <div className="battle-chips">
                  {QUICK_COUNTS.map((n) => (
                    <button
                      key={n}
                      className={"battle-chip" + (matchCount === n ? " active" : "")}
                      onClick={() => setMatchCount(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    className={
                      "battle-chip" + (matchCount === TOTAL_PAIRS ? " active" : "")
                    }
                    onClick={() => setMatchCount(TOTAL_PAIRS)}
                  >
                    Все
                  </button>
                </div>

                <div className="setting-note">
                  Всего возможно {TOTAL_PAIRS} уникальных пар. Советуем 20–30 —
                  примерно 3–5 пар на каждого артиста.
                </div>
              </div>

              <button className="btn primary battle-start" onClick={start}>
                ⚔️ Начать битву
              </button>

              {history.length > 0 && (
                <details className="battle-history">
                  <summary>
                    Прошлые битвы <span>{history.length}</span>
                  </summary>
                  <div className="history-list">
                    {history.slice(0, 8).map((entry) => (
                      <div className="history-row" key={entry.id}>
                        <span className="history-date">
                          {new Date(entry.date).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                        <span className="history-champ">
                          {entry.ranking?.[0]?.symbol} {entry.ranking?.[0]?.name}
                        </span>
                        <span className="history-meta">
                          {entry.matches} {pluralMatches(entry.matches)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="history-clear" onClick={resetHistory}>
                    Очистить историю
                  </button>
                </details>
              )}
            </div>
          )}

          {stage === "battle" && pair && stats && (
            <div className="board battle-board">
              <div className="battle-topline">
                <button className="btn ghost back-btn" onClick={onBack}>
                  ← Выйти
                </button>
                <span className="battle-counter">
                  Матч {Math.min(played + 1, matchCount)} / {matchCount}
                </span>
              </div>

              <div className="progress-track battle-progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="battle-arena">
                {pair.map((artist, index) => {
                  const isWinner = picked === artist.id;
                  const isLoser = picked && picked !== artist.id;
                  return (
                    <button
                      key={artist.id}
                      type="button"
                      className={
                        "fighter" +
                        (isWinner ? " winner" : "") +
                        (isLoser ? " loser" : "")
                      }
                      style={{ "--accent": artist.accent }}
                      onClick={() => vote(artist.id)}
                      disabled={Boolean(picked)}
                      aria-label={`Выбрать ${artist.name}`}
                    >
                      <div className="fighter-photo">
                        <Avatar artist={artist} className="fighter-avatar" />
                        <span className="fighter-symbol">{artist.symbol}</span>
                      </div>
                      <div className="fighter-name">{artist.name}</div>
                      <div className="fighter-record">
                        {stats[artist.id].wins}–{stats[artist.id].losses}
                        <span className="fighter-rating">
                          {stats[artist.id].rating}
                        </span>
                      </div>
                      <span className="fighter-key">
                        {index === 0 ? "← / 1" : "→ / 2"}
                      </span>
                    </button>
                  );
                })}
                <div className="vs-badge" aria-hidden="true">
                  VS
                </div>
              </div>

              <div className="battle-hint">
                Клик по фото или <kbd>←</kbd> <kbd>→</kbd> — выбрать
                победителя. <kbd>Esc</kbd> — выйти.
              </div>
            </div>
          )}

          {stage === "result" && stats && (
            <div className="board battle-board">
              <button className="btn ghost back-btn" onClick={onBack}>
                ← В лобби
              </button>

              <div className="battle-result-head">
                <div className="battle-result-title">🏆 Битва окончена</div>
                <div className="battle-result-sub">
                  {played} {pluralMatches(played)} · {ARTISTS.length} артистов
                </div>
              </div>

              <div className="podium">
                {[ranking[1], ranking[0], ranking[2]]
                  .filter(Boolean)
                  .map((artist) => (
                    <div
                      key={artist.id}
                      className={"podium-card place-" + artist.place}
                      style={{ "--accent": artist.accent }}
                    >
                      <div className="podium-medal">
                        {artist.place === 1 ? "👑" : artist.place === 2 ? "🥈" : "🥉"}
                      </div>
                      <Avatar artist={artist} className="podium-avatar" />
                      <div className="podium-name">{artist.name}</div>
                      <div className="podium-rating">{artist.rating}</div>
                      <div className="podium-record">
                        {artist.wins}–{artist.losses}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="battle-table">
                <div className="battle-row battle-row-head">
                  <span>#</span>
                  <span />
                  <span>Артист</span>
                  <span>W–L</span>
                  <span>Рейтинг</span>
                </div>
                {ranking.map((artist) => (
                  <div
                    key={artist.id}
                    className={
                      "battle-row" + (artist.place <= 3 ? " top-three" : "")
                    }
                  >
                    <span className="row-place">{artist.place}</span>
                    <Avatar
                      artist={artist}
                      className="row-avatar"
                    />
                    <span className="row-name">
                      <span className="row-symbol">{artist.symbol}</span>
                      {artist.name}
                    </span>
                    <span className="row-record">
                      {artist.wins}–{artist.losses}
                    </span>
                    <span className="row-rating">{artist.rating}</span>
                  </div>
                ))}
              </div>

              <div className="result-actions">
                <button className="btn primary" onClick={start}>
                  🔄 Ещё раз
                </button>
                <button className="btn ghost" onClick={onBack}>
                  ← В лобби
                </button>
                <button className="btn ghost" onClick={share}>
                  📤 Поделиться
                </button>
                <button className="btn ghost" onClick={copyTop}>
                  📋 Скопировать топ
                </button>
              </div>
              {shareNote && <div className="share-note">{shareNote}</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
