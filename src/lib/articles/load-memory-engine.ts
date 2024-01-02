import '../rxdb-init';
import {loadIndexedEngine} from '~/lib/articles/load-indexed-engine';
import ContentIf from '~/types';

export async function loadMemoryEngine(source: ContentIf) {
  return loadIndexedEngine(source);
}
