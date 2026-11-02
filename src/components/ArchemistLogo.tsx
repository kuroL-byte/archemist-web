
interface ArchemistLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function ArchemistLogo({ variant = 'dark', className = 'h-11' }: ArchemistLogoProps) {
  const isDarkBg = variant === 'dark';
  const textColor = isDarkBg ? '#FFFFFF' : '#3f4448';
  const ruleColor = isDarkBg ? '#64748b' : '#4b5563';
  const subtextColor = isDarkBg ? '#cbd5e1' : '#52525b';

  return (
    <svg
      viewBox="0 0 460 110"
      className={`${className} w-auto select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ARCHEMIST - Turning Concepts Into Reality"
      role="img"
    >
      <g transform="translate(6, 4)">
        <path d="M 50 82 A 38 38 0 0 1 18 42 L 26 42 A 30 30 0 0 0 50 74 Z" fill="#4b5563" />
        <rect x="7" y="44" width="7" height="9" rx="1.5" transform="rotate(-15 10 48)" fill="#4b5563" />
        <rect x="10" y="60" width="7" height="9" rx="1.5" transform="rotate(-45 13 64)" fill="#4b5563" />
        <rect x="23" y="73" width="7" height="9" rx="1.5" transform="rotate(-70 26 77)" fill="#4b5563" />
        <rect x="42" y="80" width="7" height="9" rx="1.5" transform="rotate(-90 45 84)" fill="#4b5563" />
        <path d="M 46 6 C 46 3.8 47.8 2 50 2 C 52.2 2 54 3.8 54 6 L 54 14 L 46 14 Z" fill="#f36e21" />
        <path d="M 36 26 C 36 17 64 17 64 26 L 68 31 C 68 15 32 15 32 31 Z" fill="#f36e21" />
        <path d="M 37 25 L 21 86 L 28 88 L 44 30 Z" fill="#f36e21" />
        <path d="M 63 25 L 79 86 L 72 88 L 56 30 Z" fill="#f36e21" />
        <rect x="47.5" y="54" width="5" height="16" rx="2.5" fill="#f36e21" />
      </g>
      <text
        x="115"
        y="65"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="2.5"
        fill={textColor}
      >
        ARCHEMIST
      </text>
      <rect x="115" y="75" width="340" height="3" rx="1.5" fill={ruleColor} />
      <text
        x="118"
        y="96"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="500"
        fontSize="18.5"
        letterSpacing="1.2"
        fill={subtextColor}
      >
        Turning Concepts Into Reality
      </text>
    </svg>
  );
}

export default ArchemistLogo;
