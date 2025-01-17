import { GeoJSON } from 'react-leaflet/GeoJSON';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function App() {
  const [geojson, setGeojson] = useState()
  const [population, setPopulation] = useState([])

  const getLocations = async () => {
    const response = await fetch('http://localhost:5173/bairros-geojson')
    const features = await response.json()
    
    setGeojson(features)
  }

  const getPopulation = async (event) => {
    setPopulation([])

    const feature = event.sourceTarget.feature

    const response = await fetch('http://localhost:5173/populacao')
    const allPopulations = await response.json()

    const population = allPopulations.filter(item => item.id_geometria === feature.properties.id)
    setPopulation(population)
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <div>
      {population.length > 0 && (
        <div>
          {population.map(item => (
            <p key={item.id_geometria}>
              Ano: {item.ano} / População: {item.populacao}</p>
          ))}
        </div>
      )} 
      <MapContainer
        style={{ height: '100vh' }}
        bounds={[[-23.234708, -45.928813], [-23.198917, -45.900761]]}
        zoom={15}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
       {geojson && (
          <GeoJSON
            data={geojson}
            style={{ color: '#6c58ff' }}
            eventHandlers={{
              click: (event) => getPopulation(event),
            }}
          />
        )}  
      </MapContainer>
    </div>
  );
}

export default App;
