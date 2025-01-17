import { HttpResponse, http } from 'msw';
import neighborhoods from './response_geometrias_bairros.json';
import population from './response_populacao_bairros.json';
import { Neighborhood } from '../types/models/Neighborhood';
import { NeighborhoodPopulation } from '../types/models/Population';

export const endpoints = [
  http.get('/bairros-geojson', () => {
    return HttpResponse.json<Neighborhood>(neighborhoods);
  }),
  http.get('/populacao', () => {
    return HttpResponse.json<NeighborhoodPopulation[]>(population);
  }),
];
