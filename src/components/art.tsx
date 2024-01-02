import {memo} from 'react';
import {Center, Image} from '@chakra-ui/react';

export const Art = memo(({src, ...rest}: { src: string } & Record<string, unknown>) => (
  <div className='scenery' style={rest.height ? {height: rest.height} : {}}>
    <Center>
      <Image src={src}{...rest}></Image>
    </Center>
  </div>
))