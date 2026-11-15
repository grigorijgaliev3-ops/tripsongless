const ELO_K = 24;
const HISTORY_KEY = "songless_battle_history_v1";
const HISTORY_LIMIT = 20;

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function totalPairs(count) {
  return (count * (count - 1)) / 2;
}

export function pairKey(a, b) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export function createStats(artists) {
  return Object.fromEntries(
    artists.map((artist) => [
      artist.id,
      { rating: 1000, wins: 0, losses: 0, matches: 0 },
    ]),
  );
}

/* Подбираем пару так, чтобы у всех было примерно одинаковое число матчей
   и одна и та же пара не повторялась. */
export function nextPair(artists, stats, usedPairs) {
  const pool = shuffle(artists).sort(
    (a, b) => stats[a.id].matches - stats[b.id].matches,
  );

  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      if (!usedPairs.has(pairKey(pool[i].id, pool[j].id))) {
        return [pool[i], pool[j]];
      }
    }
  }
  return null;
}

export function recordResult(stats, winnerId, loserId) {
  const winner = stats[winnerId];
  const loser = stats[loserId];
  const expected = 1 / (1 + Math.pow(10, (loser.rating - winner.rating) / 400));
  const delta = Math.round(ELO_K * (1 - expected));

  return {
    ...stats,
    [winnerId]: {
      ...winner,
      rating: winner.rating + delta,
      wins: winner.wins + 1,
      matches: winner.matches + 1,
    },
    [loserId]: {
      ...loser,
      rating: loser.rating - delta,
      losses: loser.losses + 1,
      matches: loser.matches + 1,
    },
  };
}

/* Сортируем по рейтингу, при равенстве — по победам, затем по поражениям. */
export function rankArtists(artists, stats) {
  return artists
    .map((artist) => ({ ...artist, ...stats[artist.id] }))
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        b.wins - a.wins ||
        a.losses - b.losses ||
        a.name.localeCompare(b.name, "ru"),
    )
    .map((artist, index) => ({ ...artist, place: index + 1 }));
}

export function pluralMatches(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "матч";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "матча";
  return "матчей";
}

export function makeShareText(ranking, matches) {
  const medals = ["👑", "🥈", "🥉"];
  const lines = ranking.slice(0, 3).map(
    (artist, i) =>
      `${medals[i]} ${i + 1}. ${artist.name} — ${artist.wins}–${artist.losses} · ${artist.rating}`,
  );
  return `⚔️ Моя битва артистов (${matches} ${pluralMatches(matches)})\n${lines.join("\n")}`;
}

export function makeHistoryEntry(ranking, matches) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: new Date().toISOString(),
    matches,
    ranking: ranking.map((artist) => ({
      id: artist.id,
      name: artist.name,
      symbol: artist.symbol,
      accent: artist.accent,
      rating: artist.rating,
      wins: artist.wins,
      losses: artist.losses,
      place: artist.place,
    })),
  };
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry) {
  const next = [entry, ...loadHistory()].slice(0, HISTORY_LIMIT);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* хранилище может быть недоступно — не критично */
  }
  return next;
}

export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* ignore */
  }
  return [];
}
