import React, {useState} from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import {json} from '@codemirror/lang-json';
import {useFetch} from "use-http";
import {Button} from "./Button";

export const JsonSchemaPlayground = () => {
    const [schema, setSchema] = useState('{}')
    const [instance, setInstance] = useState('{}')
    const [response, setResponse] = useState<string>()

    const {post, loading, error} = useFetch<any>('/api/json-validate')

    const onClick = async () => {
        try {
            const schemaJson = JSON.parse(schema);
            const instanceJson = JSON.parse(instance);

            const s = await post({schema: schemaJson, instance: instanceJson});
            console.log(s)
            setResponse(JSON.stringify(s))
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
            <Button onClick={onClick} className='flex-start'>Validate</Button>
            <p>{response}</p>
            <p>{error + ''}</p>
        </>
    )
}