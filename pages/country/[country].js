import styled, { keyframes } from 'styled-components';
import { useRouter } from "next/router";
import useDataFetch from "../../utils/useDataFetch";
import Totals from '../../components/Dashboard/components/Totals'
import CountryTimeline from '../../components/Dashboard/components/CountryTimeline'
import BeatLoader from "react-spinners/BeatLoader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Regions from '../../components/Dashboard/components/Regions';
import ConfirmedBreakdown from '../../components/Dashboard/components/ConfirmedBreakdown';
import NavBar from '../../components/Layout/NavBar';
import useSWR from "swr";

dayjs.extend(relativeTime);

const fetcher = url => fetch(url).then(r => r.json());

const Country = () => {
  const router = useRouter();
  const { country } = router.query;
  
  const { data: history, error: historyError } = useSWR(
    `https://corona.lmao.ninja/v2/historical/${country}`,
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
  
  return (
    <>
     <NavBar />
      <CountryWrapper>
        <CountryHeader>
          <span>{country}</span>
          <small>Updated {dayjs(totals.lastUpdate).fromNow()}</small>
        </CountryHeader>
        <Totals
          totals={totals}
          history={data}
          active={active}
          newConfirmed={totals.confirmed.value - data[data.length - 1].confirmed}
          newDeaths={totals.deaths.value - data[data.length - 1].deaths}
        />
        <CountryTimeline history={data} />
        <ConfirmedBreakdown data={pieData} />
        {reducedRegions.length > 1 && <Regions regions={reducedRegions} />}
      </CountryWrapper>
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
  position: relative;
  top: -10px;
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

export default Country;
