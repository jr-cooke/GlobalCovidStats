import styled from 'styled-components';
import useDataFetch from "../utils/useDataFetch";
import { ResponsiveChoropleth } from "@nivo/geo";
import { worldmap } from '../constants/worldmap';

export default function WorldMap(){
  const { data, loading, error } = useDataFetch("https://corona.lmao.ninja/countries");
          
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  
  const processedData = data.map(dp => ({ id: dp.country, value: dp.cases }));
  
  const max = processedData.reduce(
    (max, p) => (p.value > max ? p.value : max),
    processedData[0].value
  );
  
  return (
    <WorldMapWrapper>
      <ResponsiveChoropleth
        data={processedData}
        features={worldmap}
        colors="nivo"
        domain={[0, max]}
        unknownColor="#ffffff"
        label="properties.name"
        height={780}
        projectionScale={125}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#152538"
      />
    </WorldMapWrapper>
  );
}

const WorldMapWrapper = styled.div`
  display: flex;
  height: 780px;
  overflow: hidden;
`;