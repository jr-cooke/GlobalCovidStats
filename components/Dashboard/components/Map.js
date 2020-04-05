import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { formatNumber } from '../../../helpers/numbers';
import { useRouter } from "next/router";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json";

const colorScale = scaleLinear()
  .domain([0, 300000])
  .range(["#ffcc80", "#fb8c00"]);

function Map({ countries, setTooltipContent }) {
  const router = useRouter();
  return (
    <MapWrapper>
      <ComposableMap data-tip="">
        <ZoomableGroup
          zoom={1}
          onMoveStart={() => setTooltipContent("")}
          center={[0, 0]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = countries.find(
                  (c) => c.iso === geo.properties.ISO_A3
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    strokeWidth={0.1}
                    stroke="#000000"
                    fill={
                      country ? colorScale(country["confirmed"]) : "#ffffff"
                    }
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(
                        country ? (
                          <ToolTipWrapper>
                            <ToolTipLabel>{country.country}</ToolTipLabel>
                            <ToolTipLabel color="#fb8c00">
                              Confirmed: {formatNumber(country.confirmed)}
                            </ToolTipLabel>
                            <ToolTipLabel color="#9b9b9b">
                              Fatalities: {formatNumber(country.deaths)}
                            </ToolTipLabel>
                          </ToolTipWrapper>
                        ) : (
                          ""
                        )
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    // onDoubleClick={() => {
                    //   if(country) {
                    //     router.push("/country/[country]", `/country/${country.country}`)
                    //   }
                    // }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </MapWrapper>
  );
}

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MapWrapper = styled.div`
  animation: ${fadeIn} 1s linear;
`

const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const ToolTipLabel = styled.span`
  margin-bottom: 3px;
  color: ${({ color }) => color};
  font-size: 16px;
`;

export default memo(Map)