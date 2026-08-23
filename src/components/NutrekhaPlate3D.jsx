import React from "react";

/* -------------------------------------------------------------------- */
/*  Nutrekha — Rotating Nutrition Plate hero (real photo)               */
/* -------------------------------------------------------------------- */

const PALETTE = {
  cream: "#fdf6ee",
  creamDeep: "#fbefe4",
  rose: "#e85d8a",
  roseDeep: "#d63e6e",
  sage: "#3b4f2f",
  sageLight: "#6b8e4e",
  gold: "#c9a15a",
  blush: "#f7d9dd",
  blushLight: "#fcefef",
};

// Point this at your hosted image
const PLATE_IMAGE = "/images/plate.png";

export default function NutrekhaPlate3D() {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden rounded-3xl shadow-xl"
      style={{
        aspectRatio: "4 / 5",
        maxWidth: "420px",
        margin: "0 auto",
        background: `linear-gradient(150deg, ${PALETTE.cream} 0%, ${PALETTE.creamDeep} 55%, ${PALETTE.blushLight} 100%)`,
        fontFamily: "Georgia, 'Playfair Display', serif",
      }}
    >
      <style>{`
        @keyframes nutrekha-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .nutrekha-plate-spin {
          animation: nutrekha-spin 22s linear infinite;
        }
        .nutrekha-plate-spin:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* corner floral accents */}
      <CornerFloral corner="tl" />
      <CornerFloral corner="br" flip />

      {/* Perfectly Circular Rotating Plate Area */}
      <div className="my-auto py-2 flex items-center justify-center w-full">
        <div className="relative w-[210px] h-[210px] xs:w-[230px] xs:h-[230px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] aspect-square flex-shrink-0">
          {/* soft ground shadow */}
          <div
            className="absolute"
            style={{
              left: "5%",
              right: "5%",
              bottom: "-6%",
              height: "18%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(80,50,40,0.28) 0%, rgba(80,50,40,0) 70%)",
              filter: "blur(4px)",
            }}
          />

          {/* thin gold ring - guaranteed perfect circle */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 0 3px ${PALETTE.gold}, 0 16px 36px -8px rgba(90,60,40,0.35)`,
            }}
          />

          {/* rotating photo masked to a circle */}
          <div
            className="nutrekha-plate-spin absolute inset-0 rounded-full overflow-hidden"
            style={{ border: `5px solid #fffdf9` }}
          >
            <img
              src={PLATE_IMAGE}
              alt="Balanced Nutrekha breakfast plate"
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Badge text below plate - guaranteed NO overlap */}
      <div className="relative z-10 mt-2 text-center px-2">
        <span className="hero-badge text-[10px] sm:text-[11px] leading-snug block max-w-[280px] sm:max-w-[340px] mx-auto font-medium text-center tracking-wide">
          Personalized nutrition designed for real lives—not perfect ones.
        </span>
      </div>
      {GoldDivider()}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-2">
      <span style={{ width: 26, height: 1, background: PALETTE.gold }} />
      <span style={{ color: PALETTE.gold, fontSize: 10 }}>✦</span>
      <span style={{ width: 26, height: 1, background: PALETTE.gold }} />
    </div>
  );
}

function CornerFloral({ corner = "tl", flip = false }) {
  const style = {
    tl: { top: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  }[corner];
  return (
    <svg
      width="90"
      height="110"
      viewBox="0 0 120 150"
      className="absolute pointer-events-none opacity-70 z-0"
      style={{
        ...style,
        transform: flip ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M8 4 C 30 20, 20 60, 40 90 C 55 112, 45 135, 30 148"
        fill="none"
        stroke={PALETTE.sageLight}
        strokeWidth="2"
        opacity="0.6"
      />
      {[18, 42, 68, 96].map((y, i) => (
        <ellipse
          key={i}
          cx={16 + (i % 2) * 10}
          cy={y}
          rx="9"
          ry="4.5"
          fill={PALETTE.sageLight}
          opacity="0.55"
          transform={`rotate(${-30 + i * 18} ${16 + (i % 2) * 10} ${y})`}
        />
      ))}
      {[
        [22, 14],
        [30, 55],
      ].map(([cx, cy], i) => (
        <g key={i} opacity="0.85">
          {[0, 60, 120, 180, 240, 300].map((rot) => (
            <ellipse
              key={rot}
              cx={cx}
              cy={cy}
              rx="7"
              ry="4"
              fill={PALETTE.rose}
              opacity="0.75"
              transform={`rotate(${rot} ${cx} ${cy})`}
            />
          ))}
          <circle cx={cx} cy={cy} r="2.6" fill={PALETTE.gold} />
        </g>
      ))}
    </svg>
  );
}
