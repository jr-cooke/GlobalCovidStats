import styled, { createGlobalStyle } from "styled-components";
import NavBar from "../components/Layout/NavBar";
import useDataFetch from "../utils/useDataFetch";
import BeatLoader from 'react-spinners/BeatLoader';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    background: #F6F7F9;
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

  const getPage = () => {
    if (totalsLoading || historyLoading) return (
      <BeatLoaderWrapper>
        <BeatLoader />
      </BeatLoaderWrapper>
    );
    if (totalsError || historyError) return <p>Error...</p>;
    return <Component {...pageProps} totals={totals} history={history} />;
  }

  return (
    <AppContainer>
      <NavBar />
      <GlobalStyle />
      <PageWrapper>
        {getPage()}
      </PageWrapper>
    </ AppContainer>
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
  max-width: 1000px;
`;

const AppContainer = styled.div`
  width: 100%;
`;