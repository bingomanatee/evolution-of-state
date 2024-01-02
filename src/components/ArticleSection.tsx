import {Heading, Box, Spinner} from '@chakra-ui/react';
import {Art} from '~/components/art';
import Markdown from 'react-markdown';
import chakraComponents from '~/theme/chakra-components';
import {withoutTitle} from '~/lib/without-title';
import {ArticleInFlow, isArticle} from '~/types';

type ArtNode = { src?: string, height?: number }
export default function ArticleSection({article, noTitle, art}: { article: ArticleInFlow, noTitle?: boolean, art?: ArtNode }) {

  if (!isArticle(article)) {return <Spinner />;}
  return (
    <Box>
      {noTitle ? null : <Heading as='h1'>{article.title}</Heading>}
      {
        art ? (
          <Art src={`/img/${art.src}`} height={art.height || 300}/>
        ) : null
      }
      <Markdown components={chakraComponents}>{noTitle ? article.text : withoutTitle(article.text)}</Markdown>
    </Box>
  )
}