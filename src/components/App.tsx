import React, {} from 'react'
import './App.css'
import theme from '~/theme/theme';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react'

import HomePage from '~/pages/evolution/home/home-page';

import OriginsPage from '~/pages/evolution/origins/origins-page';
import EmergencePage from '~/pages/evolution/emergence/emergence-page';
import MasterAndServerPage from '~/pages/evolution/master-and-server/master-and-server-page';
import OnePage from '~/pages/evolution/one-page/one-page';
import TheFaceAwakens from '~/pages/evolution/the-face-awakens/the-face-awakens';
import DissectingStatePage from '~/pages/dissecting-state/dissecting-state-page';
import AsyncPage from '~/pages/async/async-page';
import FromTheDepthsPage from '~/pages/evolution/from-the-depths/from-the-depths-page';
import DesignPatternsPage from '~/pages/design-patterns/design-patterns-page';
import NautilusPage from '~/pages/nautilus/nautilus-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NautilusPage/>
  },  {
    path: '/async',
    element: <AsyncPage/>
  },
  {
    path: '/design-patterns',
    element: <DesignPatternsPage/>
  },
  {
    path: '/evolution/home',
    element: <HomePage/>,
  },
  {
    path: '/evolution/from-the-depths',
    element: <FromTheDepthsPage/>,
  },
  {
    path: '/evolution/origins',
    element: <OriginsPage/>
  },
  {
    path: '/evolution/emergence',
    element: <EmergencePage/>,
  },
  {
    path: '/evolution/master-and-server',
    element: <MasterAndServerPage/>
  },
  {
    path: '/evolution/one-page',
    element: <OnePage/>
  },
  {
    path: '/evolution/the-face-awakens',
    element: <TheFaceAwakens/>
  }
  ,
  {
    path: '/dissecting-state',
    element: <DissectingStatePage/>
  }

]);

function App() {
  return (
    <>
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router}/>
        </ChakraProvider>
      </React.StrictMode>
    </>
  )
}

export default App
