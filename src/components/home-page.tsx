import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import {
  BELLS,
  LOGO,
  gallery,
  heroSlides,
  programs,
  studio,
  styles,
  teachers,
  ticker,
  type GalleryItem,
} from "@/data/chilanka";

const NAV = [
  { id: "studio", label: "Studio" },
  { id: "styles", label: "Forms" },
  { id: "classes", label: "Classes" },
  { id: "faculty", label: "Faculty" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)/);
  const target = match ? Number(match[1]) : 0;
  const suffix = value.slice(String(target).length);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 900);
          setShown(Math.round(target * (1 - (1 - t) ** 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}

function LiveLine() {
  const names = styles.map((item) => item.name);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % names.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [names.length]);

  return (
    <p className="mt-5 min-h-10 font-display text-3xl italic text-pink" aria-live="polite">
      <span key={names[index]} className="fade-up inline-block">
        {names[index]}
      </span>
    </p>
  );
}

function SplitLine({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {[...text].map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="fade-up inline-block"
          style={{ animationDelay: `${delay + index * 42}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function Magnetic({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={onClick}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node || window.matchMedia("(pointer: coarse)").matches) return;
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.28;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.4;
        node.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </button>
  );
}

function Curtain({ onBegin }: { onBegin?: () => void }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "done">(
    "closed",
  );

  const timers = useRef<number[]>([]);

 const PULL_MS = 6800;
const FINISH_BUFFER_MS = 500;

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const openCurtain = () => {
    if (phase !== "closed") return;

    clearTimers();

    setPhase("opening");

    /* Let the curtain start before audio begins */
    timers.current.push(
      window.setTimeout(() => {
        onBegin?.();
      }, 500),
    );

    /*
      Do NOT remove the curtain exactly when the transform ends.
      Give the animation a moment to visually settle.
    */
    timers.current.push(
      window.setTimeout(() => {
        setPhase("done");
      }, PULL_MS + FINISH_BUFFER_MS),
    );
  };

  useEffect(() => {
    if (phase === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`curtain ${
        phase === "opening" ? "is-out" : ""
      }`}
      style={
        {
          "--curtain-duration": `${PULL_MS}ms`,
        } as React.CSSProperties
      }
    >
      <div className="curtain-scrim" aria-hidden="true" />

      <div className="curtain-glow" aria-hidden="true" />

      <div className="curtain-panel left">
        <div className="curtain-folds" />
      </div>

      <div className="curtain-panel right">
        <div className="curtain-folds" />
      </div>

      <div
        className="curtain-valance"
        aria-hidden="true"
      />

      <div className="curtain-mark">
        <img
          src={LOGO}
          alt=""
          className="h-20 w-20 object-contain"
        />

        <p className="text-xs font-bold uppercase tracking-[0.32em] text-purple">
          Indian Dance School
        </p>

        <p className="font-display text-6xl leading-none sm:text-7xl">
          Chilanka
        </p>

        <p className="max-w-xs text-sm text-paper/70">
          Changing lives through the power of performance
        </p>

        <p className="font-display text-2xl italic text-paper/80">
          The curtain is about to rise.
        </p>

        <button
          type="button"
          onClick={openCurtain}
          disabled={phase !== "closed"}
          className="
            press
            mt-4
            inline-flex
            h-11
            items-center
            rounded-full
            bg-magenta
            px-5
            text-sm
            font-semibold
            text-ink
            disabled:pointer-events-none
          "
        >
          Part the curtain
        </button>
      </div>
    </div>
  );
}

const TRACKS = [
  { src: "/audio/t01.mp3", title: "Chilanka 1" },
  { src: "/audio/t02.mp3", title: "Chilanka 2" },
  { src: "/audio/t03.mp3", title: "Chilanka 3" },
  { src: "/audio/t04.mp3", title: "Chilanka 4" },
  { src: "/audio/t05.mp3", title: "Chilanka 5" },
  { src: "/audio/t06.mp3", title: "Chilanka 6" },
  { src: "/audio/t07.mp3", title: "Chilanka 7" },
  { src: "/audio/t08.mp3", title: "Chilanka 8" },
  { src: "/audio/t09.mp3", title: "Chilanka 9" },
  { src: "/audio/t10.mp3", title: "Chilanka 10" },
];

let visitPick: number | null = null;

function pickVisitTrack() {
  if (visitPick !== null) return visitPick;
  let next = 0;
  try {
    const raw = localStorage.getItem("chilanka-track");
    const last = raw === null ? -1 : Number(raw);
    next = Number.isFinite(last) ? (Math.floor(last) + 1) % TRACKS.length : 0;
    localStorage.setItem("chilanka-track", String(next));
  } catch {
    next = 0;
  }
  visitPick = next;
  return next;
}

function useStageMusic() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const index = useRef(0);
  const declined = useRef(false);
  const [on, setOn] = useState(false);
  const [track, setTrack] = useState(0);

  const play = useCallback(() => {
    const node = audio.current;
    if (!node || declined.current) return;
    try {
      if (localStorage.getItem("chilanka-music") === "off") return;
    } catch {
      /* private mode */
    }
    node
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
  }, []);

  const toggle = useCallback(() => {
    const node = audio.current;
    if (!node) return;
    if (!node.paused) {
      declined.current = true;
      node.pause();
      setOn(false);
      try {
        localStorage.setItem("chilanka-music", "off");
      } catch {
        /* ignore */
      }
      return;
    }
    declined.current = false;
    try {
      localStorage.removeItem("chilanka-music");
    } catch {
      /* ignore */
    }
    node
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
  }, []);

  const choose = useCallback((pick: number) => {
    const node = audio.current;
    if (!node) return;
    const upcoming = ((pick % TRACKS.length) + TRACKS.length) % TRACKS.length;
    index.current = upcoming;
    setTrack(upcoming);
    declined.current = false;
    try {
      localStorage.removeItem("chilanka-music");
    } catch {
      /* ignore */
    }
    node.src = TRACKS[upcoming].src;
    node
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
  }, []);

  const next = useCallback(() => {
    choose((index.current + 1) % TRACKS.length);
  }, [choose]);

  useEffect(() => {
    const start = pickVisitTrack();
    index.current = start;
    setTrack(start);
    const node = new Audio(TRACKS[start].src);
    node.volume = 0.45;
    node.preload = "auto";
    audio.current = node;

    const advance = () => {
      if (declined.current) return;
      const upcoming = (index.current + 1) % TRACKS.length;
      index.current = upcoming;
      setTrack(upcoming);
      node.src = TRACKS[upcoming].src;
      node.play().then(() => setOn(true)).catch(() => undefined);
    };
    node.addEventListener("ended", advance);

    const unlock = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-music-toggle]")) return;
      if (declined.current) return;
      node.play().then(() => setOn(true)).catch(() => undefined);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      node.pause();
      node.removeEventListener("ended", advance);
      audio.current = null;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return { on, play, toggle, next, choose, track };
}

function StageCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setReady(true);
    document.documentElement.classList.add("stage-cursor");
    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.3;
    let rx = x;
    let ry = y;
    let frame = 0;
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const text = Boolean(target?.closest("input, textarea, select"));
      const hot = Boolean(target?.closest("a, button"));
      ring.current?.classList.toggle("is-hidden", text);
      dot.current?.classList.toggle("is-hidden", text);
      ring.current?.classList.toggle("is-hot", hot && !text);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    frame = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("stage-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

function StageWords() {
  const line = styles.map((item) => item.name).join("   ·   ");
  return (
    <div className="overflow-hidden bg-wine-deep py-2.5 text-paper">
      <div className="marquee-fast flex w-max">
        <span className="stage-word">
          {line}
          <span className="px-6 text-pink">·</span>
        </span>
        <span className="stage-word" aria-hidden="true">
          {line}
          <span className="px-6 text-pink">·</span>
        </span>
      </div>
    </div>
  );
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("studio");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [programId, setProgramId] = useState("levels");
  const music = useStageMusic();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-cream text-ink">
      <Curtain onBegin={music.play} />
      <StageCursor />
      <div className="fixed bottom-4 left-4 z-40 flex items-end gap-2">
        <button
          type="button"
          onClick={music.toggle}
          data-music-toggle=""
          aria-pressed={music.on}
          title="Ten royalty-free Bollywood and Indian dance instrumentals. CC BY-ND 4.0."
          className="press inline-flex h-11 items-center gap-2 rounded-full border-2 border-pink bg-wine-deep px-4 text-sm font-semibold text-paper"
        >
          <span className="flex items-end gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className={`w-0.5 rounded-full bg-pink ${music.on ? "beat" : ""}`}
                style={{ height: music.on ? 12 : 5, animationDelay: `${bar * 0.15}s` }}
              />
            ))}
          </span>
          {music.on ? TRACKS[music.track].title : "Play music"}
        </button>
        <button
          type="button"
          onClick={music.next}
          data-music-toggle=""
          aria-label="Next track"
          className="press inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-pink bg-wine-deep text-paper"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="grain" aria-hidden="true" />
      <div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-magenta"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
          scrolled || menuOpen
            ? "border-paper/15 bg-wine-deep/95 text-paper"
            : "border-transparent bg-transparent text-paper"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <img src={LOGO} alt="" className="h-11 w-11 object-contain" />
            <span className="font-display text-2xl leading-none tracking-wide">Chilanka</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className={`relative pb-1 text-sm tracking-wide ${
                  active === item.id ? "text-pink" : "text-paper/80 hover:text-paper"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-pink transition-all duration-300 ${
                    active === item.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={studio.phoneHref}
              className="hidden h-11 items-center px-3 text-sm text-paper/90 sm:inline-flex"
            >
              {studio.phone}
            </a>
            <button
              type="button"
              onClick={() => scrollToId("enroll")}
              className="press hidden h-11 items-center rounded-full bg-magenta px-5 text-sm font-semibold text-ink sm:inline-flex"
            >
              Enroll
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-paper/15 bg-wine-deep px-4 py-4 lg:hidden">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex h-12 w-full items-center text-left text-lg text-paper"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="press mt-2 flex h-12 w-full items-center justify-center rounded-full bg-magenta font-semibold text-ink"
              onClick={() => {
                setMenuOpen(false);
                scrollToId("enroll");
              }}
            >
              Enroll for fall
            </button>
          </div>
        ) : null}
      </header>

      <Hero />
      <Ticker />
      <StageWords />
      <Studio />
      <Bells />
      <Forms />
      <Classes programId={programId} onPick={setProgramId} />
      <Faculty />
      <Gallery />
      <Visit />
      <Enroll programId={programId} onProgram={setProgramId} />
      <Footer />
    </div>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [spot, setSpot] = useState({ x: "72%", y: "28%" });
  const [tilt, setTilt] = useState({ x: "0deg", y: "0deg" });
  const bg = useRef<HTMLImageElement>(null);
  const shift = useRef({ scroll: 0, x: 0, y: 0 });

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      if (!bg.current) return;
      const { scroll, x, y } = shift.current;
      bg.current.style.transform = `scale(1.16) translate3d(${x}px, ${scroll + y}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        shift.current.scroll = Math.min(window.scrollY, 700) * 0.22;
        paint();
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      className="hero-stage spot relative overflow-hidden text-paper"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        setSpot({
          x: `${event.clientX - rect.left}px`,
          y: `${event.clientY - rect.top}px`,
        });
        shift.current.x = px * -28;
        shift.current.y = py * -18;
        if (bg.current) {
          const { scroll, x, y } = shift.current;
          bg.current.style.transform = `scale(1.16) translate3d(${x}px, ${scroll + y}px, 0)`;
        }
      }}
      style={{ ["--mx" as string]: spot.x, ["--my" as string]: spot.y }}
    >
      <img
        ref={bg}
        src="/photos/pic1.e074df63984666351d1c.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-wine-deep via-wine-deep/80 to-wine-deep/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep via-transparent to-wine-deep/50" />
      <p className="hero-ghost" aria-hidden="true">
        Chilanka
      </p>
      <div className="relative z-10 mx-auto grid min-h-dvh max-w-6xl items-end gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-12 lg:items-center lg:pb-20 lg:pt-24">
        <div className="lg:col-span-7">
          <p
            className="fade-up text-xs font-semibold uppercase tracking-[0.28em] text-pink"
            style={{ animationDelay: "980ms" }}
          >
            Pearland, Texas · Fall open
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none text-paper sm:text-7xl lg:text-8xl">
            <SplitLine text="Move." delay={1100} />
            <SplitLine text="Inspire." delay={1280} />
            <SplitLine text="Shine." delay={1480} className="italic text-pink" />
          </h1>
          <LiveLine />
          <p className="fade-up mt-4 max-w-xl text-lg text-paper/85" style={{ animationDelay: "1680ms" }}>
            Indian dance for children and women. Bharatanatyam, Bollywood, Bhangra, Garba,
            and Kerala folk — taught in one room by Jasmin Eapen.
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1820ms" }}>
            <Magnetic
              onClick={() => scrollToId("enroll")}
              className="press inline-flex h-12 items-center rounded-full bg-paper px-6 font-semibold text-ink"
            >
              Reserve a Wednesday
            </Magnetic>
            <Magnetic
              onClick={() => scrollToId("gallery")}
              className="press inline-flex h-12 items-center rounded-full border border-paper/40 px-6 text-paper"
            >
              See the work
            </Magnetic>
          </div>
          <Rhythm />
        </div>
        <div
          className="mx-auto w-[90%] lg:col-span-5 lg:ml-auto lg:w-[86%]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setTilt({ x: "0deg", y: "0deg" });
          }}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            setTilt({ x: `${px * 8}deg`, y: `${py * -6}deg` });
          }}
        >
          <div
            className="tilt frame-portrait relative overflow-hidden rounded-card border-2 border-pink shadow-2xl"
            style={{ ["--rx" as string]: tilt.x, ["--ry" as string]: tilt.y }}
          >
            {heroSlides.map((item, slideIndex) => (
              <img
                key={item.src}
                src={item.src}
                alt={slideIndex === index ? item.alt : ""}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  slideIndex === index ? "settle opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-deep/90 to-transparent p-4">
              <p key={slide.label} className="fade-up text-sm text-paper">
                {slide.label}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {heroSlides.map((item, slideIndex) => (
                <button
                  key={item.src}
                  type="button"
                  aria-label={`Show ${item.label}`}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-2 rounded-full transition-all ${
                    slideIndex === index ? "w-8 bg-pink" : "w-2 bg-paper/40"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/70">
              {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rhythm() {
  return (
    <div className="mt-10 flex items-center gap-3 text-paper/70">
      <span className="text-xs uppercase tracking-[0.22em]">Ādi tāla</span>
      <span className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 8 }, (_, beat) => (
          <span
            key={beat}
            className="beat h-2 w-2 rounded-full bg-pink"
            style={{ animationDelay: `${beat * 0.3}s` }}
          />
        ))}
      </span>
    </div>
  );
}

function Ticker() {
  const loop = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y border-line bg-blush py-3 text-wine">
      <div className="marquee-track flex w-max gap-8">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm font-semibold uppercase tracking-[0.18em]">
            {item}
            <span className="px-8 text-magenta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Studio() {
  return (
    <section id="studio" className="scroll-mt-20 mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
      <Reveal className="lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">The studio</p>
        <h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">
          Where tradition meets passion.
        </h2>
        <p className="mt-6 text-lg text-muted">
          Chilanka is a Pearland school for Indian classical and folk dance. The work is
          small on purpose: one director, a tight faculty, and students who actually get seen.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6">
          {[
            ["10+", "Years teaching"],
            ["50+", "Students trained"],
            ["6", "Forms in the room"],
            ["30+", "Performances"],
          ].map(([value, label], index) => (
            <div key={label} className="border-t border-line pt-3" style={{ transitionDelay: `${index * 80}ms` }}>
              <dt className="font-display text-4xl text-wine">
                <CountUp value={value} />
              </dt>
              <dd className="text-sm text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal className="lg:col-span-7 lg:flex lg:justify-end" delay={120}>
        <figure className="group w-full overflow-hidden rounded-card border-2 border-pink bg-wine lg:w-[92%]">
          <img
            src="/photos/jasmin.2213d0af1af34ae89051.jpg"
            alt="Jasmin Eapen, founder of Chilanka Dance School"
            className="zoom h-[26rem] w-full object-cover object-top sm:h-[33rem]"
          />
          <figcaption className="flex items-end justify-between gap-4 p-5 text-paper">
            <div>
              <p className="font-display text-3xl">Jasmin Eapen</p>
              <p className="text-sm text-paper/75">Founder & director · CRNA · 30 years on the floor</p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("faculty")}
              className="inline-flex h-11 items-center gap-1 text-sm text-pink"
            >
              Faculty <ArrowUpRight className="h-4 w-4" />
            </button>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

function Bells() {
  return (
    <section className="relative isolate overflow-hidden bg-wine text-paper">
      <img src={BELLS} alt="" className="ken absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-wine-deep via-wine-deep/80 to-wine/30" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">The name</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
            Chilanka is the anklet.
          </h2>
        </Reveal>
        <Reveal className="self-end" delay={140}>
          <p className="text-lg text-paper/85">
            In Malayalam, chilanka is the row of bells at the ankle — the sound that turns a
            step into a sentence. Every class in this school is built toward that: a foot that
            knows where it is, and a dancer who can be heard.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Forms() {
  const [current, setCurrent] = useState(0);
  const [held, setHeld] = useState(false);
  const style = styles[current];

  useEffect(() => {
    if (held) return;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % styles.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [held]);

  return (
    <section
      id="styles"
      className="scroll-mt-20 relative overflow-hidden bg-paper py-20 lg:py-28"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {styles.map((item, index) => (
        <img
          key={item.id}
          src={item.image}
          alt=""
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-30" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-paper/78" />
      <span key={style.id} className="wipe" aria-hidden="true" />
      <p key={`${style.id}-mark`} className="watermark fade-up" aria-hidden="true">
        {style.name}
      </p>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">Six forms</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Pick your rhythm.</h2>
          <p className="mt-4 text-muted">
            Six distinct styles. Six different moods. Choose the one that fits you — and watch
            the room transform around it.
          </p>
          <div className="mt-8 flex flex-col">
            {styles.map((item, index) => {
              const selected = index === current;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrent(index);
                    setHeld(true);
                  }}
                  className={`flex h-14 items-center justify-between border-t text-left transition-colors duration-300 ${
                    selected ? "border-magenta text-ink" : "border-line text-muted hover:text-ink"
                  }`}
                >
                  <span className={`font-display text-2xl ${selected ? "italic" : ""}`}>{item.name}</span>
                  <span className="text-xs uppercase tracking-[0.16em]">{item.from}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-7 lg:flex lg:justify-end">
          <div className="w-full max-w-md">
            <div className="frame-film relative overflow-hidden rounded-card border-2 border-pink bg-wine shadow-2xl">
              {styles.map((item, index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={index === current ? item.alt : ""}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    index === current ? "settle opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <p key={style.id} className="fade-up mt-5 text-lg text-ink">
              {style.copy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Classes({
  programId,
  onPick,
}: {
  programId: string;
  onPick: (id: string) => void;
}) {
  const [who, setWho] = useState<"child" | "woman" | null>(null);
  const visible = programs.filter((item) => {
    if (!who) return true;
    if (item.who === "archive") return true;
    return item.who === who;
  });

  return (
    <section id="classes" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">Classes</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Who is walking in?</h2>
        </div>
        <div className="flex gap-2">
          {(
            [
              ["child", "A child"],
              ["woman", "An adult woman"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setWho(who === value ? null : value)}
              className={`press h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                who === value ? "bg-wine text-paper" : "bg-blush text-wine"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((item, index) => {
          const selected = item.id === programId;
          const closed = item.who === "archive";
          return (
            <Reveal key={item.id} delay={index * 90}>
              <article
                className={`group overflow-hidden rounded-card border bg-paper transition-colors duration-300 ${
                  selected ? "border-magenta" : "border-line"
                }`}
              >
                <div className="shine m-1 overflow-hidden rounded-xl border-2 border-pink">
                  <img src={item.image} alt={item.alt} className="zoom h-56 w-full object-cover" />
                </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-magenta">{item.kicker}</p>
                <h3 className="mt-2 font-display text-4xl">{item.title}</h3>
                <p className="mt-3 text-muted">{item.summary}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {closed ? (
                  <p className="mt-5 text-sm text-muted">This season has closed. Fall enrollment is below.</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onPick(item.id);
                      scrollToId("enroll");
                    }}
                    className="press mt-5 inline-flex h-11 items-center rounded-full bg-magenta px-5 text-sm font-semibold text-ink"
                  >
                    {selected ? "Continue to enroll" : "Choose this class"}
                  </button>
                )}
              </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-8 grid gap-4 rounded-card bg-wine p-6 text-paper sm:grid-cols-3">
        <Fact icon={<Clock className="h-5 w-5" />} label="When" value={studio.schedule} />
        <Fact icon={<CalendarDays className="h-5 w-5" />} label="Tuition" value={`$${studio.tuition} / month`} />
        <Fact icon={<MapPin className="h-5 w-5" />} label="Where" value="Broadway Bend, Building 2" />
      </div>
      <p className="mt-4 text-sm text-muted">
        Enrollment is continuous and billed on the 1st. Level 1–3 meets Wednesdays, 6:00–7:00 PM.
      </p>
    </section>
  );
}

function Fact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 text-pink">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-paper/60">{label}</p>
        <p className="text-lg">{value}</p>
      </div>
    </div>
  );
}

function Faculty() {
  const [current, setCurrent] = useState(0);
  const person = teachers[current];

  return (
    <section id="faculty" className="scroll-mt-20 bg-blush py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="frame-portrait overflow-hidden rounded-card border-2 border-pink bg-wine">
            <img
              key={person.id}
              src={person.image}
              alt={person.alt}
              className="settle h-full w-full object-cover object-top"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={100}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">Faculty</p>
          <h2 key={person.name} className="fade-up mt-3 font-display text-5xl leading-none">
            {person.name}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-wine">{person.role}</p>
          <p key={person.bio} className="fade-up mt-6 text-lg text-ink">
            {person.bio}
          </p>
          <div className="mt-8 flex gap-3">
            {teachers.map((teacher, index) => (
              <button
                key={teacher.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-16 w-16 overflow-hidden rounded-full border-2 transition-all duration-300 ${
                  index === current ? "scale-110 border-magenta" : "border-pink opacity-80 hover:opacity-100"
                }`}
              >
                <img src={teacher.image} alt="" className="h-full w-full object-cover object-top" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const tags = ["All", "Stage", "Studio", "Community", "Camp"] as const;
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const items = useMemo(
    () => (tag === "All" ? gallery : gallery.filter((item) => item.tag === tag)),
    [tag],
  );
  const loop = useMemo(() => [...items, ...items], [items]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((value) => (value === null ? value : (value + 1) % items.length));
      if (event.key === "ArrowLeft")
        setOpen((value) => (value === null ? value : (value - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  useEffect(() => {
    const node = rail.current;
    if (!node || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let paused = false;
    const tick = () => {
      if (!paused && !drag.current.active) {
        node.scrollLeft += 0.65;
        const half = node.scrollWidth / 2;
        if (node.scrollLeft >= half) node.scrollLeft -= half;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const pause = () => {
      paused = true;
    };
    const play = () => {
      paused = false;
    };
    node.addEventListener("pointerenter", pause);
    node.addEventListener("pointerleave", play);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointerenter", pause);
      node.removeEventListener("pointerleave", play);
    };
  }, [items]);

  const current: GalleryItem | null = open === null ? null : items[open];

  return (
    <section id="gallery" className="scroll-mt-20 py-20 lg:py-28">
      <Reveal className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">Gallery</p>
          <h2 className="mt-3 font-display text-5xl leading-none">The room, in public.</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scroll">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setTag(item);
                setOpen(null);
                if (rail.current) rail.current.scrollLeft = 0;
              }}
              className={`press h-11 shrink-0 rounded-full px-4 text-sm ${
                tag === item ? "bg-ink text-paper" : "bg-blush text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </Reveal>
      <div
        ref={rail}
        className="stage-rail hide-scroll mt-8 flex gap-4 overflow-x-auto px-4 sm:px-6"
        onPointerDown={(event) => {
          if (!rail.current) return;
          drag.current = { active: true, x: event.clientX, left: rail.current.scrollLeft, moved: false };
          rail.current.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current.active || !rail.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 6) drag.current.moved = true;
          rail.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current.active = false;
        }}
      >
        {loop.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => {
              if (drag.current.moved) return;
              setOpen(index % items.length);
            }}
            className="stage-card group border-2 border-pink bg-wine text-left"
          >
            <img src={item.src} alt={item.alt} className="zoom h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-deep/90 to-transparent p-5 text-paper">
              <span className="block font-display text-3xl">{item.caption}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-pink">{item.tag}</span>
            </span>
          </button>
        ))}
      </div>
      {current ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-wine-deep/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close gallery"
            onClick={() => setOpen(null)}
          />
          <div className="lift relative z-10 w-full max-w-4xl">
            <img src={current.src} alt={current.alt} className="max-h-[78vh] w-full rounded-card border-2 border-pink object-contain" />
            <div className="mt-3 flex items-center justify-between text-paper">
              <p>{current.caption}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10"
                  onClick={() => setOpen((value) => (value === null ? value : (value - 1 + items.length) % items.length))}
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10"
                  onClick={() => setOpen((value) => (value === null ? value : (value + 1) % items.length))}
                >
                  <ChevronRight />
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/10"
                  onClick={() => setOpen(null)}
                >
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Visit() {
  const [nextLabel, setNextLabel] = useState("Wednesdays at 6:00 PM");

  useEffect(() => {
    const now = new Date();
    const next = new Date(now);
    const day = now.getDay();
    let add = (3 - day + 7) % 7;
    next.setDate(now.getDate() + add);
    next.setHours(18, 0, 0, 0);
    if (next.getTime() <= now.getTime()) {
      next.setDate(next.getDate() + 7);
    }
    const days = Math.ceil((next.getTime() - now.getTime()) / 86400000);
    setNextLabel(days <= 1 ? "Tomorrow · 6:00 PM" : `In ${days} days · Wednesday 6:00 PM`);
  }, []);

  return (
    <section id="visit" className="scroll-mt-20 bg-wine text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink">Visit</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Broadway Bend. Building 2.</h2>
          <p className="mt-4 text-lg text-paper/80">
            Next company class: <span className="text-paper">{nextLabel}</span>
          </p>
          <ul className="mt-8 space-y-4 text-lg">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-pink" />
              <a href={studio.maps} className="underline decoration-pink/50 underline-offset-4">
                {studio.address}
                <br />
                {studio.city}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-pink" />
              <a href={studio.phoneHref}>{studio.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-pink" />
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <a
            href={studio.maps}
            className="group relative block min-h-80 overflow-hidden rounded-card border-2 border-pink"
          >
            <img
              src="/photos/pic4.c8f2f466fbbb093bf1bf.jpg"
              alt="Chilanka students outside in Pearland"
              className="zoom absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 inline-flex h-11 items-center rounded-full bg-paper px-4 text-sm font-semibold text-ink">
              Open in Maps
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Enroll({
  programId,
  onProgram,
}: {
  programId: string;
  onProgram: (id: string) => void;
}) {
  const choices = programs.filter((item) => item.who !== "archive");
  const [dancer, setDancer] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const selected = choices.find((item) => item.id === programId) ?? choices[0];

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!dancer.trim() || !contact.trim() || (!phone.trim() && !email.trim())) {
      setError("Add the dancer, a contact name, and a phone or email.");
      setSent(false);
      return;
    }
    const entry = {
      program: selected.title,
      dancer: dancer.trim(),
      age: age.trim(),
      contact: contact.trim(),
      phone: phone.trim(),
      email: email.trim(),
      note: note.trim(),
      at: new Date().toISOString(),
    };
    let prior: unknown[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("chilanka-inquiries") || "[]") as unknown;
      if (Array.isArray(parsed)) prior = parsed;
    } catch {
      prior = [];
    }
    localStorage.setItem("chilanka-inquiries", JSON.stringify([entry, ...prior].slice(0, 20)));
    setError("");
    setSent(true);
  }

  const mailBody = encodeURIComponent(
    `Program: ${selected.title}\nDancer: ${dancer}\nAge: ${age || "—"}\nContact: ${contact}\nPhone: ${phone || "—"}\nEmail: ${email || "—"}\n\n${note}`,
  );
  const mailto = `mailto:${studio.email}?subject=${encodeURIComponent("Chilanka class inquiry")}&body=${mailBody}`;

  return (
    <section id="enroll" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">Enroll</p>
          <h2 className="mt-3 font-display text-5xl leading-none">Hold a place for fall.</h2>
          <p className="mt-4 text-muted">
            Wednesday company class is ${studio.tuition} a month. Tell Jasmin who is coming.
            This note stays on your device until you send it.
          </p>
          <div className="mt-8 space-y-3">
            {choices.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onProgram(item.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                  item.id === selected.id ? "border-magenta bg-blush" : "border-line bg-paper"
                }`}
              >
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-magenta">{item.kicker}</span>
                  <span className="font-display text-2xl">{item.title}</span>
                </span>
                <span className={`h-3 w-3 rounded-full ${item.id === selected.id ? "bg-magenta" : "bg-line"}`} />
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <form onSubmit={submit} className="rounded-card border border-line bg-paper p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Dancer’s name" value={dancer} onChange={setDancer} />
            <Field label="Age" value={age} onChange={setAge} />
            <Field label="Parent or contact" value={contact} onChange={setContact} />
            <Field label="Phone" value={phone} onChange={setPhone} type="tel" />
            <div className="sm:col-span-2">
              <Field label="Email" value={email} onChange={setEmail} type="email" />
            </div>
            <label className="sm:col-span-2 block text-sm">
              <span className="text-muted">Anything Jasmin should know</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink outline-none focus-visible:outline-2 focus-visible:outline-magenta"
              />
            </label>
          </div>
          {error ? <p className="mt-4 text-sm text-magenta-deep">{error}</p> : null}
          <button
            type="submit"
            className="press mt-6 inline-flex h-12 items-center rounded-full bg-wine px-6 font-semibold text-paper"
          >
            Save my note
          </button>
          {sent ? (
            <div className="lift mt-6 rounded-2xl bg-blush p-4">
              <p className="font-semibold text-wine">Saved on this device for {selected.title}.</p>
              <p className="mt-1 text-sm text-ink">
                The studio still needs the message. Send it, or call {studio.phone}.
              </p>
              <a
                href={mailto}
                className="press mt-4 inline-flex h-11 items-center rounded-full bg-magenta px-5 text-sm font-semibold text-ink"
              >
                Email Chilanka
              </a>
            </div>
          ) : null}
        </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-line bg-cream px-4 text-ink outline-none focus-visible:outline-2 focus-visible:outline-magenta"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <img src={LOGO} alt="" className="h-16 w-16 object-contain" />
          <p className="mt-3 font-display text-4xl text-wine">Chilanka Dance School</p>
          <p className="text-muted">Move. Inspire. Shine.{"\u00A0\u00A0"}Pearland, Texas</p>
        </div>
        <div className="flex gap-3">
          <a
            href={studio.instagram}
            aria-label="Instagram"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blush text-wine"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={studio.youtube}
            aria-label="YouTube"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blush text-wine"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href={studio.facebook}
            aria-label="Facebook"
            className="inline-flex h-11 items-center rounded-full bg-blush px-4 text-sm font-semibold text-wine"
          >
            Facebook
          </a>
        </div>
      </Reveal>
      <p className="flex flex-wrap items-center justify-center gap-x-2 px-4 pb-8 text-center text-xs text-muted">
        <span>© {new Date().getFullYear()} Chilanka Dance School.</span>
        <span>All Rights Reserved.</span>
      </p>
    </footer>
  );
}
