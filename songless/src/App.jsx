import { useState, useRef, useEffect } from "react";
import "./App.css";

const PUSHKA_TRACKS = [
  { file: "pushka/1. Марк Пуля, Георгий Пушка - СИГМА.mp3",                              answer: "СИГМА" },
  { file: "pushka/2. Genius, Марк Пуля, 7uglu, Георгий Пушка - Cайфер.mp3",              answer: "Cайфер" },
  { file: "pushka/3. Genius, Марк Пуля, Георгий Пушка - Первый(второй).mp3",             answer: "Первый(второй)" },
  { file: "pushka/4. Марк Пуля, Георгий Пушка - Волчара.mp3",                            answer: "Волчара" },
  { file: "pushka/5. Георгий Пушка - Хавчик.mp3",                                        answer: "Хавчик" },
  { file: "pushka/6. Марк Пуля, Георгий Пушка - Метрошка.mp3",                           answer: "Метрошка" },
  { file: "pushka/7. Марк Пуля, Георгий Пушка - ЗОНДБЕ МАЗГЕ.mp3",                       answer: "ЗОНДБЕ МАЗГЕ" },
  { file: "pushka/8. Марк Пуля, Георгий Пушка - виайпиидабалатория.mp3",                 answer: "виайпиидабалатория" },
  { file: "pushka/9. Георгий Пушка - скуфяра.mp3",                                       answer: "скуфяра" },
  { file: "pushka/10. Bychess, Георгий Пушка - Зюганов.mp3",                             answer: "Зюганов" },
  { file: "pushka/11. Георгий Пушка - brawlcore.mp3",                                    answer: "brawlcore" },
  { file: "pushka/12. Марк Пуля, Георгий Пушка - джо1нт.mp3",                            answer: "джо1нт" },
  { file: "pushka/13. Георгий Пушка - ГОООООООООООООООООЛ.mp3",                          answer: "ГОООООООООООООООООЛ" },
  { file: "pushka/14. Георгий Пушка - долбит нормально speedup.mp3",                     answer: "долбит нормально speedup" },
  { file: "pushka/15. Георгий Пушка - лоу фай бейби.mp3",                                answer: "лоу фай бейби" },
  { file: "pushka/16. ГЕОРГИЙ ПУШКА - О СЕБЕ(1 РАУНД).mp3",                              answer: "О СЕБЕ(1 РАУНД)" },
  { file: "pushka/17. Георгий Пушка - ФУ ВАНЯЕТ БЕНЗИНОМ ЛУКОЙЛ РЕЧЕВКА 1.mp3",          answer: "ФУ ВАНЯЕТ БЕНЗИНОМ ЛУКОЙЛ РЕЧЕВКА 1" },
  { file: "pushka/18. bychess, Георгий Пушка - птичка40.mp3",                            answer: "птичка40" },
  { file: "pushka/19. Марк Пуля, Георгий Пушка - пятко.mp3",                             answer: "пятко" },
  { file: "pushka/20. Георгий Пушка - РОБЛОКСКОР.mp3",                                   answer: "РОБЛОКСКОР" },
  { file: "pushka/21. Марк Пуля, Георгий Пушка - ТАЙЛЕР40.mp3",                          answer: "ТАЙЛЕР40" },
  { file: "pushka/22. Георгий Пушка - #тащи.mp3",                                        answer: "#тащи" },
  { file: "pushka/23. Георгий Пушка - ШАРИК40.mp3",                                      answer: "ШАРИК40" },
  { file: "pushka/24. Георгий Пушка - ненавижу.mp3",                                     answer: "ненавижу" },
  { file: "pushka/25. MAGI$TR98, Георгий Пушка - wizzard.mp3",                           answer: "wizzard" },
  { file: "pushka/26. alonilon,ivan rist, bychess, Георгий Пушка - песня про проц.mp3",  answer: "песня про проц" },
  { file: "pushka/27. Георгий Пушка - VENOM.mp3",                                        answer: "VENOM" },
  { file: "pushka/28. Георгий Пушка - рома устинов.mp3",                                 answer: "рома устинов" },
  { file: "pushka/29. bychess, Георгий Пушка - занозин.mp3",                             answer: "занозин" },
  { file: "pushka/30. Георгий Пушка - бейблейд(prod.soulrin).mp3",                       answer: "бейблейд(prod.soulrin)" },
  { file: "pushka/31. Георгий Пушка - Цветок.mp3",                                       answer: "Цветок" },
  { file: "pushka/32. Георгий Пушка - купец.mp3",                                        answer: "купец" },
  { file: "pushka/33. Георгий Пушка - таблица логарифмов.mp3",                           answer: "таблица логарифмов" },
  { file: "pushka/34. bychess, Георгий Пушка - отлил в кусты.mp3",                       answer: "отлил в кусты" },
  { file: "pushka/35. bychess, Георгий Пушка - плавильня.mp3",                           answer: "плавильня" },
  { file: "pushka/36. bychess, Георгий Пушка - фонк дуо.mp3",                            answer: "фонк дуо" },
  { file: "pushka/37. Георгий Пушка - цветочный фонк.mp3",                               answer: "цветочный фонк" },
  { file: "pushka/38. Георгий Пушка - хачифури шава.mp3",                                answer: "хачифури шава" },
  { file: "pushka/39. Георгий Пушка - ск репер(prod.cl6udly).mp3",                       answer: "ск репер(prod.cl6udly)" },
  { file: "pushka/40. Георгий Пушка - минутка джерк.mp3",                                answer: "минутка джерк" },
  { file: "pushka/41. Георгий Пушка - яна сида.mp3",                                     answer: "яна сида" },
  { file: "pushka/42. Георгий Пушка - гитхаб.mp3",                                       answer: "гитхаб" },
  { file: "pushka/43. Георгий Пушка - ЦВЕТОК 2.mp3",                                     answer: "ЦВЕТОК 2" },
  { file: "pushka/44. bychess, Георгий Пушка - дно.mp3",                                 answer: "дно" },
  { file: "pushka/45. bychess, Георгий Пушка - последняя ночь.mp3",                      answer: "последняя ночь" },
  { file: "pushka/46. Георгий Пушка - методичка.mp3",                                    answer: "методичка" },
  { file: "pushka/47. Марк Пуля, Георгий Пушка -  мишко31.mp3",                          answer: "мишко31" },
  { file: "pushka/48. Марк Пуля, Георгий Пушка - Приведение.mp3",                        answer: "Приведение" },
  { file: "pushka/49. Георгий Пушка - eesti.mp3",                                        answer: "eesti" },
  { file: "pushka/50. bychess, Георгий Пушка - ДНО NEW YEAR.mp3",                        answer: "ДНО NEW YEAR" },
  { file: "pushka/51. Георгий Пушка - SBORy.mp3",                                        answer: "SBORy" },
  { file: "pushka/52. Георгий Пушка - ded moroz.mp3",                                    answer: "ded moroz" },
  { file: "pushka/53. Георгий Пушка - телки какие то.mp3",                               answer: "телки какие то" },
  { file: "pushka/54. bychess, Георгий Пушка - HRANITEL'.mp3",                           answer: "HRANITEL'" },
  { file: "pushka/55. Георгий Пушка - демо148..mp3",                                     answer: "демо148." },
  { file: "pushka/56. Кирилл Граната, Георгий Пушка, bychess - 3 программиста.mp3",      answer: "3 программиста" },
  { file: "pushka/57. Георгий Пушка - zabolel.mp3",                                      answer: "zabolel" },
  { file: "pushka/58. Георгий Пушка - grably mikhail vladi.mp3",                         answer: "grably mikhail vladi" },
  { file: "pushka/59. Георгий Пушка - подумать.mp3",                                     answer: "подумать" },
  { file: "pushka/60. Георгий Пушка - в обосанной хате жилось даже лучше.mp3",           answer: "в обосанной хате жилось даже лучше" },
  { file: "pushka/61. alonilon, bychess, Георгий Пушка - в прайме(север 2).mp3",         answer: "в прайме(север 2)" },
  { file: "pushka/62. alonilon, Георгий Пушка - два богатыря.mp3",                       answer: "два богатыря" },
  { file: "pushka/63. Георгий Пушка - максим викторович чччччч.mp3",                     answer: "максим викторович чччччч" },
  { file: "pushka/64. alonilon, Георгий Пушка - nava0.mp3",                              answer: "nava0" },
  { file: "pushka/65. 30K 2.mp3",                                                        answer: "30K 2" },
  { file: "pushka/66. Георгий Пушка - MELLSTROY.mp3",                                    answer: "MELLSTROY" },
  { file: "pushka/67. Георгий Пушка и др. - дизайнерская.mp3",                           answer: "дизайнерская" },
  { file: "pushka/68. Георгий Пушка и др. - no cap.mp3",                                 answer: "no cap" },
  { file: "pushka/69. Георгий Пушка, Марк Пуля - ЛУКОЙЛ 2[prod. pipe bomb].mp3",         answer: "ЛУКОЙЛ 2[prod. pipe bomb]" },
  { file: "pushka/70. Георгий Пушка - 30K.mp3",                                          answer: "30K" },
  { file: "pushka/71. Георгий Пушка - 30К3.mp3",                                         answer: "30К3" },
];

