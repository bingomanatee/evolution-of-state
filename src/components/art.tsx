import {memo} from 'react';
import {Flex, Box, Center, Image} from '@chakra-ui/react';

export const Art = memo(({src, height, ...rest}: { src: string, height: number } & Record<string, unknown>) => (
  <Flex id="art" direction="column" alignItems="stretch">
    <Box flexShrink={1} className='scenery' height={ height + 'px'}>
      <Center>
        <Image src={src} maxWidth='80%' height={height} {...rest}></Image>
      </Center>
    </Box>
  </Flex>
))