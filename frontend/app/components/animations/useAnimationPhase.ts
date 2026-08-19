'use client';

import { useEffect, useRef, useState } from 'react';

export type Phase = 'enter' | 'show' | 'exit';

interface PhaseTimings {
  show: number;
  exit: number;
  complete: number;
}

const DEFAULT_TIMINGS: PhaseTimings = {
  show: 100,
  exit: 3000,
  complete: 3800,
};

export function useAnimationPhase(
  timings: PhaseTimings = DEFAULT_TIMINGS,
  onComplete?: () => void,
) {
  const [phase, setPhase] = useState<Phase>('enter');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase('show'), timings.show);
    const exitTimer = setTimeout(() => setPhase('exit'), timings.exit);
    const completeTimer = setTimeout(
      () => onCompleteRef.current?.(),
      timings.complete,
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [timings.show, timings.exit, timings.complete]);

  return { phase };
}
