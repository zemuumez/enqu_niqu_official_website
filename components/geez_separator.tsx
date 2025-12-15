export default function GeezSeparator() {
  return (
    <div className="flex items-center justify-center py-8">
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20 L30 10 L40 20 L30 30 Z M50 20 L60 10 L70 20 L60 30 Z M80 20 L90 10 L100 20 L90 30 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-oxidized-brass"
        />
        <circle
          cx="45"
          cy="20"
          r="2"
          fill="currentColor"
          className="text-oxidized-brass"
        />
        <circle
          cx="75"
          cy="20"
          r="2"
          fill="currentColor"
          className="text-oxidized-brass"
        />
      </svg>
    </div>
  );
}
