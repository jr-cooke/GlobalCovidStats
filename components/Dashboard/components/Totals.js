import styled, { keyframes } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Totals({totals, active, newConfirmed, newDeaths}) {
  return (
    <TotalsWrapper>
      <TotalsRow mb={"20px"}>
        <Total>
          <Number color="#fb8c00">
            {formatNumber(totals.confirmed.value)}
          </Number>
          <SubNumber>+{formatNumber(newConfirmed)} today</SubNumber>
          <Label>Confirmed</Label>
        </Total>
        <Total>
          <Number color="#757575">{formatNumber(totals.deaths.value)}</Number>
          <SubNumber>+{formatNumber(newDeaths)} today</SubNumber>
          <Label>Deaths</Label>
        </Total>
      </TotalsRow>
      <TotalsRow>
        <Total>
          <Number color="#e53935">{formatNumber(active)}</Number>
          <Label>Active</Label>
        </Total>
        <Total>
          <Number color="#1e88e5">
            {formatNumber(totals.recovered.value)}
          </Number>
          <Label>Recovered</Label>
        </Total>
      </TotalsRow>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s linear;
`;

const TotalsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ mb }) => mb || '0px'};
  width: 100%;
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Number = styled.span`
  color: ${({ color }) => color};
  font-size: 32px;
  font-weight: 200;
  display: flex;
  justify-content: center;
  font-feature-settings: "tnum";
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