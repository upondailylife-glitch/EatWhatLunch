import { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildWheelGradient,
  calculateNextRotation,
  getLabelTransform,
  SPIN_DURATION_MS,
} from '../utils/wheel';
import './LunchWheel.css';

export default function LunchWheel({ entries, onResult, onSpinStateChange, spinning }) {
  const [rotation, setRotation] = useState(0);
  const timeoutRef = useRef(null);

  const gradient = useMemo(() => buildWheelGradient(entries.length), [entries.length]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSpin = () => {
    if (spinning || entries.length < 2) {
      return;
    }

    const winnerIndex = Math.floor(Math.random() * entries.length);
    const nextRotation = calculateNextRotation({
      currentRotation: rotation,
      targetIndex: winnerIndex,
      totalEntries: entries.length,
    });

    onSpinStateChange(true);
    onResult('正在旋转...');
    setRotation(nextRotation);

    timeoutRef.current = window.setTimeout(() => {
      onResult(`今天中午：${entries[winnerIndex]}`);
      onSpinStateChange(false);
    }, SPIN_DURATION_MS);
  };

  return (
    <section className="lunch-wheel-panel">
      <div className="wheel-stage">
        <div className="wheel-pointer" />
        <div
          className="wheel"
          style={{
            background: gradient,
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${SPIN_DURATION_MS}ms`,
          }}
        >
          {entries.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="wheel-label"
              style={{ transform: getLabelTransform(index, entries.length) }}
            >
              {item}
            </div>
          ))}
          <div className="wheel-center">吃什么</div>
        </div>
      </div>

      <button className="spin-button" onClick={handleSpin} disabled={spinning || entries.length < 2}>
        {spinning ? '旋转中...' : '开始抽取'}
      </button>
      <p className="spin-tip">至少保留 2 个词条才可以转动</p>
    </section>
  );
}
