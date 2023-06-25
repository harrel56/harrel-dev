import {Route} from 'wouter'
import {lazy, Suspense} from 'react'
import {LoadingSpinner} from './util/LoadingSpinner.tsx'

const JsonSchemaPlayground = lazy(() => import('./JsonSchemaPlayground'))

export const Content = () => {
    return (
        <div className='content-container'>
            <Route path='/'><h1>There's nothing here yet</h1></Route>
            <Route path='/projects/json-schema'>
                <Suspense fallback={<LoadingSpinner/>}>
                    <JsonSchemaPlayground/>
                </Suspense>
            </Route>
        </div>
    )
}