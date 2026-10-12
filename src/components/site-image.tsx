import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/site-path";

export default function SiteImage(props: ImageProps) {
  const src = typeof props.src === "string" ? assetPath(props.src) : props.src;
  if (
    typeof props.src === "string" &&
    props.src.startsWith("/images/animals/") &&
    props.src.endsWith("-4k.webp")
  ) {
    const srcSet = [768, 1280, 1920, 2560, 3840]
      .map(
        (width) =>
          `${assetPath((props.src as string).replace("-4k.webp", `-${width === 3840 ? "4k" : width}.webp`))} ${width}w`,
      )
      .join(", ");
    // Static hosting has no image optimizer. Let the browser choose local
    // derivatives instead of downloading a 4K file on every small screen.
    const eager = props.priority || props.preload || props.loading === "eager";
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={srcSet}
          sizes={props.sizes || "100vw"}
        />
        <Image
          {...props}
          src={src}
          alt={props.alt}
          unoptimized
          priority={false}
          preload={false}
          loading={eager ? "eager" : props.loading}
          fetchPriority={eager ? "high" : props.fetchPriority}
        />
      </picture>
    );
  }
  return <Image {...props} src={src} alt={props.alt} />;
}
