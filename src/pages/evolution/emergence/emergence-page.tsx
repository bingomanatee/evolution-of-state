import {Box, Center, Heading, HStack, Image, Spinner, Text, VStack} from '@chakra-ui/react';
import {memo, useEffect, useState} from 'react';
import {Article, ArticleError, ArticlePreLoaded, isArticleError, isArticlePreLoaded} from '~/types';
import {Content} from '~/lib/articles/content';
import Markdown from 'react-markdown';
import {TITLE_RE} from '~/lib/constants';
import chakraComponents from '~/theme/chakra-components';
import {NextButton} from '~/components/next-button';
import {PictureFrame} from '~/components/picture-frame';
import ArticleErrorPage from '~/components/article-error-page';
import {Art} from '~/components/art';
import LayoutEvo from '~/pages/evolution/layout-evo';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useForest from '~/hooks/useForest';
import {withoutTitle} from '~/lib/without-title';
import chakraComponentsSidebar from '~/theme/chakra-components-sidebar';
import Callout from '~/components/callout';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';

const ARTICLE_NAME = 'emergence.md';


export default function EmergencePage() {

  const [{
    article,
    articles,
    done
  }, state] = useForest(articleStateFactory, [ARTICLE_NAME, 'history-of-js.md'], (state: leafI) => state.do.load());


  if (!state || !article || isArticlePreLoaded(article)) {
    return <Spinner/>
  }

  if (state.$.errors()) {
    return <ArticleErrorPage article={article}/>
  }

  return (
    <LayoutEvo>

      <Box as='article' layerStyle='article'>
        <Heading as='h1' variant='page-head'>{article.title}</Heading>
        <HStack alignItems='flex-start' spacing={6}>
          <VStack>
            <Box>
              <Art src="/img/acanthostega.svg" height={400}/>
              <Markdown components={chakraComponents}>{withoutTitle(article.text)}</Markdown>

              <Callout article={articles[1]}/>
            </Box>
          </VStack>
          <VStack>
            <PictureFrame src='craig-newmark-sm.png' width={400} height={357}>
              Craig Newmark, inventor of social media.
            </PictureFrame>
            <PictureFrame src='hexagons-sm.png' width={400} height={357}>
              A sample of the "hex color grid" that dominated early web pages.
            </PictureFrame>
          </VStack>
        </HStack>
        <ButtonNavEvo page={'emergence'}/>
      </Box>
    </LayoutEvo>
  )
}