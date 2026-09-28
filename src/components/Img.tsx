"use client";

import { useEffect, useRef, useState } from "react";
import { media, type MediaId } from "@/content/media";

type Props = {
  id: MediaId;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Overrides the manifest focus point for object-position. */
  position?: string;
};

/** Responsive WebP from the generated manifest, with the Lanes blur-in on load. */
export default function Img({ id, alt, sizes = "100vw", className = "", priority = false, position }: Props) {
  const m = media[id];
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      src={m.src}
      srcSet={m.srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      onLoad={() => setLoaded(true)}
      className={`lazy${loaded ? " is-loaded" : ""} ${className}`.trim()}
      style={{
        objectPosition: position ?? `${m.focus[0]}% ${m.focus[1]}%`,
        backgroundImage: loaded ? undefined : `url(${m.blur})`,
        backgroundSize: "cover",
      }}
    />
  );
}

/** Art-directed picture: landscape composite on desktop, portrait crop on mobile (switches at 768px). */
export function ArtImg({
  desktop,
  mobile,
  alt,
  className = "",
  priority = false,
}: {
  desktop: MediaId;
  mobile: MediaId;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const d = media[desktop];
  const m = media[mobile];
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={d.srcSet} sizes="100vw" />
      <img
        ref={ref}
        src={m.src}
        srcSet={m.srcSet}
        sizes="100vw"
        width={m.width}
        height={m.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        className={`lazy${loaded ? " is-loaded" : ""} ${className}`.trim()}
        style={{ objectPosition: `${m.focus[0]}% ${m.focus[1]}%` }}
      />
    </picture>
  );
}
