const BROWN = "#8B7355";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const LINE2 = "#D8D3CB";

type Props = {
  /** Path under public/, without extension: the .mp4 and the .jpg poster share it. */
  file: string;
  kicker: string;
  /** Read by screen readers as the name of the player. */
  label: string;
  caption: string;
};

/**
 * A video inside an essay, framed like the figures. Nothing is downloaded
 * until the reader presses play: the poster is a still from the film.
 */
export default function PostVideo({ file, kicker, label, caption }: Props) {
  return (
    <figure className="my-10">
      <div className="p-4 md:p-8" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
            {kicker}
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            agentictom.com
          </p>
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster={`${file}.jpg`}
          aria-label={label}
          style={{ display: "block", width: "100%", aspectRatio: "16 / 9", background: "#2B3A52", border: `1px solid ${LINE2}` }}
        >
          <source src={`${file}.mp4`} type="video/mp4" />
          <a href={`${file}.mp4`}>Download the video</a>
        </video>
        <figcaption className="text-xs mt-3" style={{ color: MUTED, lineHeight: 1.6 }}>
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
