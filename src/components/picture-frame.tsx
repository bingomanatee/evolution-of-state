import {ReactNode} from 'react';
import {Box, Image, Text, useMediaQuery} from '@chakra-ui/react';

function sizeValue(size: number | number[]) {
  if (Array.isArray(size)) {
    return size;
  }
  return [size / 2, size / 2, size / 2, size]
}

export function PictureFrame({src, width, height, children}: {
  src: string,
  width: number | number[],
  height: number | number[],
  children: ReactNode
}) {
  const [isSmall] = useMediaQuery('(max-width: 700px)')
  if (isSmall) {
    return null;
  }
  const widthValue = sizeValue(width);
  const heightValue = sizeValue(height);
  return (
    <Box layerStyle='photo' width={widthValue}>
      <Box layerStyle='photo-inner'>
        <Image src={'/photos/' + src} width={widthValue} height={heightValue}/>
      </Box>
      <Box layerStyle='caption'><Text textStyle='caption'>{children}</Text>
      </Box>
    </Box>
  )
}