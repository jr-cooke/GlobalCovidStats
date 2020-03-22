import { useState, useEffect } from 'react';
import { Choropleth } from "@nivo/geo";
import { worldmap } from '../constants/worldmap';
import useDataFetch from "../utils/useDataFetch";
import useWindowSize from '../utils/useWindowSize';

export default function WorldMap(){
  const [scale, setScale] = useState(100)
  const { data, loading, error } = useDataFetch("https://corona.lmao.ninja/countries");
  const { width, height } = useWindowSize();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  
  const processedData = data.map(dp => ({ id: dp.country, value: dp.cases }));
  
  const max = processedData.reduce(
    (max, p) => (p.value > max ? p.value : max),
    processedData[0].value
  );
  console.log(scale)
  return (
    <div>
      <Choropleth
        onWheel={(e) => { setScale(scale - e.deltaY)}}
        data={processedData}
        features={worldmap}
        domain={[0, max]}
        unknownColor="#ffffff"
        label="properties.name"
        height={height - 100}
        width={width - 100}
        projectionScale={scale}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#152538"
        colors={[
          '#ffebee',
          '#ffcdd2',
          '#ef9a9a',
          '#e57373',
          '#ef5350',
          '#f44336',
          '#e53935',
          '#d32f2f',
          '#c62828',
          '#b71c1c'
        ]}
      />
    </div>
  );
}