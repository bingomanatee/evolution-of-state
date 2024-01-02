import {memo} from 'react';
import {Center, Image} from '@chakra-ui/react';

export const Art = memo(({src, height, ...rest}: { src: string, height: number } & Record<string, unknown>) => (
  <div className='scenery' style={ {height: height + 'px'}}>
    <Center>
      <Image src={src}{...rest}></Image>
    </Center>
  </div>
))