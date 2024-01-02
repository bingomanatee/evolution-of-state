import useForest from '~/hooks/useForest';
import {articleStateFactory} from '~/lib/article-state-factory';
import {leafI} from '@wonderlandlabs/forest/lib/types';
import useStackDir from '~/hooks/useStackDir';
import useIsSmall from '~/hooks/useIsSmall';
import {Spinner, VStack, Box, Heading, Stack} from '@chakra-ui/react';
import ArticleErrorPage from '~/components/article-error-page';
import ArticleSection from '~/components/ArticleSection';
import AsciiPorn from '~/components/AsciiPorn';
import Paragraph from '~/components/Paragraph';
import {PictureFrame} from '~/components/picture-frame';
import ButtonNavEvo from '~/pages/evolution/button-nav-evo';
import LayoutEvo from '~/pages/evolution/layout-evo';
import {ASFvalue, isArticleError} from '~/types';

const ARTICLE_NAME = 'bbs.md';
export default function FromTheDepthsPage() {

  const [value, state] = useForest(articleStateFactory, [ARTICLE_NAME], (state: leafI) => state.do.load());
  const {
    article,
    done,
  } = value as ASFvalue;

  const stackDir = useStackDir();
  const isSmall = useIsSmall();

  if (isArticleError(article)) {
    return <ArticleErrorPage article={article}/>
  }

  if (!state || !done || !article) {
    return <Spinner/>
  }

  return <LayoutEvo>
    <Box as='article' layerStyle='article'>
      <Stack direction={stackDir}>
        <VStack>
          <ArticleSection article={article} art={{src: 'acanthostega.svg', height: 300}}/>
          <Box layerStyle='quote' width='100%'>

            <Heading variant='quote'>
              Early Modems
            </Heading>

            <div style={isSmall ? {marginBottom: '1em'} : {float: 'right', marginLeft: '2em'}}>
              <iframe width="340" height="290"
                src="https://www.youtube.com/embed/gsNaR6FRuO0?si=6s9rtsn6AafYWSEi"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </div>
            <Paragraph quote>
              Before "High Speed" internet there were modems. People communicated directly
              over "land lines" (wire based telephony" using boxes that transported binary
              data over phone networks. The clip was its logon scream:
            </Paragraph>

            <Paragraph quote>
              There was a perpetual conflict between people wanting to use the Internet
              and people wanting to use the phone for calls, or who were expecting to be calleed:
              in homes with a single phone line (most of them) if you picked up the phone headpiece
              to make a call you could interrupt and disconnect a modem user from the net; this could
              disrupt and cancel the download of a long file.
            </Paragraph>
          </Box>
        </VStack>
        <Box width={isSmall ? '100%' : 'min(100%,400px)'} flexShrink={0}>
          <VStack>
            <PictureFrame src='aol-cds-sm.png' width={400} height={300}>
              A small sample of the billions of CDs generated to market the online titan.
            </PictureFrame>
            <PictureFrame src='sfnet.gif' width={400} height={400}>
              SFNet was the first "cool" social network for many San Francisco dot commers.
            </PictureFrame>

            <Box layerStyle='callout' width='100%'>
              <Heading variant='callout'>
                ASCII Porn
              </Heading>

              <Paragraph callout>
                BBS's were purely ascii based. This didn't stop a group of devoted pornographers
                from developing first generation porn like this hot item:
              </Paragraph>

              <AsciiPorn/>
            </Box>
          </VStack>
        </Box>

      </Stack>
    </Box>
    <ButtonNavEvo page={'from-the-depths'} />
  </LayoutEvo>

}