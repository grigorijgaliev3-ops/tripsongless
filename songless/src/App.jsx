import { useState, useRef, useEffect } from "react";
import "./App.css";

const TRACKS = [
  { file: "1. MR.BL & TF - AK.mp3",                       answer: "AK" },
  { file: "2. TRIPPL FLOW, LPUNK - KROST.mp3",            answer: "KROST" },
  { file: "3. LiL PUNK feat. TRIPPL FLOW - КЭШ.mp3",      answer: "КЭШ" },
  { file: "4. TRIPPL FLOW - наш день 2.0.mp3",            answer: "наш день 2.0" },
  { file: "5. TRIPPL FLOW - СВЯЗЬ.mp3",                   answer: "СВЯЗЬ" },
  { file: "6. TRIPPL FLOW (FEAT.LP) - ААААААА.mp3",       answer: "ААААААА" },
  { file: "7. TRIPPL FLOW - FUHTA.mp3",                   answer: "FUHTA" },
  { file: "8. trippl flow - 14.mp3",                      answer: "14" },
  { file: "9. TRIPPL FLOW - анечке.mp3",                  answer: "анечке" },
  { file: "10. TRIPPL FLOW - IN THE SWAG.mp3",            answer: "IN THE SWAG" },
  { file: "11. trippl flow - Когда стану популярным.mp3", answer: "Когда стану популярным" },
  { file: "12. trippl flow - пару слов про бать.mp3",     answer: "пару слов про бать" },
  { file: "13. TRIPPL FLOW, LPUNK - КАЖДЫЙ ДЕНЬ (ремикс).mp3", answer: "КАЖДЫЙ ДЕНЬ (ремикс)" },
  { file: "14. TRIPPL FLOW - косячок.mp3",                answer: "косячок" },
  { file: "15. TRIPPL FLOW - ЛУЧШИЕ ДРУЗЬЯ.mp3",          answer: "ЛУЧШИЕ ДРУЗЬЯ" },
  { file: "16. TF - собака.mp3",                          answer: "собака" },
  { file: "17. TRIPPL FLOW - осв.mp3",                    answer: "осв" },
  { file: "18. TRIPPL FLOW - GANGSHIT.mp3",               answer: "GANGSHIT" },
  { file: "19. TRIPPL FLOW - МОЛОДОЙ ТРИПЛ.mp3",          answer: "МОЛОДОЙ ТРИПЛ" },
  { file: "20. TRIPPL FLOW - NOKIA (3310).mp3",           answer: "NOKIA (3310)" },
  { file: "21. TRIPPL FLOW - МОЙ СТИЛЬ.mp3",              answer: "МОЙ СТИЛЬ" },
  { file: "22. TRIPPL FLOW, LPUNK - Маленький панк.mp3",  answer: "Маленький панк" },
  { file: "23. TRIPPL FLOW - TRIPPL FLOW.mp3",            answer: "TRIPPL FLOW" },
  { file: "24. LIL - PUHK.mp3",                           answer: "PUHK" },
  { file: "25. TRIPPL FLOW - ОНИ ВСЕ ЗНАЛИ.mp3",          answer: "ОНИ ВСЕ ЗНАЛИ" },
  { file: "26. TRIPPL FLOW - ФРИСТАИЛ.mp3",               answer: "ФРИСТАИЛ" },
  { file: "27. trippl flow - лпунк пидр.mp3",             answer: "лпунк пидр" },
  { file: "28. tf & фрукты - наш день.mp3",               answer: "наш день" },
  { file: "29. TRIPPL FLOW feat. LiL PUNK - Каждый день.mp3", answer: "Каждый день" },
  { file: "30. TRIPPL FLOW - оу да.mp3",                  answer: "оу да" },
  { file: "31. tf & mr.Bl - друг.mp3",                    answer: "друг" },
  { file: "32. tf - деньги(offical aiduo).mp3",           answer: "деньги" },
  { file: "33. TF - ЧУПА-ЧУПС.mp3",                       answer: "ЧУПА-ЧУПС" },
  { file: "34. TF feat. LiL PUNK - Party.mp3",            answer: "Party" },
  { file: "35. TF - ЛЮБОВЬ.mp3",                          answer: "ЛЮБОВЬ" },
  { file: "36. TF - Ебать я умный.mp3",                   answer: "Ебать я умный" },
  { file: "37. TF - ДИСС НА TRIPPL FLOW.mp3",             answer: "ДИСС НА TRIPPL FLOW" },
  { file: "38. TF - Цепи.mp3",                            answer: "Цепи" },
  { file: "39. TF - Я ТЭФЭ.mp3",                          answer: "Я ТЭФЭ" },
  { file: "40. TF - FUCK PLAY.mp3",                       answer: "FUCK PLAY" },
  { file: "41. TF - НА БИТАХ.mp3",                        answer: "НА БИТАХ" },
  { file: "42. TRIPPL FLOW - КИВИ.mp3",                   answer: "КИВИ" },
  { file: "43. TF - НАРКОТИКИ.mp3",                       answer: "НАРКОТИКИ" },
  { file: "44. TRIPPL FLOW - ЧСВ.mp3",                    answer: "ЧСВ" },
  { file: "45. MC FRIGUS - IVAN NUMBER ONE.mp3",          answer: "IVAN NUMBER ONE" },
  { file: "46. TRIPPL FLOW - Комп.mp3",                   answer: "Комп" },
  { file: "47. trippl flow - катана.mp3",                 answer: "катана" },
  { file: "48. trippl flow - БМВ.mp3",                    answer: "БМВ" },
  { file: "49. tripll flow - 02.mp3",                     answer: "02" },
  { file: "50. TRIPPL FLOW - 15.mp3",                     answer: "15" },
  { file: "51. trippl flow - intro.mp3",                  answer: "intro" },
  { file: "52. TRIPPL FLOW - NOKIA (3310).mp3",           answer: "NOKIA (3310)" },
  { file: "53. TRIPL FLOW - я перевернул фитами жидов.mp3", answer: "я перевернул фитами жидов" },
  { file: "54. TF feat. 7stars, Alonilon - троинное.mp3", answer: "троинное" },
  { file: "55. TF, 7stars - Папам.mp3",                   answer: "Папам" },
  { file: "56. TF - Scr3amrightnow.mp3",                  answer: "Scr3amrightnow" },
  { file: "57. TF, 7stars - диджейпапа.mp3",              answer: "диджейпапа" },
  { file: "58. TF, 7STARS - Кхекхешнейлефапэпэ.mp3",      answer: "Кхекхешнейлефапэпэ" },
  { file: "59. TF, 7STARS - ILL.mp3",                     answer: "ILL" },
  { file: "60. TF, 7STARS - Кристина.mp3",                answer: "Кристина" },
  { file: "61. TF, 7STARS - Loveisdeath.mp3",             answer: "Loveisdeath" },
  { file: "62. TF, ALONILON - ПАХНЕШЬ ЦВЕТАМИ.mp3",       answer: "ПАХНЕШЬ ЦВЕТАМИ" },
  { file: "63. TF, BYCHESS, MARKPULYA, ALONILON - САЙФЕР АФТЕРПАТИ.mp3", answer: "САЙФЕР АФТЕРПАТИ" },
  { file: "64. TF - пуэр.mp3",                            answer: "пуэр" },
  { file: "65. TF, 7stars - Сасок.mp3",                   answer: "Сасок" },
  { file: "66. Alonilon, TF - САДИК.mp3",                 answer: "САДИК" },
  { file: "67. tf, Alonilon - СЕВЕР.mp3",                 answer: "СЕВЕР" },
  { file: "68. TF и другие - НЕ ВЫЕБЫВАЙСЯ.mp3",          answer: "НЕ ВЫЕБЫВАЙСЯ" },
  { file: "69. TF, bychess, alonilon - NEW LOVE.mp3",     answer: "NEW LOVE" },
];

