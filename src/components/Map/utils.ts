import { LatLngBoundsExpression } from "leaflet";

export const MAP_BOUNDS: LatLngBoundsExpression = [
  [-23.234708, -45.928813],
  [-23.198917, -45.900761],
]

export const TILE_LAYER_URL = "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"

export const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export const MAP_ZOOM = 18