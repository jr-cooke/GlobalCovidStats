import styled from 'styled-components';
import Stats from '../components/Stats';
import CountrySelector from '../components/CountrySelector';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    margin: 0;
  }
`;

const Dashboard = styled.div`
  display: flex;
  height: 100vh;
  background: #eceff1;
`;

const Header = styled.h1`
  
`;

export default function IndexPage() {
  return (
    <>
      <GlobalStyle />
      <Dashboard>
        <Header>Global</Header>
        <Stats url='https://covid19.mathdro.id/api'></Stats>
        <CountrySelector></CountrySelector>
      </Dashboard>
    </>
  )
}