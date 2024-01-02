import {Box, Text} from '@chakra-ui/react';

export default function Paragraph({children, callout, quote} : {children: React.ReactNode, callout?: boolean, quote?: boolean}) {
  const style = callout ? 'p-callout' : quote ? 'p-quote' : 'p'
  return (
    <Box layerStyle={style}>
      <Text textStyle={style}>{children}</Text>
    </Box>
  )
}