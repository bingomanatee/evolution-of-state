import {useBreakpointValue} from '@chakra-ui/react';


export default function useStackDir() {

  const stackDir = useBreakpointValue({
    base: {
      stack: 'column'
    },
    sm: {
      stack: 'column',
    },
    md: {
      stack: 'row'
    },
    lg: {
      stack: 'row'
    }
  }, {fallback: 'md'});

  console.log('stackDir is ', stackDir )
  return stackDir.stack;
}