import styled, { keyframes } from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Totals({ totals }) {
  console.log("Totals -> totals", totals)
  return (
    <TotalsWrapper>
      <TotalsRow mb={"20px"}>
        <Total>
          <Number color="#fb8c00">
            {formatNumber(totals.cases)}
          </Number>
          <Label>Total Cases</Label>
        </Total>
        <Total>
          <Number color="#fb8c00">+{formatNumber(totals.todayCases)}</Number>
          <Label>Today</Label>
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
  margin-top: 20px;
  border-radius: 10px;
  background-color: #101010;
  border: 1px solid #212121;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const TotalsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
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