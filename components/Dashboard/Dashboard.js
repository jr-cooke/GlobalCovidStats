import styled, { keyframes } from 'styled-components';
import Timeline from './components/Timeline';
import Totals from './components/Totals';
import Countries from './components/Countries';

export default function Dashboard({ totals, history, countries, countryStats }) {
  console.log("Dashboard -> countryStats", countryStats)
  console.log("Dashboard -> countries", countries)
  console.log("Dashboard -> history", history)
  console.log("Dashboard -> totals", totals)
  let groupedCountries = []
  for (let i = 0; i < countries.countries.length - 1; i++) {
    groupedCountries.push(
      countryStats.filter(
        cS => cS.countryRegion === countries.countries[i].name
      )
    )
  }

  const reducedCountries = groupedCountries
    .map(gC => {
      return {
        country: gC[0].countryRegion,
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
      console.log("Dashboard -> reducedCountries", reducedCountries)
 
  return (
    <DashboardWrapper>
      <DashboardHeader>Global Corvid-19 Outbreak</DashboardHeader>
      <Totals totals={totals} history={history} />
      <Timeline history={history} />
      <Countries countries={reducedCountries} />
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  padding: 1rem;
  position: relative;
  top: -10px;
`;

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const DashboardHeader = styled.span`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
  animation: ${fadeIn} 0.5s linear;
`;