import styled, { keyframes } from 'styled-components';
import Timeline from './components/Timeline';
import Totals from './components/Totals';

export default function Dashboard({ totals, history }) {  
  return (
    <DashboardWrapper>
      <DashboardHeader>Global Corvid-19 Outbreak</DashboardHeader>
      <Totals totals={totals} history={history} />
      <Timeline history={history} />
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