const DURATIONS = [0.5, 1, 2, 4, 8, 16];
const MAX_ATTEMPTS = 6;

const SCORES = [6, 5, 4, 3, 2, 1];
const MAX_SCORE = TRACKS.length * SCORES[0];

const normalizeStrict = (s) => s.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
const normalizeSoft = (s) =>
  s.toLowerCase().replace(/[–—−]/g, "-").replace(/\s+/g, " ").trim();

const displayName = (file) =>
  file.replace(/^\d+\.\s*/, "").replace(/\.(mp3|m4a)$/i, "");

// определение тач-устройства — чтобы не открывать клаву автоматом
const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function SaltBackground({ boost }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const boostRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(28, Math.max(10, Math.floor((width * height) / 90000)));

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 14 + Math.random() * 22,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      rot: (Math.random() - 0.5) * 0.2,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      alpha: 0.12 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
    }));

    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(50, now - last) / 16.67;
      last = now;

      boostRef.current += (boost - boostRef.current) * 0.04;
      const b = boostRef.current;
      const speedMult = 1 + b * 8;
      const scaleMult = 1 + b * 0.4;

      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.vx * dt * speedMult;
        p.y += p.vy * dt * speedMult;
        p.rot += p.rotSpeed * dt * speedMult;
        p.phase += 0.015 * speedMult;

        if (p.x < -60) p.x = width + 60;
        if (p.x > width + 60) p.x = -60;
        if (p.y < -60) p.y = height + 60;
        if (p.y > height + 60) p.y = -60;

        const pulse = 0.85 + Math.sin(p.phase) * 0.15;
        const size = p.size * scaleMult * pulse;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = p.alpha * (1 + b * 0.9);
        ctx.shadowBlur = 20 * (1 + b * 2);
        ctx.shadowColor = "rgba(167, 139, 250, 0.9)";
        ctx.fillText("🧂", 0, 0);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [boost]);

  return <canvas ref={canvasRef} className="bg-canvas" />;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [pool, setPool] = useState(() => shuffle(TRACKS));
  const [poolIndex, setPoolIndex] = useState(0);

  const [guess, setGuess] = useState("");
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState(null);
  const [boost, setBoost] = useState(0);

  const [trackScore, setTrackScore] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapperRef = useRef(null);

  const audioRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(0);

  const track = pool[poolIndex];
  const tracksTotal = pool.length;

  const query = normalizeSoft(guess);
  const matches = query
    ? TRACKS.filter((t) => {
        const shown = normalizeSoft(displayName(t.file));
        return shown.includes(query) || normalizeSoft(t.answer).includes(query);
      }).slice(0, 30)
    : [];

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const resetForTrack = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setElapsed(0);
    setGuess("");
    setHistory([]);
    setCurrent(0);
    setLocked(false);
    setResult(null);
    setTrackScore(null);
    setOpen(false);
  };

  const newGame = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setElapsed(0);
    setGuess("");
    setHistory([]);
    setCurrent(0);
    setLocked(false);
    setResult(null);
    setTrackScore(null);
    setOpen(false);
    setBoost(0);
    setPool(shuffle(TRACKS));
    setPoolIndex(0);
    setTotalScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    if (!track) return;
    const audio = new Audio(`/tracks/${track.file}`);
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, [track]);

  // Фокус в input — только на десктопе, чтобы на мобилке не вылезала клава
  useEffect(() => {
    if (isTouch()) return;
    inputRef.current?.focus();
  }, [current, track, result]);

  const currentDur = DURATIONS[Math.min(current, DURATIONS.length - 1)];

  const animate = (duration) => {
    startTimeRef.current = performance.now();
    const tick = (now) => {
      const e = Math.min(duration, (now - startTimeRef.current) / 1000);
      setElapsed(e);
      if (e < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const play = () => {
    if (locked || !audioRef.current) return;
    // на мобилке скрываем клаву, чтобы она не мешала слушать
    if (isTouch()) inputRef.current?.blur();
    cancelAnimationFrame(rafRef.current);
    try {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {}
    setPlaying(true);
    setElapsed(0);
    animate(currentDur);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      audioRef.current?.pause();
      setPlaying(false);
    }, currentDur * 1000);
  };

  const nextTrack = () => {
    if (poolIndex + 1 >= pool.length) {
      setGameOver(true);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setElapsed(0);
    setGuess("");
    setHistory([]);
    setCurrent(0);
    setLocked(false);
    setResult(null);
    setTrackScore(null);
    setOpen(false);
    setPoolIndex(poolIndex + 1);
  };

  const finishTrackAsLose = () => {
    setLocked(true);
    setResult("lose");
    setTrackScore(0);
  };

  const advance = () => {
    if (current + 1 >= MAX_ATTEMPTS) {
      finishTrackAsLose();
      return;
    }
    setCurrent(current + 1);
  };

  const submit = () => {
    if (locked || !track) return;
    if (!guess.trim()) return;

    const correct = normalizeStrict(guess) === normalizeStrict(track.answer);

    if (correct) {
      const earned = SCORES[current];
      setHistory((h) => [...h, { text: guess, state: "correct" }]);
      setGuess("");
      setLocked(true);
      setResult("win");
      setTrackScore(earned);
      setTotalScore((s) => s + earned);
      setBoost(1);
      setTimeout(() => setBoost(0), 4000);
      return;
    }

    setHistory((h) => [...h, { text: guess, state: "wrong" }]);
    setGuess("");
    advance();
  };

  const skip = () => {
    if (locked) return;
    setHistory((h) => [...h, { text: "— пропуск —", state: "skip" }]);
    // на мобилке гасим клаву, чтобы не вылазила
    if (isTouch()) inputRef.current?.blur();
    audioRef.current?.pause();
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
    setElapsed(0);
    advance();
  };

  const surrender = () => {
    if (locked) return;
    if (isTouch()) inputRef.current?.blur();
    audioRef.current?.pause();
    setPlaying(false);
    cancelAnimationFrame(rafRef.current);
    finishTrackAsLose();
  };

  const choose = (t) => {
    setGuess(t.answer);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && matches[activeIdx]) {
        choose(matches[activeIdx]);
        return;
      }
      submit();
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      if (!open) return;
      e.preventDefault();
      setActiveIdx((i) => Math.min(matches.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      if (!open) return;
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    }
  };

  const attemptsLeft = MAX_ATTEMPTS - current;
  const pct = Math.min(100, (elapsed / currentDur) * 100);

  if (gameOver) {
    const percent = Math.round((totalScore / MAX_SCORE) * 100);
    let verdict = "Неплохо!";
    if (percent === 100) verdict = "Идеально! Ты легенда 🐐";
    else if (percent >= 80) verdict = "Огонь! 🔥";
    else if (percent >= 60) verdict = "Хороший результат!";
    else if (percent >= 30) verdict = "Можно лучше 😉";
    else verdict = "Ну... бывает 😅";

    return (
      <>
        <SaltBackground boost={1} />
        <div className="app">
          <div className="inner">
            <header className="header">
              <h1>🏁 Игра окончена</h1>
              <div className="subtitle">ФИНАЛЬНЫЙ СЧЁТ</div>
            </header>

            <div className="board">
              <div className="gameover">
                <div className="gameover-score">
                  {totalScore}
                  <span className="gameover-max"> / {MAX_SCORE}</span>
                </div>
                <div className="gameover-percent">{percent}%</div>
                <div className="gameover-verdict">{verdict}</div>
                <button className="btn primary new-btn" onClick={newGame}>
                  🔄 Играть заново
                </button>
              </div>
            </div>

            <div className="hint">
              Всего треков: {TRACKS.length} · За каждый угаданный с 1-й попытки — {SCORES[0]} очков
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SaltBackground boost={boost} />

      <div className="app">
        <div className="inner">
          <header className="header">
            <h1>🎵 Угадай трек</h1>
            <div className="subtitle">TRIPPL FLOW · TF · LPUNK</div>
          </header>

          <div className="board">
            <div className="stats">
              <div className="stat">
                <span className="stat-label">Трек</span>
                <span className="stat-value">
                  {poolIndex + 1} / {tracksTotal}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Счёт</span>
                <span className="stat-value">
                  {totalScore}
                  <span className="stat-max"> / {MAX_SCORE}</span>
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Осталось попыток</span>
                <span className="stat-value">{attemptsLeft}</span>
              </div>
            </div>

            <div className="play-row">
              <button className="btn primary" onClick={play} disabled={locked}>
                {playing ? "⏸ Играет..." : "▶ Слушать"}
              </button>
              <button
                className="btn ghost"
                onClick={skip}
                disabled={locked || playing}
              >
                ⏭ Пропустить
              </button>
              <button className="btn danger" onClick={surrender} disabled={locked}>
                🏳 Сдаться
              </button>
            </div>

            <div className="progress-wrap">
              <div className="progress-track">
                <div
                  className={"progress-fill" + (playing ? " playing" : "")}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="progress-time">
                <span>{elapsed.toFixed(1)}</span>
                <span className="progress-sep">/</span>
                <span>{currentDur.toFixed(1)} сек</span>
                <span className="progress-sep">·</span>
                <span>за угадывание: +{SCORES[current]} очк.</span>
              </div>
            </div>

            <div className="input-wrap" ref={wrapperRef}>
              <input
                ref={inputRef}
                type="text"
                value={guess}
                disabled={locked}
                placeholder="Начни вводить название…"
                onChange={(e) => {
                  setGuess(e.target.value);
                  setOpen(true);
                  setActiveIdx(0);
                }}
                onFocus={() => guess && setOpen(true)}
                onKeyDown={handleKey}
                autoComplete="off"
                spellCheck={false}
                className="main-input"
              />
              <button
                className="btn submit"
                onClick={submit}
                disabled={locked || !guess.trim()}
              >
                Ввод
              </button>

              {open && matches.length > 0 && (
                <div className="dropdown">
                  {matches.map((t, i) => (
                    <div
                      key={t.file + i}
                      className={"item" + (i === activeIdx ? " active" : "")}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        choose(t);
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                    >
                      <div className="item-title">{displayName(t.file)}</div>
                      <div className="item-answer">ответ: {t.answer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="history">
              {result ? (
                <div className={"result " + result}>
                  <div className="result-line">
                    {result === "win" ? "🎉 Вы выиграли!" : "😔 Вы проиграли."}
                  </div>
                  {result === "win" && (
                    <div className="result-points">
                      +{trackScore} {trackScore === 1 ? "очко" : "очков"}
                    </div>
                  )}
                  <div className="result-answer">
                    Правильный ответ: <b>{track.answer}</b>
                  </div>
                  <div className="result-file">{displayName(track.file)}</div>
                  <button className="btn primary new-btn" onClick={nextTrack}>
                    {poolIndex + 1 >= pool.length
                      ? "🏁 Показать итог"
                      : "➡ Следующий трек"}
                  </button>
                </div>
              ) : history.length === 0 ? (
                <div className="history-empty">
                  Здесь появятся твои попытки
                </div>
              ) : (
                history.map((h, i) => (
                  <div key={i} className={"hist-item " + h.state}>
                    <span className="hist-num">{i + 1}</span>
                    <span className="hist-text">{h.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="hint">
            <kbd>Enter</kbd> — ответить · <kbd>↑↓</kbd> — выбор · <kbd>Esc</kbd> — закрыть
          </div>
        </div>
      </div>
    </>
  );
}