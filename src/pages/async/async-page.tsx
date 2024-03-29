import Layout from '~/pages/layout';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import {Spinner, Heading, VStack, Box, Stack} from '@chakra-ui/react';
import ArticleErrorPage from '~/components/article-error-page';
import ArticleSection from '~/components/ArticleSection';
import ButtonNav from '~/pages/button-nav';
import {ASFvalue, isArticleError} from '~/types';

const ARTICLE_NAME = 'async.md';
export default function AsyncPage() {

  const [value, state] = useForest(articleStateFactory, [ARTICLE_NAME], (state: leafI) => state.do.load());
  const {
    article,
    done,
  } = value as ASFvalue;

  const stackDir = useStackDir();
  // const isSmall = useIsSmall();

  if (!state || !done || !article) {
    return <Spinner/>
  }

  if (isArticleError(article)) {
    return <ArticleErrorPage article={article}/>
  }

  return <Layout>
    <Box as='article' layerStyle='article'>
      <Stack direction={stackDir}>
        <VStack>
          <Heading variant='page-head'>The Nautilus of State</Heading>
          <ArticleSection article={article} art={{src: 'pterodactyl.svg', height: 200}}/>
        </VStack>
      </Stack>
      <ButtonNav page={'async'}></ButtonNav>

    </Box>
  </Layout>

}