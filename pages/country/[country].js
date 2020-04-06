import styled, { keyframes } from 'styled-components';
import { useRouter } from "next/router";
import Totals from '../../components/Dashboard/components/Totals'
import CountryTimeline from '../../components/Dashboard/components/CountryTimeline'
import CountryDailyBarChart from '../../components/Dashboard/components/CountryDailyBarChart'
import BeatLoader from "react-spinners/BeatLoader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Regions from '../../components/Dashboard/components/Regions';
import ConfirmedBreakdown from '../../components/Dashboard/components/ConfirmedBreakdown';
import NavBar from '../../components/Layout/NavBar';
import Footer from '../../components/Layout/Footer';
import useSWR from "swr";
import Head from 'next/head';
import { FiPieChart, FiMap, FiBarChart, FiTrendingUp } from "react-icons/fi";
import { useState } from 'react';
import {
  toggleButtonColor,
  headerBorder,
} from "../../theme";


dayjs.extend(relativeTime);

const fetcher = url => fetch(url).then(r => r.json());

const Country = () => {
  const [openTab, setOpenTab] = useState("overview");
  const router = useRouter();
  const { country } = router.query;
  
  const { data: history, error: historyError } = useSWR(
    `https://corona.lmao.ninja/v2/historical/${country === "Korea, South" ? "S. Korea" : country}?lastdays=all`,
    fetcher
  );
  
  const { data: totals, error: totalsError } = useSWR(
    `https://covid19.mathdro.id/api/countries/${country}`,
    fetcher
  );

  const { data: regions, error: regionsError } = useSWR(
    `https://covid19.mathdro.id/api/countries/${country}/confirmed`,
    fetcher
  );
  
  if (totalsError || historyError || regionsError) return <p>Error...</p>;

  if ( !totals || !history || !regions ) return (
    <BeatLoaderWrapper>
      <BeatLoader color={"#fb8c00"}/>
    </BeatLoaderWrapper>
  );

  const dateRange = Object.keys(history.timeline.cases)
  
  let data = [];
  for (let i = 0; i < dateRange.length; i++) {
    data.push({
      date: dateRange[i],
      confirmed: history.timeline.cases[dateRange[i]],
      deaths: history.timeline.deaths[dateRange[i]],
    })
  }
  
  const regionNames = regions.map(r => r.provinceState).filter((x, i, a) => a.indexOf(x) == i)
  let groupedRegions = [];
  for (let i = 0; i < regionNames.length; i++) {
    groupedRegions.push(
      regions.filter(
        r => r.provinceState === regionNames[i]
      )
    );
  }

  const reducedRegions = groupedRegions
    .map(gR => {
      return {
        region: gR[0].provinceState ? gR[0].provinceState : gR[0].countryRegion,
        confirmed: gR.reduce((total, c) => total + c.confirmed, 0),
        deaths: gR.reduce((total, c) => total + c.deaths, 0)
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

  const tabs = {
    overview: {
      icon: <FiPieChart />,
      label: "Overview",
      view: (
        <>
          <Header mb="20px">Totals</Header>
          <Totals
            totals={totals}
            history={data}
            active={active}
            newConfirmed={
              totals.confirmed.value - data[data.length - 1].confirmed
            }
            newDeaths={totals.deaths.value - data[data.length - 1].deaths}
          />
          <Header>Breakdown</Header>
          <ConfirmedBreakdown data={pieData} />
        </>
      )
    },
    history: {
      icon: <FiBarChart />,
      label: "History",
      view: (
        <>
          <Header mb="30px">Growth over time</Header>
          <CountryTimeline history={data} />
          <Header mb="30px">Growth per day</Header>
          <CountryDailyBarChart daily={history} />
        </>
      )
    },
    regions: {
      icon: <FiTrendingUp />,
      label: "Regions",
      view: <Regions regions={reducedRegions} />
    }
  };

  return (
    <>
      <Head>
        <title>{country} COVID-19 Stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <PageWrapper>
        <CountryWrapper>
          <CountryHeader>
            <span>{country} COVID-19 Stats</span>
            <small>Updated {dayjs(totals.lastUpdate).fromNow()}</small>
          </CountryHeader>
          <Tabs>
            {Object.keys(tabs).map(tab => (
              <Tab
                openTab={openTab === tab}
                onClick={() => setOpenTab(tab)}
                key={tabs[tab].label}
              >
                {tabs[tab].icon}
              </Tab>
            ))}
          </Tabs>
          {tabs[openTab].view}
        </CountryWrapper>
      </PageWrapper>
      <Footer />
    </>
  );
};

Country.getInitialProps = async () => {
  return {};
};

const BeatLoaderWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
`;

const fadeIn = keyframes`	
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CountryWrapper = styled.div`
  padding: 1rem;
`;

const CountryHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 300;
  animation: ${fadeIn} 0.5s linear;
  margin-bottom: 30px;
  small {
    font-size: 14px;
  }
`;

const PageWrapper = styled.div`
  margin: auto;
  max-width: 800px;
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
  &:hover {
    cursor: pointer;
  }
  svg {
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

export default Country;
