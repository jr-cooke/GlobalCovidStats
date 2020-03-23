import styled, { keyframes } from 'styled-components';

export default function Stat({label, value, todayValue}){
  return (
    <StatWrapper>
      <h3>{label}</h3>
      <span>{value}</span>
      {todayValue && (
        <span> {todayValue}</span>
      )}
    </StatWrapper>
  );
}

const fadeIn = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: 0;
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
  }
`;

const StatWrapper = styled.div`
  animation: ${fadeIn} 0.2s linear;
`;