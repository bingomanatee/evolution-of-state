import {Center, HStack, Box, Text} from '@chakra-ui/react';
import {NextButton} from '~/components/next-button';
import {memo} from 'react';

const pageList = [
  'home',
  'from-the-depths',
  'origins',
  'emergence',
  'one-page',
  'the-face-awakens',
]

const pageMap = new Map(pageList.map((root) => {
  const index = pageList.indexOf(root);
  const prev = pageList[index - 1];
  const next = pageList[index + 1];
  return (
    [root,
      {
        index,
        indexNumber: index + 1,
        current: root,
        prev: prev ? prev : null,
        next: next ? next : null
      }
    ]
  );
}))

function ButtonNavBase({page}: { page: string }) {
  const info = pageMap.get(page);

  if (!info) {
    return <Text>No page for {page}</Text>
  }
  const {indexNumber, prev, next} = info;
  return (
    <Box layerStyle='buttons'>
      <Center>
        <HStack>
          {prev ? <NextButton back to={'/evolution/' + prev}></NextButton> : null}
          <Text>{indexNumber}</Text>
          {next ? <NextButton to={'/evolution/' + next}></NextButton> : <NextButton to={'/'} out />}
        </HStack>
      </Center>
    </Box>
  )
}

const ButtonNavEvo = memo(ButtonNavBase)

export default ButtonNavEvo;