import ContentIf, {Article, ArticleError} from '../../types';
import {loadIndexedEngine} from '~/lib/articles/load-indexed-engine';
// import {loadMemoryEngine} from '~/lib/articles/load-memory-engine';
import {RxCollection} from 'rxdb';

export class Content implements ContentIf {
  constructor() {
    try {
      this.engine = loadIndexedEngine(this);
    } catch (err) {
      console.log('error loading indexed engine:', (err as Error).message, err);
      throw err;
      //  this.engine = loadMemoryEngine(this); -- for mobile required as fallback.
    }
  }

  async getArticle(name: string): Promise<Article | ArticleError> {
    const c = await this.engine;
    try {
      // @ts-expect-error using custom method 'fetch'
      const article = await c.fetch(name);
      return article.toJSON() as Article;
    } catch (err) {
      return {
        name,
        error: err as Error
      }
    }
  }

  private engine: Promise<RxCollection>;
  private static _singleton?: ContentIf;

  public static get singleton () {
    if (!Content._singleton) {
      Content._singleton = new Content();
    }
    return Content._singleton;
  }
}
