import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { chartTooltipBackground, textColor } from "../../../theme";

export default function Countries({ countries }) {
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  
  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        c => c.country.toLowerCase().includes(search.toLocaleLowerCase())
      ))
  }, [search])

  return (
    <Wrapper>
      <Input value={search} onChange={e => handleInput(e)} placeholder='Search Countries'/>
      <Header>
        <Empty />
        <Value>Country</Value>
        <Value shift>Cases</Value>
        <Value shift>Deaths</Value>
      </Header>
      {filteredCountries.map(country => (
        <Country key={country.country}>
          {country.flag ? (
            <Img src={country.flag} />
          ) : (
            <Img src="/mockflag.png" />
          )}
          <Value>{country.country}</Value>
          <Value shift color="#fb8c00">
            {country.confirmed}
          </Value>
          <Value shift color="#e53935">
            {country.deaths}
          </Value>
        </Country>
      ))}
    </Wrapper>
  );
}

const Country = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${chartTooltipBackground};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  opacity: 0.8;
`;

const Img = styled.img`
  width: 10%;
`;

const Empty = styled.img`
  width: 10%;
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

const Wrapper = styled.div`
  position: relative;
  top: -25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;