import styled, { keyframes } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Totals({totals, history, newConfirmed, newDeaths}) {
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
  }
  100% {
    opacity: 1;
  }
`;

const TotalsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  animation: ${fadeIn} 0.5s linear;
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Number = styled.span`
  color: ${({ color }) => color};
  font-size: 38px;
  font-weight: 200;
  display: flex;
  justify-content: center;
`;

const SubNumber = styled.span`
  font-size: 14px;
  margin-bottom: 3px;
  font-weight: 300;
  display: flex;
  justify-content: center;
`;

const Label = styled.span`
  font-weight: 300;
  display: flex;
  justify-content: center;
`;