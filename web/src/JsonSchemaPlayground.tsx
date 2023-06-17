import React, {useState} from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import {json} from '@codemirror/lang-json';
import {CachePolicies, useFetch} from "use-http";
import {Button} from "./Button";

export const JsonSchemaPlayground = () => {
    const [schema, setSchema] = useState('{}')
    const [instance, setInstance] = useState('{}')
    const [response, setResponse] = useState<string>()

    const {post, loading, error} = useFetch<any>('/api/json-validate', {cachePolicy: CachePolicies.NO_CACHE})

    const onClick = async () => {
        try {
            const schemaJson = JSON.parse(schema);
            const instanceJson = JSON.parse(instance);

            const s = await post({schema: schemaJson, instance: instanceJson});
            console.log(s)
            setResponse(JSON.stringify(s, null, 2))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <h1>JSON Schema</h1>
            <div className='editors-wrapper'>
                <div className='editor-container'>
                    <h2>Schema</h2>
                    <ReactCodeMirror
                        extensions={[json()]}
                        height='500px'
                        value={schema}
                        onChange={val => setSchema(val)}
                    />
                </div>
                <div className='editor-container'>
                    <h2>Instance</h2>
                    <ReactCodeMirror
                        extensions={[json()]}
                        height='500px'
                        value={instance}
                        onChange={val => setInstance(val)}
                    />
                </div>
            </div>
            <Button disabled={loading} onClick={onClick} className='flex-start'>Validate</Button>
            <div className='editor-container'>
                <h2>Output</h2>
                <ReactCodeMirror
                    extensions={[json()]}
                    height='500px'
                    value={response}
                    readOnly={true}
                />
            </div>
        </>
    )
}