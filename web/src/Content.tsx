import {Route} from "wouter";
import {JsonSchemaPlayground} from "./JsonSchemaPlayground";
import {Suspense} from "react";
import {LoadingSpinner} from "./util/LoadingSpinner.tsx";


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