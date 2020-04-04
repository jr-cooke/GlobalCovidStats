import styled, { keyframes } from 'styled-components';
import Timeline from './components/Timeline';
import DailyBarChart from "./components/DailyBarChart";
import Totals from './components/Totals';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ConfirmedBreakdown from "./components/ConfirmedBreakdown";
import Epicenters from "./components/Epicenters";
import { toggleButtonColor, headerBorder } from "../../theme";

import { useState } from 'react';

dayjs.extend(relativeTime);

export default function Dashboard({ totals, history, countries, daily }) {
  const [openTab, setOpenTab] = useState('overview');
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

  const tabs = {
    overview: {
      label: "Overview",
      view: (
        <>
          <Header mb="20px">Totals</Header>
          <Totals
            totals={totals}
            active={active}
            newConfirmed={
              totals.confirmed.value -
              history[history.length - 1].totalConfirmed
            }
            newDeaths={
              totals.deaths.value - history[history.length - 1].deaths.total
            }
          />
          <Header>Breakdown</Header>
          <ConfirmedBreakdown data={pieData} />
        </>
      )
    },
    history: {
      label: "History",
      view: (
        <>
          <Header mb="30px">Growth over time</Header>
          <Timeline history={history} />
          <Header mb="30px">Growth per day</Header>
          <DailyBarChart history={history} daily={daily} />
        </>
      )
    },
    epicenters: {
      label: "Epicenters",
      view: (
        <Epicenters countries={countries} />
      )
    }
  };
 
  return (
    <DashboardWrapper>
      <DashboardHeader>
        <span>Global COVID-19 Stats</span>
        <small>Updated {dayjs(totals.lastUpdate).fromNow()}</small>
      </DashboardHeader>
      <Tabs>
        {Object.keys(tabs).map(tab => (
          <Tab openTab={openTab === tab} onClick={() => setOpenTab(tab)} key={tabs[tab].label}>{tabs[tab].label}</Tab>
        ))}
      </Tabs>
      {tabs[openTab].view}
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

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Tab = styled.span`
  font-size: 18px;
  padding: 5px;
  color: ${({ openTab }) => (openTab ? toggleButtonColor : headerBorder)};
  transition: border 0.5s ease-in-out;
  &:hover{
    cursor: pointer;
  }
`;

const Header = styled.span`
  display: flex;
  margin-top: 20px;
  margin-bottom: ${props => props.mb};
  border-bottom: 1px solid ${headerBorder};
  padding: 5px;
  color: ${headerBorder};
`;