import { useState, useRef } from 'react';
import { Choropleth } from "@nivo/geo";
import { worldmap } from '../constants/worldmap';
import useDataFetch from "../utils/useDataFetch";
import useWindowSize from '../utils/useWindowSize';

export default function WorldMap(){
  const [scale, setScale] = useState(100);
  const [panning, setPanning] = useState(false);
  const [translation, setTranslation] = useState([0.5, 0.5])
  const { data, loading, error } = useDataFetch("https://corona.lmao.ninja/countries");
  const { width, height } = useWindowSize();
  
  const x = useRef();
  const y = useRef()
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  
  const processedData = data.map(dp => ({ id: dp.country, value: dp.cases }));
  
  const max = processedData.reduce(
    (max, p) => (p.value > max ? p.value : max),
    processedData[0].value
  );

  const handleMouseDown = (e) => {
    x.current = e.clientX;
    y.current = e.clientY;
    setPanning(true);
  }

  const handleMouseMove = (e) => {
    if (panning) {
      if (
        translation[0] + ((e.clientX - x.current) / 1000 >= -1) &&
        translation[0] + ((e.clientX - x.current) / 1000 <= 1) &&
        translation[1] + ((e.clientY - y.current) / 1000 >= 1) &&
        translation[1] + ((e.clientY - y.current) / 1000 <= 1)
      ) {
        setTranslation([
          translation[0] + (e.clientX - x.current) / 1000,
          translation[1] + (e.clientY - y.current) / 1000
        ]);
      }
      x.current = e.clientX;
      y.current = e.clientY;
    }
  }

  const handleWheel = (e) => {
     if (scale - e.deltaY > 50 && scale - e.deltaY < 500) {
       setScale(scale - e.deltaY);
     }
  }

  return (
    <div
      onWheel={(e) => handleWheel(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => setPanning(false)}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Choropleth
        data={processedData}
        features={worldmap}
        domain={[0, max]}
        unknownColor="#ffffff"
        label="properties.name"
        height={height - 100}
        width={width - 100}
        projectionScale={scale}
        projectionTranslation={translation}
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