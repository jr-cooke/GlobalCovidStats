import styled from 'styled-components';
import GlobalStats from './GlobalStats';

export default function Dashboard({data}){
  return (
    <DashboardWrapper>
      <GlobalStats data={data} />
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  flex: 1;    
  display: flex;
  flex-direction: column;
`;