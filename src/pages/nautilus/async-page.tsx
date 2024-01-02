import Layout from '~/pages/layout';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import useIsSmall from '~/hooks/useIsSmall';
import {Spinner, Heading, VStack, Box, Stack, Button} from '@chakra-ui/react';
import ArticleErrorPage from '~/components/article-error-page';
import ArticleSection from '~/components/ArticleSection';
import ButtonNav from '~/pages/button-nav';

const ARTICLE_NAME = 'async.md';
export default function AsyncPage() {

  const [{
    article,
    done,
    articles
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME], (state: leafI) => state.do.load());

  const stackDir = useStackDir();
  const isSmall = useIsSmall();

  if (!state || !done || !article) {
    return <Spinner/>
  }

  if (state.$.errors()) {
    return <ArticleErrorPage article={article}/>
  }

  return <Layout>
    <Box as='article' layerStyle='article'>
      <Stack direction={stackDir}>
        <VStack>
          <Heading variant='page-head'>The Nautilus of State</Heading>
          <ArticleSection article={article} art={{src: 'pterodactyl.svg', height: 300}}/>
        </VStack>
      </Stack>
      <ButtonNav page={'async'}></ButtonNav>

    </Box>
  </Layout>

}