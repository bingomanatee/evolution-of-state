import {ArticleError} from '~/types';
import {Box, Heading, Text} from '@chakra-ui/react';


export default function ArticleErrorPage({article}: {article: ArticleError}) {
  if (!article?.error) {return null;}
  return (
    <Box as='article' layerStyle='article'>
      <Heading as='h1' variant='page-head'>(load error)</Heading>
      <Text>Load error: {article.error.message}</Text>
    </Box>
  )
}