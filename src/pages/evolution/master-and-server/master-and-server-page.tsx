import {Box, Heading, Spinner, Stack, VStack} from '@chakra-ui/react';

import Markdown from 'react-markdown';
import {TITLE_RE} from '~/lib/constants';
import chakraComponents from '~/theme/chakra-components';
import {PictureFrame} from '~/components/picture-frame';
import ArticleErrorPage from '~/components/article-error-page';
import {Art} from '~/components/art';
import LayoutEvo from '~/pages/evolution/layout-evo';
import Callout from '~/components/callout';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';
import {ASFvalue, isArticleError} from '~/types';

const ARTICLE_NAME = 'master-and-server.md';
const ARTICLE_SUB_NAME = 'unit-testing.md'
function withoutTitle(text: string) {
  return text.replace(TITLE_RE, '');
}

export default function MasterAndServerPage() {

  const [value, state] = useForest(articleStateFactory, [ARTICLE_NAME, ARTICLE_SUB_NAME], (state: leafI) => state.do.load());
  const {
    article,
    done,
    articles
  } = value as ASFvalue;
  const stackDir = useStackDir();

  if (isArticleError(article)) {
    return <ArticleErrorPage article={article}/>
  }

  if (!state || !done || !article) {
    return <Spinner/>
  }

  return (
    <LayoutEvo>
      <Box as='article' layerStyle='article'>
        <Heading as='h1' variant='page-head'>{article.title}</Heading>
        <Stack direction={stackDir} alignItems='flex-start' spacing={6}>
          <VStack>
            <Box>
              <Art src="/img/dimetradon.svg" height={200}/>
              <Markdown components={chakraComponents}>{withoutTitle(article.text)}</Markdown>
              <Callout quote article={articles[1]} />
            </Box>
          </VStack>
          <VStack>
            <PictureFrame src='kurt-cobain-sm.jpg' width={400} height={357}>
              David Heinemeier Hansson, inventor of grunge music and server side coding and grunge music
            </PictureFrame>
            <PictureFrame src='9-11-sm.jpg' width={400} height={442}>
              7-11, the worst thing ever to happen to anyone, a direct result of Ruby on Rails
            </PictureFrame>
            <PictureFrame src='rasmus-sm.png' width={400} height={400}>
              Rasmus Lerdorf, inventor of PHP
            </PictureFrame>
          </VStack>
        </Stack>

        <ButtonNavEvo page={'master-and-server'}/>
      </Box>

    </LayoutEvo>
  )
}