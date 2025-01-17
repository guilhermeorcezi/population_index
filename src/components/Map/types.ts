import { LeafletMouseEvent } from "leaflet"

export interface Props{
  handleFeatureClick: HandleFeatureClick
  selectedFeatureId: number
}

type HandleFeatureClick = (event: LeafletMouseEvent) => void