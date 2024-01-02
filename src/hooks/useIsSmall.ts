import {useMediaQuery} from '@chakra-ui/react';

export default function useIsSmall() {
  const [isSmall] = useMediaQuery('(max-width: 800px)')

  return isSmall
}