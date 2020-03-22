import styled from 'styled-components';
import Stats from './Stats';
import WorldMap from './WorldMap';
// import BarChart from './BarChart';
// import CountrySelector from '../components/CountrySelector';

export default function Dashboard(){
  return (
    <DashboardWrapper>
      <Header>Global Corvid-19 Pandemic</Header>
      <DashboardContent>
        <Stats url="https://corona.lmao.ninja/all"></Stats>
        <WorldMap />
      </DashboardContent>
    </DashboardWrapper>
  );
}

const Header = styled.h1`
  display: flex;
  justify-content: center;
`;

const DashboardWrapper = styled.div`
  flex: 1;    
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: row;
`;