import {useMemo, useState} from 'react'
import {json, jsonParseLinter} from '@codemirror/lang-json'
import {CachePolicies, useFetch} from 'use-http'
import {Button} from './Button'
import {linter, lintGutter} from '@codemirror/lint'
import ReactCodeMirror from '@uiw/react-codemirror'
import {useDebounce, useLocalStorage} from 'react-use'

interface Response {
  valid: boolean
  errors: any[]
  errorMessage?: any
}

const DEFAULT_SCHEMA = `{
  "$ref": "https://json-schema.org/draft/2020-12/schema"
}`
const DEFAULT_INSTANCE = '{}'

const JsonSchemaPlayground = () => {
  const [schemaStorage, setSchemaStorage] = useLocalStorage('schema', DEFAULT_SCHEMA)
  const [instanceStorage, setInstanceStorage] = useLocalStorage('instance', DEFAULT_INSTANCE)
  const [schema, setSchema] = useState(schemaStorage!)
  const [instance, setInstance] = useState(instanceStorage!)
  const [response, setResponse] = useState<Response>()
  const [parseError, setParseError] = useState<string>()

  const {post, loading, error} = useFetch<any>('/api/json-validate', {cachePolicy: CachePolicies.NO_CACHE})
  useDebounce(() => setSchemaStorage(schema), 2000, [schema])
  useDebounce(() => setInstanceStorage(instance), 2000, [instance])

  const onClick = async () => {
    let schemaJson, instanceJson
    try {
      schemaJson = JSON.parse(schema)
      setParseError(undefined)
    } catch (e) {
      setParseError('Schema is not a valid JSON')
      setResponse(undefined)
      return
    }
    try {
      instanceJson = JSON.parse(instance)
      setParseError(undefined)
    } catch (e) {
      setParseError('Instance is not a valid JSON')
      setResponse(undefined)
      return
    }
    const result = await post({schema: schemaJson, instance: instanceJson})
    setResponse(result)
  }

  const extensions = useMemo(() => [json(), lintGutter(), linter(jsonParseLinter(), {delay: 300})], [])
  const errorMessage = parseError ?? response?.errorMessage ?? error?.message
  let validationResponse = null
  if (errorMessage) {
    validationResponse = <p className='error-message'>{errorMessage}</p>
  } else if (response) {
    validationResponse = response.valid ? <p className='success-message'>Validation successful</p> :
      <p className='error-message'>Validation failed</p>
  }

  const output = response ? JSON.stringify(response.errors, null, 2) : ''

  return (
    <>
      <h1>JSON Schema</h1>
      <p>
        This validator is implemented in Java and supports only <i>draft2020-12</i> specification version.
        Its source code can be found <a href='https://github.com/harrel56/json-schema'>here</a> and it's also accessible
        on <a href='https://mvnrepository.com/artifact/dev.harrel/json-schema'>Maven Central</a>.
        You can check how it compares to other implementations on <a
        href='https://bowtie-json-schema.github.io/bowtie'>Bowtie</a>. If anything seems to not work right, please
        report an <a href='https://github.com/harrel56/json-schema/issues'>issue</a>, it would be really appreciated.
      </p>
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
      <div className='buttons'>
        <Button disabled={loading} onClick={onClick}>Validate</Button>
        {validationResponse}
      </div>
      <div className='editor-container'>
        <h2>Output</h2>
        <ReactCodeMirror
          extensions={[json()]}
          height='500px'
          value={output}
          readOnly={true}
        />
      </div>
    </>
  )
}

export default JsonSchemaPlayground