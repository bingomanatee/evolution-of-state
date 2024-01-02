export type Article = {
  text: string;
  title: string;
  description?: string;
  name: string;
}

export interface ArticleError {
  name: string;
  error: Error;
}

export function isArticleError(a: ArticleInFlow ): a is ArticleError {
  if (!a && typeof a === 'object') {return false;}
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

export function isArticlePreLoaded(a: ArticleInFlow) : a is ArticlePreLoaded {
  // @ts-expect-error typeguard function, type checking is problematic in this arena
  return a?.loaded === false && typeof a?.name === 'string'
}

export type ArticleInFlow = Article | ArticleError | ArticlePreLoaded