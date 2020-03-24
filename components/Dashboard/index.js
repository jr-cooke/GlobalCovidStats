import styled from 'styled-components';
import Timeline from './components/Timeline';
import Totals from './components/Totals';

export default function Dashboard({ totals, history }) {  
  return (
    <DashboardWrapper>
      <Totals totals={totals} history={history} />
      <Timeline history={history} />
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  padding: 1rem;
  position: relative;
  top: -70px;
`;