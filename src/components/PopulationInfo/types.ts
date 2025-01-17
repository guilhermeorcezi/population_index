import { Feature } from "../../types/models/Neighborhood";
import { NeighborhoodPopulation } from "../../types/models/Population";

export interface Props{
  selectedNeighborhood?: Feature
  populationData?: NeighborhoodPopulation[]
}