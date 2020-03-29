import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import { textColor, toggleButtonColor } from "../../../theme";
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
      <RegionSearch>
        <FiSearch />
        <Input
          value={search}
          onChange={e => handleInput(e)}
        />
      </RegionSearch>
      <Header>
        <Name>Region</Name>
        <Value shift>Confirmed</Value>
        <Value shift>Fatalities</Value>
      </Header>
      {filteredRegions.map(region => (
        <div key={region.region}>
          <Region>
            <Name>{region.region}</Name>
            <Value shift color="#fb8c00">
              {formatNumber(region.confirmed)}
            </Value>
            <Value shift color="#757575">
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

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.5s linear;
`;

const RegionSearch = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${toggleButtonColor};
  border-radius: 10px;
  width: 80%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 5px;
  svg{
    margin-right: 7px;
    font-size: 20px;
    color: ${toggleButtonColor};
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${textColor};
  font-size: 16px;
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
