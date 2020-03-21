import styled from 'styled-components';
import Stats from './Stats';
import BarChart from './BarChart';
import CountrySelector from '../components/CountrySelector';

export default function Dashboard(){
  return (
    <DashboardWrapper>
      <Header>Global Corvid-19 Pandemic</Header>
      <Stats url='https://covid19.mathdro.id/api/'></Stats>
      <BarChart />
      {/* <CountrySelector></CountrySelector> */}
    </DashboardWrapper>
  )
}

const Header = styled.h1`
  display: flex;
  justify-content: center;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #eceff1;
`;