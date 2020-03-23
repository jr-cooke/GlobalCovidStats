import styled from 'styled-components';
import Stat from '../Shared/Stat';

export default function GlobalStats({ data }) {
  const totalCases = data.reduce((total, country) => total + country.cases, 0);
  const todayCases = data.reduce((total, country) => total + country.todayCases, 0);
  const totalDeaths = data.reduce((total, country) => total + country.deaths, 0);
  const todayDeaths = data.reduce((total, country) => total + country.todayDeaths, 0);
  const totalRecovered = data.reduce((total, country) => total + country.recovered, 0);
  const totalActive = data.reduce((total, country) => total + country.active, 0);
  const totalCritical = data.reduce((total, country) => total + country.critical, 0);

  return (
    <StatsWrapper>
      <Stat label='Cases' value={totalCases} todayValue={todayCases} />
      <Stat label='Active' value={totalActive} />
      <Stat label='Critical' value={totalCritical} />
      <Stat label='Deaths' value={totalDeaths} todayValue={todayDeaths} />
      <Stat label='Recovered' value={totalRecovered} />
    </StatsWrapper>
  );
}

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;