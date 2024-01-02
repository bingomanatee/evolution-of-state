import {StackDirection, useBreakpointValue} from '@chakra-ui/react';


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

  return (stackDir?.stack || 'column') as StackDirection;
}