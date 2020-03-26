import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { chartTooltipBackground, textColor } from "../../../theme";
import { formatNumber } from "../../../helpers/numbers";
import Link from "next/link";

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
      <Input
        value={search}
        onChange={e => handleInput(e)}
        placeholder="Search Countries"
      />
      <Header>
        <Empty />
        <Value>Country</Value>
        <Value shift>Cases</Value>
        <Value shift>Deaths</Value>
      </Header>
      {filteredCountries.map(country => (
        <Link
          key={country.country}
          href="/country/[country]"
          as={`/country/${country.country}`}
        >
          <Country>
            {country.flag ? (
              <Img src={country.flag} />
            ) : (
              <Img mock src="/mockflag.png" />
            )}
            <Value>{country.country}</Value>
            <Value shift color="#fb8c00">
              {formatNumber(country.confirmed)}
            </Value>
            <Value shift color="#e53935">
              {formatNumber(country.deaths)}
            </Value>
          </Country>
        </Link>
      ))}
    </Wrapper>
  );
}

const Country = styled.a`
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
  padding: ${({ mock }) => mock ? '10px' : 0};
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
  top: -30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;