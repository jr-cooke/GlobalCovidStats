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
  const {data, loading, error} = useDataFetch("https://corona.lmao.ninja/countries");

  const getPage = () => {
    if (loading) return (
      <BeatLoaderWrapper>
        <BeatLoader />
      </BeatLoaderWrapper>
    );
    if (error) return <p>Error...</p>;
    return <Component {...pageProps} data={data} />;
  }

  return (
    <>
      <NavBar />
      <GlobalStyle />
      {getPage()}
    </>
  );
}

const BeatLoaderWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`;
