import {Box, Heading, HStack, Image, VStack} from '@chakra-ui/react';
import {Link} from 'react-router-dom';


export default function LayoutEvo({children}: {
  children: React.ReactNode
}) {

  return (
    <Box layerStyle="page-frame">
      <VStack width='100%' height='100%' alignItems="stretch" justifyContent='stretch' spacing={0}>
        <Box layerStyle="page-head">
          <HStack width='100%' height='100%'>
            <Link to='/'>
              <Image src="/img/nautilus.svg" width='90px' height='90px'/>
            </Link>
            <Heading variant="heading-head">Evolution of Web Applications</Heading>
          </HStack>
        </Box>
        <Box layerStyle="main-frame">
          {children}
        </Box>
      </VStack>
    </Box>
  )
}