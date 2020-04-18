import styled, { keyframes } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Testing({ totals }) {
  console.log("Totals -> totals", totals)
  return (
    <TotalsWrapper>
      <Total>
        <Number>{formatNumber(totals.tests)}</Number>
        <Label>Tests</Label>
      </Total>
      <Total>
        <Number>
          {formatNumber(totals.testsPerOneMillion)}
        </Number>
        <Label>Tests per million</Label>
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
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s linear;
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  opacity: 0.8;
`;

const Number = styled.span`
  color: ${({ color }) => color};
  font-size: 28px;
  font-weight: 300;
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
  font-size: 14px;
`;