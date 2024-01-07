const PAGE_HEAD_HEIGHT = ['60px', '80px']

const CALLOUT = {
  p: [4, 4, 5],
  bgGradient: 'linear(to-t, white, callout-back-2, callout-back)',
  border: '1px solid',
  borderColor: 'callout-border',
}
export default {
  'page-frame': {
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  'page-head': {
    height: PAGE_HEAD_HEIGHT,
    flex: 0,
    flexShrink: 0,
    flexBasis: PAGE_HEAD_HEIGHT,
    backgroundColor: 'heading-bg',
    px: '20px'
  },
  'main-frame': {
    backgroundColor: 'white',
    overflow: 'auto'
  },
  p: {
    py: 2, width: '100%'
  },
  'p-callout': {
    py: 1,
    width: '100%'
  },
  'p-quote': {
    py: 2,
    width: '100%'
  },
  article: {
    px: [2, 3, 4, 5],
    py: [1, 2, 3, 4],
    width: '100%',
    mb: '100px',
  },
  callout: CALLOUT,
  quote: {
    ...CALLOUT, borderColor: 'quote-border',
    bgGradient: 'linear(to-t, white, quote-back-2, quote-back)',
  },

  photo: {
    flexShrink: 0,
    border: '1px solid',
    borderColor: 'blackAlpha.300'
  },

  'photo-photo': {},

  caption: {
    backgroundColor: 'photo-cap-box',
    px: 3,
    pt: 1,
    pb: 2
  },
  buttons: {
    py: [4, 5, 7],
    mb: '140px',
  }
}