import {Center, Image, useBoolean} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

export const NextButton = ({to, out, back}: { to: string, back?: boolean }) => {
  const [hov, hc] = useBoolean(false);
  return (
    <Center>
      <Link to={to}>
        <Image
          onMouseEnter={hc.on}
          onMouseLeave={hc.off}
          width='5vw' filter="auto" brightness={hov ? '200%' : '100%'}
          src={`/img/${out ? 'out' : back ? 'back' : 'next'}.svg`}></Image>
      </Link>
    </Center>
  )

}