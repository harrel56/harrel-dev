import React from "react";
import {Route} from "wouter";
import {JsonSchemaPlayground} from "./JsonSchemaPlayground";


export const Content = () => {
    return (
        <div className='content-container'>
            <Route path='/home'><h1>Home</h1></Route>
            <Route path='/projects/json-schema'>
                <JsonSchemaPlayground/>
            </Route>
        </div>
    )
}