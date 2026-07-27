"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  HERO_AUTOPLAY_COUNT,
  HERO_FRAME_COUNT,
  getHeroFrameSrc,
} from "@/lib/heroFrames";

export {
  HERO_AUTOPLAY_COUNT,
  HERO_FRAME_COUNT,
  HERO_SCROLL_END,
  HERO_SCROLL_START,
  getHeroFrameSrc,
} from "@/lib/heroFrames";

export type HeroFrameHandle = {
  setFrame: (index: number) => void;
  getReady: () => boolean;
  getAutoplayReady: () => boolean;
};

type HeroFrameSequenceProps = {
  className?: string;
  onAutoplayReady?: () => void;
  onReady?: () => void;
};

export const HeroFrameSequence = forwardRef<
  HeroFrameHandle,
  HeroFrameSequenceProps
>(function HeroFrameSequence({ className, onAutoplayReady, onReady }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: HERO_FRAME_COUNT }, () => null)
  );
  const inflightRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const cancelledRef = useRef(false);
  const frameRef = useRef(0);
  const readyRef = useRef(false);
  const autoplayReadyRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [autoplayReady, setAutoplayReady] = useState(false);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    // Prefer exact frame; fall back to nearest loaded earlier frame
    let img = imagesRef.current[index];
    if (!img?.complete || !img.naturalWidth) {
      for (let i = index; i >= 0; i -= 1) {
        const candidate = imagesRef.current[i];
        if (candidate?.complete && candidate.naturalWidth) {
          img = candidate;
          break;
        }
      }
    }
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(width * dpr));
    const h = Math.max(1, Math.floor(height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  const loadOne = (i: number, cancelled: () => boolean) =>
    new Promise<void>((resolve) => {
      if (cancelled()) {
        resolve();
        return;
      }
      if (imagesRef.current[i]?.complete) {
        resolve();
        return;
      }

      const existing = inflightRef.current.get(i);
      if (existing) {
        if (existing.complete) {
          imagesRef.current[i] = existing;
          inflightRef.current.delete(i);
          resolve();
          return;
        }
        const done = () => resolve();
        existing.addEventListener("load", done, { once: true });
        existing.addEventListener("error", done, { once: true });
        return;
      }

      const img = new Image();
      img.decoding = "async";
      inflightRef.current.set(i, img);

      const finish = () => {
        inflightRef.current.delete(i);
        resolve();
      };

      img.onload = () => {
        if (!cancelled()) imagesRef.current[i] = img;
        else img.src = "";
        finish();
      };
      img.onerror = () => {
        img.src = "";
        finish();
      };
      img.src = getHeroFrameSrc(i);
    });

  useImperativeHandle(ref, () => ({
    setFrame: (index: number) => {
      const clamped = Math.max(
        0,
        Math.min(HERO_FRAME_COUNT - 1, Math.round(index))
      );
      frameRef.current = clamped;
      draw(clamped);

      const ahead = 12;
      for (
        let i = clamped;
        i <= Math.min(HERO_FRAME_COUNT - 1, clamped + ahead);
        i++
      ) {
        if (!imagesRef.current[i] && !inflightRef.current.has(i)) {
          void loadOne(i, () => cancelledRef.current);
        }
      }
    },
    getReady: () => readyRef.current,
    getAutoplayReady: () => autoplayReadyRef.current,
  }));

  useEffect(() => {
    cancelledRef.current = false;
    let loaded = 0;
    const isCancelled = () => cancelledRef.current;

    const bump = () => {
      loaded += 1;
      if (!cancelledRef.current) {
        setProgress(loaded / HERO_FRAME_COUNT);
      }
    };

    const loadRange = async (from: number, to: number, batch: number) => {
      for (let start = from; start < to; start += batch) {
        if (cancelledRef.current) return;
        const end = Math.min(batch, to - start);
        const jobs = Array.from({ length: end }, (_, k) =>
          loadOne(start + k, isCancelled).then(bump)
        );
        await Promise.all(jobs);
        if (cancelledRef.current) return;
        draw(frameRef.current);
        await new Promise<void>((r) => setTimeout(r, 0));
      }
    };

    (async () => {
      const autoplayEnd = Math.min(HERO_AUTOPLAY_COUNT, HERO_FRAME_COUNT);

      await loadOne(0, isCancelled).then(bump);
      if (cancelledRef.current) return;
      draw(0);

      await loadRange(1, autoplayEnd, 4);
      if (cancelledRef.current) return;

      autoplayReadyRef.current = true;
      setAutoplayReady(true);
      onAutoplayReady?.();

      readyRef.current = true;
      onReady?.();

      if (autoplayEnd < HERO_FRAME_COUNT) {
        await loadRange(autoplayEnd, HERO_FRAME_COUNT, 2);
      }
    })();

    const onResize = () => draw(frameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      cancelledRef.current = true;
      window.removeEventListener("resize", onResize);

      inflightRef.current.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
      inflightRef.current.clear();

      for (let i = 0; i < imagesRef.current.length; i++) {
        const img = imagesRef.current[i];
        if (img) {
          img.src = "";
          imagesRef.current[i] = null;
        }
      }
    };
  }, [onAutoplayReady, onReady]);

  return (
    <div
      className={`hero-frames relative overflow-hidden bg-[#eceaea] ${className ?? ""}`}
      data-ready={autoplayReady ? "true" : "false"}
    >
      <canvas
        ref={canvasRef}
        className="hero-frame-canvas h-full w-full"
        aria-hidden
      />
      {!autoplayReady && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="font-display text-sm tracking-[0.24em] text-ink/40 uppercase">
            Revealing
          </span>
          <div className="h-px w-24 overflow-hidden bg-border">
            <div
              className="h-full bg-gold transition-[width] duration-200"
              style={{
                width: `${Math.round(
                  Math.min(
                    100,
                    ((progress * HERO_FRAME_COUNT) / HERO_AUTOPLAY_COUNT) * 100
                  )
                )}%`,
              }}
            />
          </div>
        </div>
      )}
      <span className="sr-only">Animated jewellery reveal sequence</span>
    </div>
  );
});
