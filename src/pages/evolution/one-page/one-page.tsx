import {Box, Heading, Spinner, Stack, VStack} from '@chakra-ui/react';
import Markdown from 'react-markdown';
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
// import useIsSmall from '~/hooks/useIsSmall';
import Callout from '~/components/callout';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';
import {ASFvalue, isArticle, isArticleError} from '~/types';

const ARTICLE_NAME = 'one-page.md';
const ARTICLE_SUB_NAME = 'early-state.md';

function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}

export default function OnePage() {
  const [value, state] = useForest(articleStateFactory, [ARTICLE_NAME, ARTICLE_SUB_NAME, 'node.md'], (state: leafI) => state.do.load());
  const {
    article,
    done,
    articles
  } = value as ASFvalue;

  const stackDir =useStackDir();
  // const isSmall = useIsSmall();

  if (isArticleError(article)) {
    return <ArticleErrorPage article={article}/>
  }

  if (!state || !done || !isArticle(article)) {
    return <Spinner/>
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