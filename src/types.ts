export type Article = {
  text: string;
  title: string;
  description?: string;
  name: string;
}

export function isArticle(a: unknown): a is Article {
  return !!(
    a && typeof a === 'object' &&
    'title' in a && typeof a.title === 'string'
    && (!('loaded' in a) || a.loaded !== false)
    && 'text' in a && typeof a.text === 'string'
  );
}

export interface ArticleError {
  name: string;
  error: Error;
}

export type ASFvalue = {
  article: Article,
  articles: Article[],
  done: boolean
}

export function isArticleError(a: ArticleInFlow): a is ArticleError {
  if (!a && typeof a === 'object') {
    return false;
  }
  // @ts-expect-error typeguard function, type checking is problematic in this arena
  return a.name && (typeof a.name) === 'string' && ('error' in a) && typeof a.error.message === 'string'
}

export default interface ContentIf {
  getArticle(title: string): Promise<Article | ArticleError>;
}

export type ArticlePreLoaded = {
  loaded: false,
  name: string
}

export function isArticlePreLoaded(a: ArticleInFlow): a is ArticlePreLoaded {
  // @ts-expect-error typeguard function, type checking is problematic in this arena
  return a?.loaded === false && typeof a?.name === 'string'
}

export type ArticleInFlow = Article | ArticleError | ArticlePreLoaded