import styled, { createGlobalStyle } from "styled-components";
import NavBar from "../components/Layout/NavBar";
import useDataFetch from "../utils/useDataFetch";
import BeatLoader from 'react-spinners/BeatLoader';
import { MyThemeProvider } from "../contexts/theme";
import { backgroundColor, textColor } from "../theme";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {    
    transition: all 0.3s ease;
    background: ${backgroundColor};
    color: ${textColor};
    margin: 0;
  }
`;

export default function RonaTime({ Component, pageProps}) {
  const {
    data: totals,
    loading: totalsLoading,
    error: totalsError
  } = useDataFetch("https://covid19.mathdro.id/api");

  const {
    data: history,
    loading: historyLoading,
    error: historyError
  } = useDataFetch("https://covid19.mathdro.id/api/daily");

  const {
    data: countries,
    loading: countriesLoading,
    error: countriesError
  } = useDataFetch("https://covid19.mathdro.id/api/countries");
  
  const {
    data: countryStats,
    loading: countryStatsLoading,
    error: countryStatsError
  } = useDataFetch("https://covid19.mathdro.id/api/confirmed");

  const getPage = () => {
    if (
      totalsLoading 
      || historyLoading 
      || countriesLoading 
      || countryStatsLoading
    ) return (
      <BeatLoaderWrapper>
        <BeatLoader />
      </BeatLoaderWrapper>
    );

    if (
      totalsError 
      || historyError 
      || countriesError 
      || countryStatsError
    ) return <p>Error...</p>;

    return (
      <Component 
        {...pageProps} 
        totals={totals} 
        history={history} 
        countries={countries} 
        countryStats={countryStats}
      />);
  }

  return (
    <MyThemeProvider>
      <NavBar />
      <GlobalStyle />
      <PageWrapper>
        {getPage()}
      </PageWrapper>
    </ MyThemeProvider>
  );
}

const BeatLoaderWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`;

const PageWrapper = styled.div`
  margin: auto;
  max-width: 800px;
`;

const AppContainer = styled.div`
  width: 100%;
`;