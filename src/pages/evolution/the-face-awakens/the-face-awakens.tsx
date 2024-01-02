import {Box, Center, Heading, HStack, Image, Spinner, Stack, Text, useBreakpointValue, VStack} from '@chakra-ui/react';
import {TITLE_RE} from '~/lib/constants';
import chakraComponents from '~/theme/chakra-components';
import {PictureFrame} from '~/components/picture-frame';
import ArticleErrorPage from '~/components/article-error-page';
import {Art} from '~/components/art';
import LayoutEvo from '~/pages/evolution/layout-evo';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import useIsSmall from '~/hooks/useIsSmall';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';
import ArticleSection from '~/components/ArticleSection';
import Callout from '~/components/callout';

const ARTICLE_NAME = 'the-face-awakens.md';
const ARTICLE_SUB_NAME = 'early-state.md';

function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}

export default function TheFaceAwakens() {
  const [{
    article,
    done,
    articles
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME, 'face-2.md', 'face-3.md', ARTICLE_SUB_NAME, 'history-of-js.md', 'node.md'], (state: leafI) => state.do.load());

  const stackDir = useStackDir();
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
        <Heading as='h1' variant='page-head'>The Face Awakens</Heading>
        <Stack direction={stackDir} alignItems='flex-start' spacing={6}>
          <VStack alignItems='stretch'>
            <Art src="/img/tricaratops.svg" height={350}/>
            <Box>
              <ArticleSection article={article} noTitle/>

              <iframe width="560" height="315" src="https://www.youtube.com/embed/MkfsSUBlqUY?si=Zk-1DAOiMC1FlCcD"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </Box>

          </VStack>
          <VStack>
            <PictureFrame src='lego-software-designer-sm.png' width={[200, 200, 200, 400]}
              height={[200, 200, 200, 400]}>
              The inventor of React (artists conception).
            </PictureFrame>
          </VStack>
        </Stack>

        <Stack direction={stackDir} spacing={6} width='100%'>
          <VStack alignItems='start' flex={10}>
            <ArticleSection article={articles[1]} noTitle/>
            <Callout quote article={articles[2]} maxHeight={600}/>
          </VStack>
          <VStack maxWidth={['100%', '100%', '400px']}>
            <PictureFrame src='howard-the-duck-sm.jpg'
              width={[200, 200, 200, 400]}
              height={[200, 200, 200, 400]}>
              Howard the Duck, developer of Redux.
            </PictureFrame>
            <Callout quote={isSmall} width={400} article={articles[3]}/>
          </VStack>
        </Stack>

        <ButtonNavEvo page='the-face-awakens'/>
      </Box>
    </LayoutEvo>
  )
}