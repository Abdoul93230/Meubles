interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'gold';
}

export default function Logo({ size = 'md', variant = 'dark' }: LogoProps) {
  const scales = { sm: 0.75, md: 1, lg: 1.4 };
  const s = scales[size];

  const textColor =
    variant === 'light' ? '#FFFFFF' :
    variant === 'gold'  ? '#8B6914' :
    '#0D0D1A';

  const goldColor = '#C4A035';
  const goldDark  = '#8B6914';
  const goldPale  = '#F5EDD8';

  const w = Math.round(220 * s);
  const h = Math.round(52 * s);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 220 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Istanbul Meubles"
    >
      <defs>
        {/* Gold gradient for icon */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C84A" />
          <stop offset="50%" stopColor={goldColor} />
          <stop offset="100%" stopColor={goldDark} />
        </linearGradient>
        {/* Subtle glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Icon mark (44×44 viewbox mapped into 0..48 space) ── */}
      {/* Background pill */}
      <rect x="0" y="4" width="48" height="44" rx="10" fill={goldPale} />

      {/* Arch — stylized crescent of a dome → Ottoman reference */}
      <path
        d="M24 10 C13 10 8 17 8 24 C8 34 14 40 24 40 C34 40 40 34 40 24 C40 17 35 10 24 10 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Inner arch — second concentric */}
      <path
        d="M24 16 C17 16 14 20 14 25 C14 31 18 35 24 35 C30 35 34 31 34 25 C34 20 31 16 24 16 Z"
        fill="none"
        stroke={goldColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Center diamond gem */}
      <path
        d="M24 20 L27 25 L24 30 L21 25 Z"
        fill="url(#goldGrad)"
        filter="url(#glow)"
      />
      <path
        d="M24 20 L27 25 L24 26.5 Z"
        fill="#E8C84A"
        opacity="0.7"
      />

      {/* Top star accent */}
      <circle cx="24" cy="9" r="2" fill={goldColor} />
      <circle cx="24" cy="9" r="1" fill="#E8C84A" />

      {/* Left & right decorative dots */}
      <circle cx="9"  cy="26" r="1.2" fill={goldColor} opacity="0.7" />
      <circle cx="39" cy="26" r="1.2" fill={goldColor} opacity="0.7" />

      {/* Bottom horizontal bar */}
      <line x1="12" y1="42" x2="36" y2="42" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Text mark ── */}
      {/* "ISTANBUL" — bold, spaced */}
      <text
        x="56"
        y="24"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="3"
        fill={textColor}
      >
        ISTANBUL
      </text>

      {/* Gold underline accent under ISTANBUL */}
      <rect x="56" y="27" width="82" height="1.5" rx="1" fill={goldColor} opacity="0.5" />

      {/* "MEUBLES" — lighter weight, spaced, gold */}
      <text
        x="57"
        y="42"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="400"
        fontSize="13.5"
        letterSpacing="5"
        fill={goldDark}
      >
        MEUBLES
      </text>

      {/* Small tagline dot separators */}
      <circle cx="145" cy="24" r="1.5" fill={goldColor} opacity="0.8" />
      <circle cx="152" cy="24" r="1"   fill={goldColor} opacity="0.5" />
    </svg>
  );
}
