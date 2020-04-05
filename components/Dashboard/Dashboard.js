import styled, { keyframes } from 'styled-components';
import Timeline from './components/Timeline';
import DailyBarChart from "./components/DailyBarChart";
import Totals from './components/Totals';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ConfirmedBreakdown from "./components/ConfirmedBreakdown";
import Epicenters from "./components/Epicenters";
import Map from "./components/Map";
import ReactTooltip from "react-tooltip";
import { toggleButtonColor, headerBorder } from "../../theme";
import { FiPieChart, FiMap, FiBarChart, FiTrendingUp } from "react-icons/fi";
import { useState } from 'react';
import { useTheme } from "../../contexts/theme";


dayjs.extend(relativeTime);

export default function Dashboard({ totals, history, countries, daily }) {
  const { theme } = useTheme(); 
  const [openTab, setOpenTab] = useState('overview');
  const [content, setContent] = useState("");
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
      label: 'Overview',
      icon: <FiPieChart key="tab1" />,
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
      ),
    },
    history: {
      label: 'History',
      icon: <FiBarChart key="tab2" />,
      view: (
        <>
          <Header mb="30px">Growth over time</Header>
          <Timeline history={history} />
          <Header mb="30px">Growth per day</Header>
          <DailyBarChart history={history} daily={daily} />
        </>
      ),
    },
    epicenters: {
      label: 'Epicenters',
      icon: <FiTrendingUp key="tab3" />,
      view: <Epicenters countries={countries} />,
    },
    map: {
      icon: <FiMap key="tab4" />,
      label: 'Map',
      view: (
        <>
          <Header mb="30px">Gloabal Heatmap</Header>
          <Map countries={countries} setTooltipContent={setContent} />
          <ReactTooltip type={theme.mode === 'light' ? 'light' : 'dark'} borderRadius={10}>{content}</ReactTooltip>
        </>
      ),
    },
  };
 
  return (
    <DashboardWrapper>
      <DashboardHeader>
        <span>Global COVID-19 Stats</span>
        <small>Updated {dayjs(totals.lastUpdate).fromNow()}</small>
      </DashboardHeader>
      <Tabs>
        {Object.keys(tabs).map(tab => (
          <Tab openTab={openTab === tab} onClick={() => setOpenTab(tab)} key={tabs[tab].label}>{tabs[tab].icon}</Tab>
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
  svg{
    font-size: 24px;
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