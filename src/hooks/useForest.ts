import {Forest} from '@wonderlandlabs/forest';
import {useEffect, useRef, useState} from 'react';
import {leafConfig, leafI} from '@wonderlandlabs/forest/lib/types';

export default function useForest(
  seed,
  // @ts-expect-error untyped data input
  data,
  onComplete
) {

  const stateRef = useRef(null);
  const [value, setValue] = useState({});

  useEffect(() => {
    const seedFn = typeof seed === 'function' ? seed : () => seed;
    if (!stateRef.current) {
      stateRef.current = new Forest(seedFn(data));
      if (typeof onComplete === 'function') {
        onComplete(stateRef.current);
      }
    }
    const sub = stateRef.current.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [seed]) // deliberately leave out data; only seed once, regardless of parameter changes.

  return [value, stateRef.current]
}