import {Box, Center, Heading, HStack, Image, Spinner, Stack, Text, useBreakpointValue, VStack} from '@chakra-ui/react';
import Markdown from 'react-markdown';
import {TITLE_RE} from '~/lib/constants';
import chakraComponents from '~/theme/chakra-components';
import {NextButton} from '~/components/next-button';
import {PictureFrame} from '~/components/picture-frame';
import ArticleErrorPage from '~/components/article-error-page';
import {Art} from '~/components/art';
import LayoutEvo from '~/pages/evolution/layout-evo';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import chakraComponentsSidebar from '~/theme/chakra-components-sidebar';
import useStackDir from '~/hooks/useStackDir';
import useIsSmall from '~/hooks/useIsSmall';
import chakraComponentsQuote from '~/theme/chakra-components-quote';
import Callout from '~/components/callout';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';

const ARTICLE_NAME = 'one-page.md';
const ARTICLE_SUB_NAME = 'early-state.md';

function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}

export default function OnePage() {
  const [{
    article,
    done,
    articles
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME, ARTICLE_SUB_NAME, 'node.md'], (state: leafI) => state.do.load());

  const stackDir =useStackDir();
  const isSmall = useIsSmall();

  if (!state || !done || !article) {
    return <Spinner/>
  }

  if (state.$.errors()) {
    return <ArticleErrorPage article={article}/>
  }


  return (
    <LayoutEvo>
      <Box as='article' layerStyle='article'>
        <Heading as='h1' variant='page-head'>{article.title}</Heading>

        <Stack direction={stackDir} alignItems='flex-start' spacing={6}>
          <VStack alignItems='stretch'>
            <Art src="/img/stegosauras.svg" height={350}/>
            <Box>
              <Markdown components={chakraComponents}>{withoutTitle(article.text)}</Markdown>
            </Box>
            <Callout quote article={articles[2]} />
          </VStack>
          <VStack>
            <PictureFrame src='node-sm.png' width={[200, 200, 200, 400]} height={[150, 150, 150, 300]}>
              The team extinguished PHP as the dominant platform with the force of their urine.
            </PictureFrame>
            <PictureFrame src='doug-crockford-sm.jpg' width={[200, 200, 200, 400]} height={[200, 200, 200, 400]}>
              Douglas Crockford, inventor of JSON
            </PictureFrame>
            <PictureFrame src='Jeremy_Ashkenas-sm.jpg' width={[200, 200, 200, 400]} height={[200, 200, 200, 400]}>
              Jeremy Ashkenas invented Backbone while working at the New York Times in 2010
            </PictureFrame>
            <Callout article={articles[1]} />
          </VStack>
        </Stack>

        <ButtonNavEvo page='one-page' />
      </Box>
    </LayoutEvo>
  )
}