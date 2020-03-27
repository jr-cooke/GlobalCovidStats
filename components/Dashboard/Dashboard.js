import styled, { keyframes } from 'styled-components';
import Timeline from './components/Timeline';
import Totals from './components/Totals';
import Countries from './components/Countries';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ConfirmedBreakdown from "./components/ConfirmedBreakdown";

dayjs.extend(relativeTime);

export default function Dashboard({ totals, history, countries, countryStats }) {
 let groupedCountries = []
  for (let i = 0; i < countries.countries.length; i++) {
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

  const active = totals.confirmed.value - (totals.deaths.value + totals.recovered.value);

  const pieData = [
    {
      stat: "Active",
      value: active
    },
    {
      stat: "Recovered",
      value: totals.recovered.value
    },
    {
      stat: "Deaths",
      value: totals.deaths.value
    }
  ];
 
  return (
    <DashboardWrapper>
      <DashboardHeader>
        <span>COVID-19 Overview</span>
        <small>Updated {dayjs(totals.lastUpdate).fromNow()}</small>
      </DashboardHeader>
      <Totals
        totals={totals}
        active={active}
        newConfirmed={
          totals.confirmed.value - history[history.length - 1].totalConfirmed
        }
        newDeaths={
          totals.deaths.value - history[history.length - 1].deaths.total
        }
      />
      <Timeline history={history} />
      <ConfirmedBreakdown data={pieData} />
      <Countries countries={reducedCountries} />
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  padding: 1rem;
`;

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 300;
  animation: ${fadeIn} 0.5s linear;
  margin-bottom: 30px;
  small{
   font-size: 14px; 
  }
`;