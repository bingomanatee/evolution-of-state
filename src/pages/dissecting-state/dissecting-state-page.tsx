import {Box, Center, Heading, HStack, Spinner, VStack} from '@chakra-ui/react';
import Markdown from 'react-markdown';
import {TITLE_RE} from '~/lib/constants';
import chakraComponents from '~/theme/chakra-components';
import {Art} from '~/components/art';
import ArticleErrorPage from '~/components/article-error-page';
import LayoutEvo from '~/pages/evolution/layout-evo';
import useForest from '~/hooks/useForest';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import {articleStateFactory} from '~/lib/article-state-factory';
import ButtonNav from '~/pages/button-nav';

const ARTICLE_NAME = 'dissecting-state.md';

function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}

export default function DissectingStatePage() {
  const [{
    article,
    done,
    articles
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME], (state: leafI) => state.do.load());

  if (!state || !done || !article) {
    return <Spinner/>
  }

  if (state.$.errors()) {
    return <ArticleErrorPage article={article}/>
  }

  return (
    <Layout>
      <Box as='article' layerStyle='article'>
        <Heading as='h1' variant='page-head'>{article.title}</Heading>
        <Stack direction={stackDir} alignItems='flex-start' spacing={6}>
          <VStack>
            <Box>
              <Art src="/img/tryannosaur.svg" height={400}/>
              <Markdown components={chakraComponents}>{withoutTitle(article.text)}</Markdown>
            </Box>
          </VStack>
        </Stack>
        <ButtonNav page={'dissecting-state'} />
      </Box>
    </Layout>
  )
}