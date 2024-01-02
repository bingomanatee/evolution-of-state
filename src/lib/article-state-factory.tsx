import {leafI} from '@wonderlandlabs/forest/lib/types';
import {Content} from '~/lib/articles/content';
import {isArticleError} from '~/types';

export function articleStateFactory(names: string[]) {
  if (!Array.isArray(names)) {
    throw new Error('bd argument to articleStateFactory:', names);
  }
  return ({
    $value: {
      article: {loaded: false, name: names[0]},
      articles: [],
      done: false
    },
    actions: {
      async load(state: leafI) {
        const articles = await Promise.all(names.map((name) => {
          return Content.singleton.getArticle(name)
            .catch((err) => {
              return (
                {
                  name,
                  error: err
                }
              )
            });
        }));
        console.log('articles are:', articles);
        state.do.set_articles(articles);
        state.do.set_article(articles[0]);
        state.do.set_done(true);
      }
    },
    selectors: {
      errors(state: leafI) {
        const {articles} = state.value;
        if(articles.length && articles?.some(isArticleError)) {
          console.log('some of the articles have errors: ', articles);
          return true;
        }
        return false;
      }
    }
  });
}