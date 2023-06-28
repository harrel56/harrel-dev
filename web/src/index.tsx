import {lazy, Suspense} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {LoadingSpinner} from './util/LoadingSpinner.tsx'
import ReactDOMClient from 'react-dom/client'
import {App} from './App.tsx'

const JsonSchemaPlayground = lazy(() => import('./JsonSchemaPlayground.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <h1>There's nothing here yet</h1>
      },
      {
        path: '/projects/json-schema',
        element: <Suspense fallback={<LoadingSpinner/>}><JsonSchemaPlayground/></Suspense>
      }
    ]
  }

])

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<RouterProvider router={router}/>)