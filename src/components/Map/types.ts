import { LeafletMouseEvent } from "leaflet"

export interface Props{
  getPopulationData: GetPopulationData
}

type GetPopulationData = (event: LeafletMouseEvent) => void