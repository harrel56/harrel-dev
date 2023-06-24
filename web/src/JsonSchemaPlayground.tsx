import {useMemo, useState} from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {CachePolicies, useFetch} from "use-http";
import {Button} from "./Button";
import {linter, lintGutter} from "@codemirror/lint";

export const JsonSchemaPlayground = () => {
    const [schema, setSchema] = useState('{}')
    const [instance, setInstance] = useState('{}')
    const [response, setResponse] = useState<string>()
    const [parseError, setParseError] = useState<string>()

    const {post, loading, error} = useFetch<any>('/api/json-validate', {cachePolicy: CachePolicies.NO_CACHE})

    const onClick = async () => {
        let schemaJson, instanceJson
        try {
            schemaJson = JSON.parse(schema);
            setParseError(undefined)
        } catch (e) {
            setParseError('Schema is not a valid JSON')
            setResponse('')

            return
        }
        try {
            instanceJson = JSON.parse(instance);
            setParseError(undefined)
        } catch (e) {
            setParseError('Instance is not a valid JSON')
            setResponse('')
            return
        }
        const result = await post({schema: schemaJson, instance: instanceJson});
        setResponse(JSON.stringify(result, null, 2))
    }

    const extensions = useMemo(() => [json(), lintGutter(), linter(jsonParseLinter(), {delay: 300})], [])
    const errorMessage = parseError ?? error?.message

    return (
        <>
            <h1>JSON Schema</h1>
            <div className='editors-wrapper'>
                <div className='editor-container'>
                    <h2>Schema</h2>
                    <ReactCodeMirror
                        extensions={extensions}
                        height='500px'
                        value={schema}
                        onChange={val => setSchema(val)}
                    />
                </div>
                <div className='editor-container'>
                    <h2>Instance</h2>
                    <ReactCodeMirror
                        extensions={extensions}
                        height='500px'
                        value={instance}
                        onChange={val => setInstance(val)}
                    />
                </div>
            </div>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
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