import {useContext, useState} from 'react'
import './code-mirror.css'
import {json, jsonParseLinter} from '@codemirror/lang-json'
import {CachePolicies, useFetch} from 'use-http'
import {Button} from './Button'
import {linter, lintGutter} from '@codemirror/lint'
import {useCodeMirror} from '@uiw/react-codemirror'
import {useDebounce, useLocalStorage} from 'react-use'
import {EditorView} from '@codemirror/view'
import {VersionContext} from './ctx/VersionContext.tsx'
import toast from 'react-hot-toast'
import {ThemeContext} from './ctx/ThemeContext.tsx'

interface Response {
  valid: boolean
  errors: any[]
  errorMessage?: any
}

const DEFAULT_SCHEMA = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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
  const {theme} = useContext(ThemeContext)
  const [dialectStorage, setDialectStorage] = useLocalStorage('dialect', 'https://json-schema.org/draft/2020-12/schema')
  const [schemaStorage, setSchemaStorage] = useLocalStorage('schema', DEFAULT_SCHEMA)
  const [instanceStorage, setInstanceStorage] = useLocalStorage('instance', DEFAULT_INSTANCE)
  const [schema, setSchema] = useState(schemaStorage!)
  const [instance, setInstance] = useState(instanceStorage!)
  const [response, setResponse] = useState<Response>()
  const [parseError, setParseError] = useState<string>()

  const {post, loading, error} = useFetch<Response>('/api/json-validate', {cachePolicy: CachePolicies.NO_CACHE})
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
    const result = await post({dialect: dialectStorage, schema: schemaJson, instance: instanceJson})
    if (!result) {
      toast('Request failed', {icon: '💥'})
    } else if (result.valid) {
      toast('Validation successful', {icon: '✅'})
    } else {
      toast('Validation failed', {icon: '❌'})
    }
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
    theme: theme,
    onChange: val => setSchema(val)
  })
  const {setContainer: setInstanceContainer} = useCodeMirror({
    height: '500px',
    extensions: inputExtensions,
    value: instance,
    theme: theme,
    onChange: val => setInstance(val)
  })
  const {setContainer: setOutputContainer} = useCodeMirror({
    height: '500px',
    extensions: outputExtensions,
    value: output,
    theme: theme
  })

  return (
    <>
      <h1>JSON Schema</h1>
      <p>
        This validator is implemented in Java and supports all modern specification versions.
        Its source code can be found <a href='https://github.com/harrel56/json-schema'>here</a> and it's also accessible
        on <a href='https://mvnrepository.com/artifact/dev.harrel/json-schema'>Maven Central</a> (version in
        use: <b><i>{jsonSchemaVersion}</i></b>).
        You can check how it compares to other implementations on <a
        href='https://bowtie.report/#/implementations/java-json-schema'>Bowtie</a>. If anything seems to not work right, please
        report an <a href='https://github.com/harrel56/json-schema/issues'>issue</a>, it would be really appreciated.
      </p>
      <div>
        <label htmlFor='metaSchemaSelect'>Default meta-schema</label>
        <select id='metaSchemaSelect' value={dialectStorage} onChange={e => setDialectStorage(e.target.value)}>
          <option value='https://json-schema.org/draft/2020-12/schema'>Draft 2020-12</option>
          <option value='https://json-schema.org/draft/2019-09/schema'>Draft 2019-09</option>
          <option value='http://json-schema.org/draft-07/schema#'>Draft 7</option>
          <option value='http://json-schema.org/draft-06/schema#'>Draft 6</option>
          <option value='http://json-schema.org/draft-04/schema#'>Draft 4</option>
        </select>
      </div>
      <div className='editors-wrapper'>
        <div className='editor-container'>
          <h2>Schema</h2>
          <div ref={elem => setSchemaContainer(elem)}></div>
        </div>
        <div className='editor-container'>
          <h2>Instance</h2>
          <div ref={elem => setInstanceContainer(elem)}></div>
        </div>
      </div>
      <div className='buttons'>
        <Button disabled={loading} onClick={onClick}>Validate</Button>
        {validationResponse}
      </div>
      <div className='editor-container'>
        <h2>Output</h2>
        <div ref={elem => setOutputContainer(elem)}></div>
      </div>
    </>
  )
}

export default JsonSchemaPlayground