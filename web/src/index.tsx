import {lazy, Suspense} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {LoadingSpinner} from './util/LoadingSpinner.tsx'
import ReactDOMClient from 'react-dom/client'
import {App} from './App.tsx'

const JsonSchemaPlayground = lazy(() => import('./JsonSchemaPlayground.tsx'))

const setPageInfo = (title: string, description: string, tags: string[]): any => {
  document.title = title
  document.querySelector('meta[name="description"]')!.setAttribute('content', description)
  document.querySelector('meta[name="keywords"]')!.setAttribute('content', tags.join(','))
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        element: <h1>There's nothing here yet</h1>,
        loader: () => setPageInfo('Harrel.dev', 'Aggregated showcase of personal projects', ['github', 'java', 'react'])
      },
      {
        path: '/json-schema',
        element: <Suspense fallback={<LoadingSpinner/>}><JsonSchemaPlayground/></Suspense>,
        loader: () => setPageInfo('JSON Schema online validator',
          'JSON Schema online validator compliant with draft2020-12 version. It uses dev.harrel.json-schema Java implementation.',
          ['json', 'json-schema', 'validator', 'java', 'online'])
      },
      {
        path: '*',
        element: <h1>whoopsy daisy here nothing</h1>
      }
    ]
  }
])

const root = ReactDOMClient.createRoot(document.getElementById('root')!)
root.render(<RouterProvider router={router}/>)