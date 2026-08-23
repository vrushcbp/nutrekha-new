/**
 * Botanical Decoration SVG Components
 *
 * Decorative floral/vine SVGs used as background accents.
 * - BotanicalTopLeft: flower buds + stems for top-left corner
 * - BotanicalBottomRight: vine + leaf outlines for bottom-right corner
 * - DotAccents: subtle pink dot elements
 */

export const BotanicalTopLeft = () => (
  <svg
    className="botanical-tl"
    width="180"
    height="260"
    viewBox="0 0 180 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Main stem */}
    <path
      d="M60 260 C60 200, 40 160, 50 100 C55 70, 45 40, 55 10"
      stroke="#D4A0A0"
      strokeWidth="1.2"
      fill="none"
      opacity="0.5"
    />
    {/* Branch 1 */}
    <path
      d="M50 100 C30 85, 15 75, 10 60"
      stroke="#D4A0A0"
      strokeWidth="1"
      fill="none"
      opacity="0.4"
    />
    {/* Branch 2 */}
    <path
      d="M55 70 C70 55, 80 40, 75 25"
      stroke="#D4A0A0"
      strokeWidth="1"
      fill="none"
      opacity="0.4"
    />
    {/* Flower bud 1 */}
    <ellipse cx="55" cy="10" rx="8" ry="12" fill="#E8B4B8" opacity="0.5" />
    <ellipse cx="55" cy="8" rx="5" ry="8" fill="#F0C8CC" opacity="0.6" />
    {/* Flower bud 2 */}
    <ellipse cx="10" cy="55" rx="7" ry="10" fill="#E8B4B8" opacity="0.4" transform="rotate(-30, 10, 55)" />
    <ellipse cx="10" cy="53" rx="4.5" ry="7" fill="#F0C8CC" opacity="0.5" transform="rotate(-30, 10, 53)" />
    {/* Flower bud 3 */}
    <ellipse cx="75" cy="22" rx="6" ry="9" fill="#E8B4B8" opacity="0.4" transform="rotate(15, 75, 22)" />
    <ellipse cx="75" cy="20" rx="4" ry="6" fill="#F0C8CC" opacity="0.5" transform="rotate(15, 75, 20)" />
    {/* Small leaves */}
    <ellipse cx="40" cy="130" rx="12" ry="5" fill="#C8D8C0" opacity="0.25" transform="rotate(-40, 40, 130)" />
    <ellipse cx="65" cy="50" rx="10" ry="4" fill="#C8D8C0" opacity="0.2" transform="rotate(30, 65, 50)" />
  </svg>
);

export const BotanicalBottomRight = () => (
  <svg
    className="botanical-br"
    width="280"
    height="320"
    viewBox="0 0 280 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Large decorative leaf outline */}
    <path
      d="M280 320 C260 280, 220 260, 200 220 C180 180, 200 140, 180 100 C170 80, 150 70, 160 50"
      stroke="#E8C4C4"
      strokeWidth="1.2"
      fill="none"
      opacity="0.35"
    />
    <path
      d="M200 220 C230 200, 250 180, 260 150"
      stroke="#E8C4C4"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
    <path
      d="M180 100 C200 90, 220 85, 240 90"
      stroke="#E8C4C4"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
    {/* Leaf shapes */}
    <path
      d="M260 150 C255 135, 245 130, 260 120"
      stroke="#E8C4C4"
      strokeWidth="0.8"
      fill="none"
      opacity="0.3"
    />
    <ellipse cx="240" cy="88" rx="15" ry="6" fill="#E8D0D0" opacity="0.15" transform="rotate(10, 240, 88)" />
    <ellipse cx="162" cy="48" rx="10" ry="14" fill="#E8B4B8" opacity="0.2" />
    <ellipse cx="162" cy="45" rx="6" ry="9" fill="#F0C8CC" opacity="0.25" />
    {/* Additional vine */}
    <path
      d="M160 50 C140 60, 130 80, 120 100 C110 120, 100 160, 120 180"
      stroke="#D8B8B8"
      strokeWidth="0.8"
      fill="none"
      opacity="0.2"
    />
  </svg>
);

/**
 * Subtle dot accent decorations
 * Renders 3 positioned pink dots that add visual rhythm to sections.
 */
export const DotAccents = () => (
  <>
    <div className="dot-accent dot-accent-1" aria-hidden="true" />
    <div className="dot-accent dot-accent-2" aria-hidden="true" />
    <div className="dot-accent dot-accent-3" aria-hidden="true" />
  </>
);
