import {ArticleInFlow, isArticle} from '~/types';
import {Box, Heading, Spinner} from '@chakra-ui/react';
import Markdown from 'react-markdown';
import chakraComponentsSidebar from '~/theme/chakra-components-sidebar';
import {withoutTitle} from '~/lib/without-title';
import chakraComponentsQuote from '~/theme/chakra-components-quote';


export default function Callout({article, quote, width = '100%', maxHeight = null}: {
  article: ArticleInFlow,
  maxHeight?: number | null;
  quote?: boolean,
  width?: unknown
}) {

  if (!isArticle(article)) {
    return <Spinner/>;
  }

  const style = quote ? 'quote' : 'callout';

  const attrs = maxHeight ? {maxHeight: maxHeight + 'px', overflowY: 'auto'} : {}
  let boxWidth = '100%'
  if (!quote) {
    boxWidth = width === '100%' ? width : `min(${width}px, 100%)`
  }
  return (
    //@ts-expect-error bullshit parameter error
    <Box layerStyle={style} {...attrs} width={boxWidth}>
      <Heading variant={style}>{article.title}</Heading>
      <Markdown
        components={quote ? chakraComponentsQuote : chakraComponentsSidebar}>{withoutTitle(article.text)}</Markdown>
    </Box>
  )
}