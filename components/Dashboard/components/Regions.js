import { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { chartTooltipBackground, textColor } from "../../../theme";
import { formatNumber } from "../../../helpers/numbers";

export default function Regions({ regions }) {
  const [search, setSearch] = useState("");
  const [filteredRegions, setFilteredRegions] = useState(regions);

  const handleInput = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredRegions(
      regions.filter(r =>
        r.region.toLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  }, [search]);

  return (
    <Wrapper>
      <Input
        value={search}
        onChange={e => handleInput(e)}
        placeholder="Search Regions"
      />
      <Header>
        <Name>Region</Name>
        <Value shift>Confirmed</Value>
        <Value shift>Deaths</Value>
      </Header>
      {filteredRegions.map(region => (
        <div
          key={region.region}
        >
          <Region>
            <Name>{region.region}</Name>
            <Value shift color="#fb8c00">
              {formatNumber(region.confirmed)}
            </Value>
            <Value shift color="#e53935">
              {formatNumber(region.deaths)}
            </Value>
          </Region>
        </div>
      ))}
    </Wrapper>
  );
}

const Region = styled.a`
  margin: 10px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${chartTooltipBackground};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  opacity: 0.8;
  padding: 8px;
`;

const Img = styled.img`
  width: 10%;
  padding: ${({ mock }) => (mock ? "10px" : 0)};
`;

const Empty = styled.img`
  width: 10%;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 400;
  width: 40%;
  color: ${({ color }) => color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  width: ${({ shift }) => (shift ? "15%" : "30%")};
  justify-content: ${({ shift }) => (shift ? "flex-end" : "flex-start")};
  color: ${({ color }) => color};
`;

const Header = styled.div`
  margin: 5px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  height: 38px;
  width: 80%;
  background-color: ${chartTooltipBackground};
  opacity: 0.8;
  border: none;
  margin: 20px auto;
  border-radius: 10px;
  color: ${textColor};
  text-align: center;
  font-size: 24px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 300;
  }
`;

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: -20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.5s linear;
`;
