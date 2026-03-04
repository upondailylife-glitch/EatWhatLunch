const WHEEL_COLORS = [
  '#FF6B6B',
  '#FF9F43',
  '#FFD166',
  '#06D6A0',
  '#1B9AAA',
  '#4D96FF',
  '#9B5DE5',
  '#F15BB5',
];

export const SPIN_DURATION_MS = 4800;

export function buildWheelGradient(totalEntries) {
  if (totalEntries <= 0) {
    return 'conic-gradient(from -90deg, #d9dce4 0deg 360deg)';
  }

  const slice = 360 / totalEntries;
  const stops = Array.from({ length: totalEntries }, (_, index) => {
    const start = slice * index;
    const end = slice * (index + 1);
    const color = WHEEL_COLORS[index % WHEEL_COLORS.length];
    return `${color} ${start}deg ${end}deg`;
  });

  return `conic-gradient(from -90deg, ${stops.join(', ')})`;
}

export function getLabelTransform(index, totalEntries) {
  const angle = (360 / totalEntries) * index + 180 / totalEntries;
  return `rotate(${angle}deg) translateY(calc(-1 * var(--wheel-size) / 2 + 68px)) rotate(${-angle}deg)`;
}

export function calculateNextRotation({ currentRotation, targetIndex, totalEntries }) {
  const section = 360 / totalEntries;
  const targetCenter = targetIndex * section + section / 2;
  const normalizedCurrent = currentRotation % 360;
  const alignOffset = (360 - targetCenter - normalizedCurrent + 360) % 360;
  const rounds = 6 + Math.floor(Math.random() * 3);

  return currentRotation + rounds * 360 + alignOffset;
}
