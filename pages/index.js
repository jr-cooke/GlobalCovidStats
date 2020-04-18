import Dashboard from '../components/Dashboard/Dashboard';
import styled from 'styled-components';
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import BeatLoader from "react-spinners/BeatLoader";
import useSWR from 'swr';
import Head from 'next/head';

const fetcher = url => fetch(url).then(r => r.json());

export default function IndexPage() {
  const { data: totals, error: totalsError } = useSWR(
    "https://corona.lmao.ninja/v2/all", fetcher
  );

  const { data: history, error: historyError } = useSWR(
    "https://corona.lmao.ninja/v2/historical/all?lastdays=all", fetcher
  );

  const { data: countries, error: countriesError } = useSWR(
    "https://covid19.mathdro.id/api/countries", fetcher
  );
  
  const { data: countryStats, error: countryStatsError } = useSWR(
    "https://covid19.mathdro.id/api/confirmed", fetcher
  );

  if (
    totalsError ||
    countriesError ||
    countryStatsError ||
    historyError
  ) {
    return <p>Error...</p>;
  }
      
  if (
    !countries ||
    !totals ||
    !countryStats ||
    !history
  ) {
    return (
      <BeatLoaderWrapper>
        <BeatLoader color={"#fb8c00"} />
      </BeatLoaderWrapper>
    );
  }
    
  let groupedCountries = [];
  for (let i = 0; i < countries.countries.length; i++) {
    const country = countryStats.filter(
      cS => cS.countryRegion === countries.countries[i].name
    );
    
    if(country.length > 0) groupedCountries.push(country);
  }
  
  const reducedCountries = groupedCountries
    .map(gC => {
      return {
        country: gC[0].countryRegion,
        iso: gC[0].iso3,
        confirmed: gC.reduce((total, c) => total + c.confirmed, 0),
        deaths: gC.reduce((total, c) => total + c.deaths, 0),
        active: gC.reduce((total, c) => total + c.active, 0),
        recovered: gC.reduce((total, c) => total + c.recovered, 0),
        flag: gC[0].iso2
          ? `https://www.countryflags.io/${gC[0].iso2}/flat/64.png`
          : null
      };
    })
    .sort((a, b) => b.confirmed - a.confirmed);

  return (
    <>
      <Head>
        <title>Global COVID-19 Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar countries={reducedCountries} />
      <PageWrapper>
        <Dashboard
          totals={totals}
          history={history}
          countries={reducedCountries}
        />
      </PageWrapper>
      <Footer />
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

const PageWrapper = styled.div`
  margin: auto;
  max-width: 800px;
`;