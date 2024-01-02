import Layout from '~/pages/layout';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import {Spinner, Heading, VStack, Box, Stack} from '@chakra-ui/react';
import ArticleErrorPage from '~/components/article-error-page';
import ArticleSection from '~/components/ArticleSection';
import ButtonNav from '~/pages/button-nav';
import Callout from '~/components/callout';
import {ASFvalue, isArticleError} from '~/types';

const ARTICLE_NAME = 'design-patterns.md';
export default function DesignPatternsPage() {

  const [value, state] = useForest(articleStateFactory, [ARTICLE_NAME, 'immutability.md', 'mvc.md', 'typescript.md'], (state: leafI) => state.do.load());
  const {
    article,
    done,
    articles
  } = value as ASFvalue;

  const stackDir = useStackDir();
  //const isSmall = useIsSmall();

  if (!state || !done || !article) {
    return <Spinner/>
  }

  if (isArticleError(article)) {
    return <ArticleErrorPage article={article}/>
  }

  return <Layout>
    <Box as='article' layerStyle='article'>
      <Stack direction={stackDir} width='100%'>
        <VStack>
          <Heading variant='page-head'>State Design Patterns</Heading>
          <ArticleSection article={article} noTitle art={{src: 'circle-of-state.svg', height: 500}}/>
          <Callout quote article={articles[3]} />
        </VStack>
        <VStack>
          <Callout article={articles[1]} />
          <Callout article={articles[2]} />
        </VStack>
      </Stack>
      <ButtonNav page={'design-patterns'}></ButtonNav>

    </Box>
  </Layout>

}