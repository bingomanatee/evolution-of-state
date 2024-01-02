import {defineStyle, defineStyleConfig} from '@chakra-ui/react'

const pageHead = defineStyle({
  fontWeight: '1000',
  fontFamily: 'display',
  fontSize: ['24px', '36px', '48px', '60px'],
  mb: [4, 5, 6, 8]
})
const headingHead = defineStyle({
  fontWeight: '800',
  fontFamily: 'heading',
  fontSize: ['24px', '30px', '36x'],
  color: 'white',
  ml: 8,
  my: 2,
  mb: 3,
  textShadow: '0 0 10px white'
})

const h1 = defineStyle({
  fontWeight: '800',
  fontFamily: 'heading',
  fontSize: ['24px', '30px', '36x'],
  my: 2,
  mb: 3,
  color: 'black',
});

const h2 = defineStyle({
  fontWeight: '600',
  fontFamily: 'heading',
  fontSize: ['24px', '30px', '36x'],
  my: 2,
  mb: 3,
  color: 'black',
})

const h3 = defineStyle({
  fontWeight: '600',
  fontFamily: 'heading',
  my: 1,
  mb: 2,
  fontSize: ['24px', '30px', '36x'],
  color: 'blackAlpha.700',
})

const callout = defineStyle({
  fontWeight: '600',
  fontFamily: 'heading',
  my: 1,
  fontSize: ['20px', '22px', '26px'],
  color: 'callout-head',
})

const headingTheme = defineStyleConfig({
  //@ts-expect-error  i think this works anyway
  fontFamily: 'heading',
  fontWeight: 800,
  _dark: {
    color: 'white'
  },
  variants: {
    'page-head': pageHead,
    'heading-head': headingHead,
    'h1': h1,
    'h2': h2,
    'h3': h3,
    'h2-sidebar': {...h2, fontSize: ['18px', '20px', '22px']},
    'h3-sidebar': {...h3, fontSize: ['12px', '14px', '16px']},
    'h2-quote': {...h2, fontSize: ['18px', '20px', '22px']},
    'h3-quote': {...h3, fontSize: ['14px', '18px', '20px']},
    'callout': callout,
    'quote': {...callout, color: 'quote-head'}
  }
})

export default headingTheme