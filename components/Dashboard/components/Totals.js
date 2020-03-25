import styled, { keyframes } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Totals({totals, history}) {
  const newConfirmed = totals.confirmed.value - history[history.length - 1].totalConfirmed;
  const newDeaths = totals.deaths.value - history[history.length - 1].deaths.total;

  return (
    <TotalsWrapper>
      <Total>
        <Number color="#fb8c00">{formatNumber(totals.confirmed.value)}</Number>
        <SubNumber>+{formatNumber(newConfirmed)} today</SubNumber>
        <Label>Confirmed</Label>
      </Total>
      <Total>
        <Number color="#e53935">{formatNumber(totals.deaths.value)}</Number>
        <SubNumber>+{formatNumber(newDeaths)} today</SubNumber>
        <Label>Deaths</Label>
      </Total>
    </TotalsWrapper>
  );
}

const fadeIn = keyframes`	
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const TotalsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  animation: ${fadeIn} 1.5s linear;
`;

const Total = styled.div`
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

const Number = styled.span`
  color: ${({ color }) => color};
  font-size: 38px;
  font-weight: 200;
`;

const SubNumber = styled.span`
  font-size: 14px;
  margin-bottom: 3px;
  font-weight: 300;
`;

const Label = styled.span`
  font-weight: 300;
`;