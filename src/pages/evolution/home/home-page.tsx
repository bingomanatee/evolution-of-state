import {Box, Spinner, VStack, Stack} from '@chakra-ui/react';
import ArticleErrorPage from '~/components/article-error-page';
import LayoutEvo from '~/pages/evolution/layout-evo';
import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import ArticleSection from '~/components/ArticleSection';
import {PictureFrame} from '~/components/picture-frame';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';
import {ASFvalue, isArticleError} from '~/types';

const ARTICLE_NAME = 'home.md';

export default function HomePage() {
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

  return (
    <LayoutEvo>
      <Box as='article' layerStyle='article'>
        <Stack direction={stackDir} alignItems='flex-start' spacing={6}>
          <ArticleSection article={article} art={{src: 'trilobite.svg', height: 400}}/>
          <VStack>
            <PictureFrame src={'startled-sm.png'} width={400} height={400}>
              Startled Chipmunk, the one of the first and best meme
            </PictureFrame>
          </VStack>
        </Stack>
      </Box>
      <ButtonNavEvo page={'home'}/>
    </LayoutEvo>
  )
}