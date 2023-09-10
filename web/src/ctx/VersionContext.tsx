import {createContext, PropsWithChildren} from 'react'
import {useFetch} from 'use-http'

export interface VersionResponse {
  imageVersion: string
  jsonSchemaVersion: string
}

const DEFAULT_VERSIONS = {
  imageVersion: 'unknown',
  jsonSchemaVersion: 'unknown'
}

export const VersionContext = createContext<VersionResponse>(DEFAULT_VERSIONS)

export const VersionContextProvider = ({children}: PropsWithChildren) => {
  const {data} = useFetch<VersionResponse>('/api/version', {}, [])
  return (
    <VersionContext.Provider value={data ?? DEFAULT_VERSIONS}>
      {children}
    </VersionContext.Provider>
  )
}