const TRIPPL_TRACKS = [
  { file: "trippl/1. MR.BL & TF - AK.mp3",                       answer: "AK" },
  { file: "trippl/2. TRIPPL FLOW, LPUNK - KROST.mp3",            answer: "KROST" },
  { file: "trippl/3. LiL PUNK feat. TRIPPL FLOW - КЭШ.mp3",      answer: "КЭШ" },
  { file: "trippl/4. TRIPPL FLOW - наш день 2.0.mp3",            answer: "наш день 2.0" },
  { file: "trippl/5. TRIPPL FLOW - СВЯЗЬ.mp3",                   answer: "СВЯЗЬ" },
  { file: "trippl/6. TRIPPL FLOW (FEAT.LP) - ААААААА.mp3",       answer: "ААААААА" },
  { file: "trippl/7. TRIPPL FLOW - FUHTA.mp3",                   answer: "FUHTA" },
  { file: "trippl/8. trippl flow - 14.mp3",                      answer: "14" },
  { file: "trippl/9. TRIPPL FLOW - анечке.mp3",                  answer: "анечке" },
  { file: "trippl/10. TRIPPL FLOW - IN THE SWAG.mp3",            answer: "IN THE SWAG" },
  { file: "trippl/11. trippl flow - Когда стану популярным.mp3", answer: "Когда стану популярным" },
  { file: "trippl/12. trippl flow - пару слов про бать.mp3",     answer: "пару слов про бать" },
  { file: "trippl/13. TRIPPL FLOW, LPUNK - КАЖДЫЙ ДЕНЬ (ремикс).mp3", answer: "КАЖДЫЙ ДЕНЬ (ремикс)" },
  { file: "trippl/14. TRIPPL FLOW - косячок.mp3",                answer: "косячок" },
  { file: "trippl/15. TRIPPL FLOW - ЛУЧШИЕ ДРУЗЬЯ.mp3",          answer: "ЛУЧШИЕ ДРУЗЬЯ" },
  { file: "trippl/16. TF - собака.mp3",                          answer: "собака" },
  { file: "trippl/17. TRIPPL FLOW - осв.mp3",                    answer: "осв" },
  { file: "trippl/18. TRIPPL FLOW - GANGSHIT.mp3",               answer: "GANGSHIT" },
  { file: "trippl/19. TRIPPL FLOW - МОЛОДОЙ ТРИПЛ.mp3",          answer: "МОЛОДОЙ ТРИПЛ" },
  { file: "trippl/20. TRIPPL FLOW - NOKIA (3310).mp3",           answer: "NOKIA (3310)" },
  { file: "trippl/21. TRIPPL FLOW - МОЙ СТИЛЬ.mp3",              answer: "МОЙ СТИЛЬ" },
  { file: "trippl/22. TRIPPL FLOW, LPUNK - Маленький панк.mp3",  answer: "Маленький панк" },
  { file: "trippl/23. TRIPPL FLOW - TRIPPL FLOW.mp3",            answer: "TRIPPL FLOW" },
  { file: "trippl/24. LIL - PUHK.mp3",                           answer: "PUHK" },
  { file: "trippl/25. TRIPPL FLOW - ОНИ ВСЕ ЗНАЛИ.mp3",          answer: "ОНИ ВСЕ ЗНАЛИ" },
  { file: "trippl/26. TRIPPL FLOW - ФРИСТАИЛ.mp3",               answer: "ФРИСТАИЛ" },
  { file: "trippl/27. trippl flow - лпунк пидр.mp3",             answer: "лпунк пидр" },
  { file: "trippl/28. tf & фрукты - наш день.mp3",               answer: "наш день" },
  { file: "trippl/29. TRIPPL FLOW feat. LiL PUNK - Каждый день.mp3", answer: "Каждый день" },
  { file: "trippl/30. TRIPPL FLOW - оу да.mp3",                  answer: "оу да" },
  { file: "trippl/31. tf & mr.Bl - друг.mp3",                    answer: "друг" },
  { file: "trippl/32. tf - деньги(offical aiduo).mp3",           answer: "деньги" },
  { file: "trippl/33. TF - ЧУПА-ЧУПС.mp3",                       answer: "ЧУПА-ЧУПС" },
  { file: "trippl/34. TF feat. LiL PUNK - Party.mp3",            answer: "Party" },
  { file: "trippl/35. TF - ЛЮБОВЬ.mp3",                          answer: "ЛЮБОВЬ" },
  { file: "trippl/36. TF - Ебать я умный.mp3",                   answer: "Ебать я умный" },
  { file: "trippl/37. TF - ДИСС НА TRIPPL FLOW.mp3",             answer: "ДИСС НА TRIPPL FLOW" },
  { file: "trippl/38. TF - Цепи.mp3",                            answer: "Цепи" },
  { file: "trippl/39. TF - Я ТЭФЭ.mp3",                          answer: "Я ТЭФЭ" },
  { file: "trippl/40. TF - FUCK PLAY.mp3",                       answer: "FUCK PLAY" },
  { file: "trippl/41. TF - НА БИТАХ.mp3",                        answer: "НА БИТАХ" },
  { file: "trippl/42. TRIPPL FLOW - КИВИ.mp3",                   answer: "КИВИ" },
  { file: "trippl/43. TF - НАРКОТИКИ.mp3",                       answer: "НАРКОТИКИ" },
  { file: "trippl/44. TRIPPL FLOW - ЧСВ.mp3",                    answer: "ЧСВ" },
  { file: "trippl/45. MC FRIGUS - IVAN NUMBER ONE.mp3",          answer: "IVAN NUMBER ONE" },
  { file: "trippl/46. TRIPPL FLOW - Комп.mp3",                   answer: "Комп" },
  { file: "trippl/47. trippl flow - катана.mp3",                 answer: "катана" },
  { file: "trippl/48. trippl flow - БМВ.mp3",                    answer: "БМВ" },
  { file: "trippl/49. tripll flow - 02.mp3",                     answer: "02" },
  { file: "trippl/50. TRIPPL FLOW - 15.mp3",                     answer: "15" },
  { file: "trippl/51. trippl flow - intro.mp3",                  answer: "intro" },
  { file: "trippl/52. TRIPPL FLOW - NOKIA (3310).mp3",           answer: "NOKIA (3310)" },
  { file: "trippl/53. TRIPL FLOW - я перевернул фитами жидов.mp3", answer: "я перевернул фитами жидов" },
  { file: "trippl/54. TF feat. 7stars, Alonilon - троинное.mp3", answer: "троинное" },
  { file: "trippl/55. TF, 7stars - Папам.mp3",                   answer: "Папам" },
  { file: "trippl/56. TF - Scr3amrightnow.mp3",                  answer: "Scr3amrightnow" },
  { file: "trippl/57. TF, 7stars - диджейпапа.mp3",              answer: "диджейпапа" },
  { file: "trippl/58. TF, 7STARS - Кхекхешнейлефапэпэ.mp3",      answer: "Кхекхешнейлефапэпэ" },
  { file: "trippl/59. TF, 7STARS - ILL.mp3",                     answer: "ILL" },
  { file: "trippl/60. TF, 7STARS - Кристина.mp3",                answer: "Кристина" },
  { file: "trippl/61. TF, 7STARS - Loveisdeath.mp3",             answer: "Loveisdeath" },
  { file: "trippl/62. TF, ALONILON - ПАХНЕШЬ ЦВЕТАМИ.mp3",       answer: "ПАХНЕШЬ ЦВЕТАМИ" },
  { file: "trippl/63. TF, BYCHESS, MARKPULYA, ALONILON - САЙФЕР АФТЕРПАТИ.mp3", answer: "САЙФЕР АФТЕРПАТИ" },
  { file: "trippl/64. TF - пуэр.mp3",                            answer: "пуэр" },
  { file: "trippl/65. TF, 7stars - Сасок.mp3",                   answer: "Сасок" },
  { file: "trippl/66. Alonilon, TF - САДИК.mp3",                 answer: "САДИК" },
  { file: "trippl/67. tf, Alonilon - СЕВЕР.mp3",                 answer: "СЕВЕР" },
  { file: "trippl/68. TF и другие - НЕ ВЫЕБЫВАЙСЯ.mp3",          answer: "НЕ ВЫЕБЫВАЙСЯ" },
  { file: "trippl/69. TF, bychess, alonilon - NEW LOVE.mp3",     answer: "NEW LOVE" },
];

