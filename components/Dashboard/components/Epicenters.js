import styled, { keyframes } from "styled-components";
import { autoSuggestBorder } from "../../../theme";
import Link from 'next/link';
import abbreviate from "number-abbreviate";

export default function Epicenters({ countries }) {
  return (
    <Wrapper>
      <Header>
        <MockImg />
        <Name>Country</Name>
        <Value shift>Confirmed</Value>
        <Value shift>Fatalities</Value>
      </Header>
      {countries.slice(0, 20).map(country => (
        <div key={country.country}>
          <Link
            key={country.country}
            href="/country/[country]"
            as={`/country/${country.country}`}
          >
            <Country>
              <Img src={country.flag} />
              <Name>{country.country}</Name>
              <Value shift color="#fb8c00">
                {abbreviate(country.confirmed)}
              </Value>
              <Value shift color="#757575">
                {abbreviate(country.deaths)}
              </Value>
            </Country>
          </Link>
        </div>
      ))}
    </Wrapper>
  );
}

const Country = styled.a`
  padding: 10px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid ${autoSuggestBorder};
  &:hover{
    cursor: pointer;
  }
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 400;
  width: 30%;
  color: ${({ color }) => color};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  padding: 2px;
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
  margin-top: 20px;
`;

const Img = styled.img`
  width: 32px;
  height: 32px;
`

const MockImg = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
`

