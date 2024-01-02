import {Box, Heading, Text} from '@chakra-ui/react';
import {ReactNode} from 'react';

type Info = { children: ReactNode }

function isInfo(data: unknown): data is Info {
  return (!!data) && typeof data === 'object' && 'children' in data && (
    typeof data.children === 'string' || data.children === null || Array.isArray(data.children)
  )
}

export default {
  p: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null : <Box layerStyle='p-quote'>
        <Text textStyle='p-qwuote'>{data.children}</Text>
      </Box>
    }
    return null;
  },
  h2: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null : <Box layerStyle='p'>
        <Heading variant='h2-quote'>{data.children}</Heading>
      </Box>
    }
    return null;
  },
  h3: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null : <Box layerStyle='p'>
        <Heading variant='h3-quote'>{data.children}</Heading>
      </Box>
    }
    return null;
  },
}