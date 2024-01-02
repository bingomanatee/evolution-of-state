import {Box, Center, Heading, HStack, Spinner, Stack, useBreakpointValue, VStack, Image} from '@chakra-ui/react';
import Markdown from 'react-markdown';
import chakraComponents from '~/theme/chakra-components';
import {NextButton} from '~/components/next-button';
import {PictureFrame} from '~/components/picture-frame';
import {Art} from '~/components/art';
import ArticleErrorPage from '~/components/article-error-page';
import LayoutEvo from '~/pages/evolution/layout-evo';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import {withoutTitle} from '~/lib/without-title';
import chakraComponentsSidebar from '~/theme/chakra-components-sidebar';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';

const ARTICLE_NAME = 'origins.md';

export default function OriginsPage() {

  const [{
    article,
    done,
    articles
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME, 'vrml.md'], (state: leafI) => state.do.load());

  const stackDir = useBreakpointValue({
    sm: {
      stack: 'column',
    },
    md: {
      stack: 'row'
    },
    lg: {
      stack: 'row'
    }
  }, {fallback: 'md'});

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
            <Box>
              <Art src="/img/bothriolepis.svg" height={400}/>
              <Markdown components={chakraComponents}>{withoutTitle(article.text)}</Markdown>
            </Box>

            <Box layerStyle='callout'>
              <Heading variant='callout'>{articles[1].title}</Heading>
              <Image width="400px" src="/photos/vrml-sm.png" style={{float: 'right'}} ml={4} />
              <Markdown components={chakraComponentsSidebar}>{withoutTitle(articles[1].text)}</Markdown>
            </Box>
          </VStack>
          <VStack>
            <PictureFrame src='al-gore-sm.png' width={400} height={275}>
              Al Gore, outlining the fundamental tags required for HTML, with his good friend Barack Obama.
            </PictureFrame>
            <PictureFrame src='mosaic-sm.png' width={400} height={400}>
            Mosaic the first web browser.
            </PictureFrame>
            <PictureFrame src='netscape-sm.png' width={400} height={400}>
              Netcape the first cool web browser. Seriously; this was what a "cool web page" looked like in the 90's.
            </PictureFrame>
          </VStack>


        </Stack>

        <ButtonNavEvo page='origins' />
      </Box>
    </LayoutEvo>
  )
}