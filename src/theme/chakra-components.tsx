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
      return data.children === null ? null : <Box layerStyle='p'>
        <Text textStyle='p'>{data.children}</Text>
      </Box>
    }
    return null;
  },
  h1: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null :
        <Heading variant='h1'>{data.children}</Heading>

    }
    return null;
  },
  h2: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null :
        <Heading variant='h2'>{data.children}</Heading>
    }
    return null;
  },
  h3: (data: unknown) => {
    if (isInfo(data)) {
      return data.children === null ? null :
        <Heading variant='h3'>{data.children}</Heading>
    }
    return null;
  },
}