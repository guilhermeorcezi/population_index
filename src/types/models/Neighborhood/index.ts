export interface Neighborhood {
  type: string
  name: string
  crs: Crs
  features: Feature[]
}

export interface Crs {
  type: string
  properties: Properties
}

export interface Properties {
  name: string
}

export interface Feature {
  type: string
  properties: FeatureProperties
  geometry: Geometry
  bbox: number[]
}

export interface FeatureProperties {
  id: number
  name: string
  setor: string
  zona: string
}

export interface Geometry {
  type: string
  coordinates: number[][][][]
}
