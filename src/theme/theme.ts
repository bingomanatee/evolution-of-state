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
    caption: `'DM Sans', monospace`
  },
  fontSizes: {
    xs: '0.7rem',
    sm: '0.8rem',
    md: '0.8rem',
    lg: '1rem',
    xl: '1.15rem',
    '2xl': '1.333rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
    '5xl': '2.5rem',
    '6xl': '3rem',
    '7xl': '3.5rem',
    '8xl': '4rem',
    '9xl': '5rem',
  },
  colors: colors,
  textStyles: textStyles,
  layerStyles: layerStyles,
  components: {
    Heading: headingTheme
  }
})

export default theme