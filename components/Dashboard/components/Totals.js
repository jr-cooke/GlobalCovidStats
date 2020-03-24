import styled from "styled-components";
import { formatNumber } from "../../../helpers/numbers";

export default function Totals({totals, history}) {
  return (
    <TotalsWrapper>
      <Total color="#fb8c00">
        <Number>{formatNumber(totals.confirmed.value)}</Number>
        <Label>Confirmed</Label>
      </Total>
      <Total color="#e53935">
        <Number>{formatNumber(totals.deaths.value)}</Number>
        <Label>Deaths</Label>
      </Total>
    </TotalsWrapper>
  );
}

const TotalsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;

const Total = styled.div`
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
  color: ${({ color }) => color};
  margin-right: 50px;
`;

const Number = styled.span`
  font-size: 38px;
  font-weight: 200;
`;

const Label = styled.span``;