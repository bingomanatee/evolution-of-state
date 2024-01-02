import {Box, Heading, HStack, Image, VStack} from '@chakra-ui/react';
import {Link} from 'react-router-dom';


export default function Layout({children}: {
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
            <Heading variant="heading-head">The Nautilus of State</Heading>
          </HStack>
        </Box>
        <Box layerStyle="main-frame">
          {children}
        </Box>
      </VStack>
    </Box>
  )
}