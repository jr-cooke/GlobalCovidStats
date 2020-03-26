import styled, { keyframes } from 'styled-components';
import { useRouter } from "next/router";
import useDataFetch from "../../utils/useDataFetch";
import Totals from '../../components/Dashboard/components/Totals'
import CountryTimeline from '../../components/Dashboard/components/CountryTimeline'
import BeatLoader from "react-spinners/BeatLoader";
import { textColor } from "../../theme";

// import Link from "next/link";

const Country = () => {
  const router = useRouter();
  const { country } = router.query;
  
  const { data: history, loading: historyLoading, error: historyError } = useDataFetch(
    `https://corona.lmao.ninja/v2/historical/${country}`
  );
  
  const { data: totals, loading: totalsLoading, error: totalsError } = useDataFetch(
    `https://covid19.mathdro.id/api/countries/${country}`
  );
  
  if (totalsLoading || historyLoading ) return (
    <BeatLoaderWrapper>
      <BeatLoader color={"#fb8c00"}/>
    </BeatLoaderWrapper>
  );

  if (totalsError || historyError) return <p>Error...</p>;

  const dateRange = Object.keys(history.timeline.cases)
  
  let data = [];
  for (let i = 0; i < dateRange.length - 1; i++) {
    data.push({
      date: dateRange[i],
      confirmed: history.timeline.cases[dateRange[i]],
      deaths: history.timeline.deaths[dateRange[i]],
    })
  }
  
  return (
    <CountryWrapper>
      <CountryHeader>{country}</CountryHeader>
      <Totals
        totals={totals}
        history={data}
        newConfirmed={
          totals.confirmed.value - data[data.length -1].confirmed
        }
        newDeaths={
          totals.deaths.value - data[data.length -1].deaths
        }
      />
      <CountryTimeline history={data} />
    </CountryWrapper>
  );
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

const CountryHeader = styled.span`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
  animation: ${fadeIn} 0.5s linear;
  margin-bottom: 30px;
`;

export default Country;
