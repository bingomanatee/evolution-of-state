import {Forest} from '@wonderlandlabs/forest';
import {useEffect, useRef, useState} from 'react';
import {leafI} from '@wonderlandlabs/forest/lib/types';

type StateHandler = (state: leafI) => void;
export default function useForest(
  seed: unknown,
  // @ts-expect-error untyped data input
  data,
  onComplete?: StateHandler
) {

  const stateRef = useRef<leafI | null>(null);
  const [value, setValue] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const seedFn = typeof seed === 'function' ? seed : () => seed;
    if (!stateRef.current) {
      stateRef.current = new Forest(seedFn(data));
      if (typeof onComplete === 'function' && stateRef.current) {
        onComplete(stateRef.current);
      }
    }
    const sub = stateRef.current.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [seed]) // deliberately leave out data; only seed once, regardless of parameter changes.

  return [value, stateRef.current]
}