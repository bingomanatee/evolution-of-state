import '../rxdb-init';
import {createRxDatabase} from 'rxdb';
import {getRxStorageDexie} from 'rxdb/plugins/storage-dexie';
import ContentIf, {Article, ArticleError} from '~/types';
import {TITLE_RE} from '~/lib/constants';
import {RxDatabase} from 'rxdb';

let contentDb: RxDatabase;

export async function loadIndexedEngine(_source: ContentIf) {
  if (!contentDb) {
    contentDb = await createRxDatabase({
      name: 'content-db',
      storage: getRxStorageDexie()
    });
    await contentDb.addCollections({
      content: {
        schema: {
          version: 0,
          type: 'object',
          primaryKey: 'name',
          properties: {
            name: {type: 'string', maxLength: 100},
            text: {type: 'string'},
            title: {type: 'string'}
          },
          required: ['name', 'text', 'title']
        },
        statics: {
          async fetch(name: string, recurse?: boolean): Promise<ArticleError | Article> {
            if (!(name)) {throw new Error('ie name is required');}
            const m = await this.findByIds([name]).exec();

            if (!recurse) { // !m.has(name) &&
              const response = await fetch('/articles/' + name);
              const text = await response.text();
              const titleMatch = TITLE_RE.exec(text);

              const title = titleMatch ? titleMatch[1] : name;
              await this.incrementalUpsert({name, text, title})
              return this.fetch(name, true);
            }
            return m.get(name);
          }
        }
      }
    })
  }

  return contentDb.collections.content;
}
