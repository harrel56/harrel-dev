import {useContext, useState} from 'react'
import {json, jsonParseLinter} from '@codemirror/lang-json'
import {CachePolicies, useFetch} from 'use-http'
import {Button} from './Button'
import {linter, lintGutter} from '@codemirror/lint'
import {useCodeMirror} from '@uiw/react-codemirror'
import {useDebounce, useLocalStorage} from 'react-use'
import {EditorView} from '@codemirror/view'
import {VersionContext} from './ctx/VersionContext.tsx'

interface Response {
  valid: boolean
  errors: any[]
  errorMessage?: any
}

const DEFAULT_SCHEMA = `{
  "$ref": "https://json-schema.org/draft/2020-12/schema"
}`
const DEFAULT_INSTANCE = '{}'

const inputExtensions = [json(), EditorView.lineWrapping, lintGutter(), linter(jsonParseLinter(), {
  delay: 300,
  markerFilter: () => []
})]
const outputExtensions = [json(), EditorView.lineWrapping]

const JsonSchemaPlayground = () => {
  const {jsonSchemaVersion} = useContext(VersionContext)
  const [schemaStorage, setSchemaStorage] = useLocalStorage('schema', DEFAULT_SCHEMA)
  const [instanceStorage, setInstanceStorage] = useLocalStorage('instance', DEFAULT_INSTANCE)
  const [schema, setSchema] = useState(schemaStorage!)
  const [instance, setInstance] = useState(instanceStorage!)
  const [response, setResponse] = useState<Response>()
  const [parseError, setParseError] = useState<string>()

  const {post, loading, error} = useFetch<any>('/api/json-validate', {cachePolicy: CachePolicies.NO_CACHE})
  useDebounce(() => setSchemaStorage(schema), 1000, [schema])
  useDebounce(() => setInstanceStorage(instance), 1000, [instance])

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

  const errorMessage = parseError ?? response?.errorMessage ?? error?.message
  let validationResponse = null
  if (errorMessage) {
    validationResponse = <p className='error-message'>{errorMessage}</p>
  } else if (response) {
    validationResponse = response.valid ? <p className='success-message'>Validation successful</p> :
      <p className='error-message'>Validation failed</p>
  }

  const output = response ? JSON.stringify(response.errors, null, 2) : ''

  const {setContainer: setSchemaContainer} = useCodeMirror({
    height: '500px',
    extensions: inputExtensions,
    value: schema,
    onChange: val => setSchema(val)
  })
  const {setContainer: setInstanceContainer} = useCodeMirror({
    height: '500px',
    extensions: inputExtensions,
    value: instance,
    onChange: val => setInstance(val)
  })
  const {setContainer: setOutputContainer} = useCodeMirror({
    height: '500px',
    extensions: outputExtensions,
    value: output
  })

  return (
    <>
      <h1>JSON Schema</h1>
      <p>
        This validator is implemented in Java and supports <i>draft2020-12</i> and <i>draft2019-09</i> specification version
        (for now the web validator only runs in <i>draft2020-12</i> mode).
        Its source code can be found <a href='https://github.com/harrel56/json-schema'>here</a> and it's also accessible
        on <a href='https://mvnrepository.com/artifact/dev.harrel/json-schema'>Maven Central</a> (version in
        use: <b><i>{jsonSchemaVersion}</i></b>).
        You can check how it compares to other implementations on <a
        href='https://bowtie-json-schema.github.io/bowtie'>Bowtie</a>. If anything seems to not work right, please
        report an <a href='https://github.com/harrel56/json-schema/issues'>issue</a>, it would be really appreciated.
      </p>
      <div className='editors-wrapper'>
        <div className='editor-container'>
          <h2>Schema</h2>
          <div ref={elem => setSchemaContainer(elem!)}></div>
        </div>
        <div className='editor-container'>
          <h2>Instance</h2>
          <div ref={elem => setInstanceContainer(elem!)}></div>
        </div>
      </div>
      <div className='buttons'>
        <Button disabled={loading} onClick={onClick}>Validate</Button>
        {validationResponse}
      </div>
      <div className='editor-container'>
        <h2>Output</h2>
        <div ref={elem => setOutputContainer(elem!)}></div>
      </div>
    </>
  )
}

export default JsonSchemaPlayground