const MODES = {
  pushka: {
    id: "pushka",
    name: "ГЕОРГИЙ ПУШКА",
    cover: "/covers/pushka.jpg",
    accent: "#f472b6",
    symbol: "🔫",
    tracks: PUSHKA_TRACKS,
  },
  trippl: {
    id: "trippl",
    name: "TRIPPL FLOW",
    cover: "/covers/trippl.jpg",
    accent: "#8b5cff",
    symbol: "🧂",
    tracks: TRIPPL_TRACKS,
  },
};

const MODE_ORDER = ["pushka", "trippl"];

const DURATIONS = [0.5, 1, 2, 4, 8, 16];
const MAX_ATTEMPTS = 6;
const SCORES = [6, 5, 4, 3, 2, 1];

const normalizeStrict = (s) => s.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
const normalizeSoft = (s) =>
  s.toLowerCase().replace(/[–—−]/g, "-").replace(/\s+/g, " ").trim();
const displayName = (file) =>
  file.split("/").pop().replace(/^\d+\.\s*/, "").replace(/\.(mp3|m4a)$/i, "");

const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============= Универсальный фон с эмодзи ============= */
function ParticleBackground({ boost, symbol = "🧂" }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const boostRef = useRef(0);
  const rafRef = useRef(null);
  const symbolRef = useRef(symbol);

  useEffect(() => {
    symbolRef.current = symbol;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = particlesRef.current.length || 20;
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
  }, [symbol]);

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
      const currentSymbol = symbolRef.current;

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
        ctx.fillText(currentSymbol, 0, 0);
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

/* ============= Лобби ============= */
function Lobby({ onPick }) {
  return (
    <div className="app">
      <div className="inner">
        <header className="header">
          <h1>🎵 Угадай трек</h1>
          <div className="subtitle">ВЫБЕРИ АРТИСТА</div>
        </header>

        <div className="lobby">
          {MODE_ORDER.map((key) => {
            const m = MODES[key];
            return (
              <button
                key={key}
                className="mode-card"
                style={{ "--accent": m.accent }}
                onClick={() => onPick(key)}
              >
                <div className="mode-cover">
                  <img src={m.cover} alt={m.name} />
                  <div className="mode-cover-glow" />
                </div>
                <div className="mode-info">
                  <div className="mode-name">{m.name}</div>
                  <div className="mode-subtitle">{m.subtitle}</div>
                  <div className="mode-count">
                    {m.tracks.length} {pluralTracks(m.tracks.length)}
                  </div>
                </div>
                <div className="mode-play">▶ Играть</div>
              </button>
            );
          })}
        </div>

        <div className="hint">
          Выбери артиста и угадывай его треки по коротким отрывкам
        </div>
      </div>
    </div>
  );
}

function pluralTracks(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "трек";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "трека";
  return "треков";
}

/* ============= Игра ============= */
export default function App() {
  const [mode, setMode] = useState(null);

  const [pool, setPool] = useState([]);
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

  const modeData = mode ? MODES[mode] : null;
  const track = modeData ? pool[poolIndex] : null;
  const tracksTotal = pool.length;
  const maxScore = modeData ? modeData.tracks.length * SCORES[0] : 0;

  const bgSymbol = modeData ? modeData.symbol : "🎵";

  const query = normalizeSoft(guess);
  const matches = modeData && query
    ? modeData.tracks.filter((t) => {
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

  const startMode = (key) => {
    const m = MODES[key];
    if (!m) return;
    setMode(key);
    setPool(shuffle(m.tracks));
    setPoolIndex(0);
    setGuess("");
    setHistory([]);
    setCurrent(0);
    setLocked(false);
    setResult(null);
    setBoost(0);
    setTrackScore(null);
    setTotalScore(0);
    setGameOver(false);
    setPlaying(false);
    setElapsed(0);
    setOpen(false);
  };

  const backToLobby = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    cancelAnimationFrame(rafRef.current);
    audioRef.current?.pause();
    setMode(null);
    setPool([]);
    setPoolIndex(0);
    setPlaying(false);
    setElapsed(0);
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

  if (!mode) {
    return (
      <>
        <ParticleBackground boost={0} symbol="🎵" />
        <Lobby onPick={startMode} />
      </>
    );
  }

  if (gameOver) {
    const percent = maxScore ? Math.round((totalScore / maxScore) * 100) : 0;
    let verdict = "Неплохо!";
    if (percent === 100) verdict = "Идеально! Ты легенда 🐐";
    else if (percent >= 80) verdict = "Огонь! 🔥";
    else if (percent >= 60) verdict = "Хороший результат!";
    else if (percent >= 30) verdict = "Можно лучше 😉";
    else verdict = "Ну... бывает 😅";

    return (
      <>
        <ParticleBackground boost={1} symbol={bgSymbol} />
        <div className="app">
          <div className="inner">
            <header className="header">
              <h1>🏁 Игра окончена</h1>
              <div className="subtitle">{modeData.name}</div>
            </header>

            <div className="board">
              <div className="gameover">
                <div className="gameover-score">
                  {totalScore}
                  <span className="gameover-max"> / {maxScore}</span>
                </div>
                <div className="gameover-percent">{percent}%</div>
                <div className="gameover-verdict">{verdict}</div>
                <button className="btn primary new-btn" onClick={() => startMode(mode)}>
                  🔄 Играть заново
                </button>
                <button className="btn ghost new-btn" onClick={backToLobby}>
                  ← К выбору артиста
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const attemptsLeft = MAX_ATTEMPTS - current;
  const pct = Math.min(100, (elapsed / currentDur) * 100);

  return (
    <>
      <ParticleBackground boost={boost} symbol={bgSymbol} />

      <div className="app">
        <div className="inner">
          <header className="header">
            <h1>🎵 {modeData.name}</h1>
            <div className="subtitle">{modeData.subtitle}</div>
          </header>

          <div className="board">
            <button className="btn ghost back-btn" onClick={backToLobby}>
              ← Сменить артиста
            </button>

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
                  <span className="stat-max"> / {maxScore}</span>
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