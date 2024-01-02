import {extendTheme} from '@chakra-ui/react'
import colors from './colors';
import textStyles from './textStyles';
import layerStyles from './layerStyles';
import headingTheme from './components/heading-theme';

const theme = extendTheme({
  breakpoints : {
    base: '0em',
    sm: '600px',
    md: '800px',
    lg: '1000px',
    xl: '1200px',
    '2xl': '1500px',
  },

  fonts: {
    heading: `'Nunito Sans', sans-serif`,
    display: 'Skranji, Helvetica, sans-serif',
    body: `'Raleway', sans-serif`,
    caption: `'Courier Prime', monospace`
  },
  colors: colors,
  textStyles: textStyles,
  layerStyles: layerStyles,
  components: {
    Heading: headingTheme
  }
})

export default theme