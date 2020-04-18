import styled, { keyframes } from 'styled-components';
import { ResponsiveContainer, PieChart, Pie, Cell  } from "recharts";
import { cardBackgroundColor, cardBorder, cardBoxShadow } from "../../../theme";
import { formatNumber } from "../../../helpers/numbers";

export default function CaseBreakdown({ totals }){
  const { active, recovered, critical, deaths } = totals;
  const confirmed = active + deaths + recovered;
  const mild = active - critical;

  const overallData = [
    {
      stat: "Active",
      value: active,
      color: '#1e88e5',
    },
    {
      stat: "Resolved",
      value: recovered + deaths,
      color: '#757575',
    }
  ]

  const activeData = [
    {
      stat: "Mild",
      value: active - critical,
      color: '#5c6bc0',
    },
    {
      stat: "Critical",
      value: critical,
      color: '#e53935',
    }
  ]
  
  const resolvedData = [
    {
      stat: "Recovered",
      value: recovered,
      color: '#43a047',
    },
    {
      stat: "Fatalities",
      value: deaths,
      color: '#757575',
    }
  ]

  return (
    <CaseBreakdownWrapper>
      <BreakdownWrapper>
        <BreakdownHeader>
          <Header>Total Cases Breakdown</Header>
        </BreakdownHeader>
        <BreakdownBody>
          <PieChartWrapper>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  stroke="none"
                  data={overallData}
                  innerRadius="89%"
                  outerRadius="95%"
                  fill="#82ca9d"
                  dataKey="value"
                  paddingAngle={5}
                  cornerRadius={5}
                  >
                  {overallData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </PieChartWrapper>
          <TotalsWrapper>
            <Total>
              <Label>Active Cases</Label>
              <Number size="24px" color="#1e88e5">
                {formatNumber(active)}
              </Number>
              <SubNumber color='#1e88e5'>{`${((active / confirmed) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
            <Total>
              <Label>Resolved Cases</Label>
              <Number size="24px" color="#757575">
                {formatNumber(recovered + deaths)}
              </Number>
              <SubNumber color='#757575'>{`${(((recovered + deaths) / confirmed) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
          </TotalsWrapper>
        </BreakdownBody>
      </BreakdownWrapper>
      <BreakdownWrapper>
        <BreakdownHeader>
          <Header>Active Case Breakdown</Header>
        </BreakdownHeader>
        <BreakdownBody>
          <TotalsWrapper>
            <Total>
              <Label>Mild Cases</Label>
              <Number size="24px" color="#5c6bc0">
                {formatNumber(mild)}
              </Number>
              <SubNumber color='#5c6bc0'>{`${(((active - critical) / active) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
            <Total>
              <Label>Critical Cases</Label>
              <Number size="24px" color="#e53935">
                {formatNumber(critical)}
              </Number>
              <SubNumber color='#e53935'>{`${((critical / active) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
          </TotalsWrapper>
          <PieChartWrapper>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  stroke="none"
                  data={activeData}
                  innerRadius="89%"
                  outerRadius="95%"
                  fill="#82ca9d"
                  dataKey="value"
                  paddingAngle={5}
                  cornerRadius={5}
                  >
                  {activeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </PieChartWrapper>
        </BreakdownBody>
      </BreakdownWrapper>
      <BreakdownWrapper>
        <BreakdownHeader>
          <Header>Resolved Case Breakdown</Header>
        </BreakdownHeader>
        <BreakdownBody>
          <PieChartWrapper>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  stroke="none"
                  data={resolvedData}
                  innerRadius="89%"
                  outerRadius="95%"
                  fill="#82ca9d"
                  dataKey="value"
                  paddingAngle={5}
                  cornerRadius={5}
                >
                  {resolvedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </PieChartWrapper>
          <TotalsWrapper>
            <Total>
              <Label>Recovered</Label>
              <Number size="24px" color="#43a047">
                {formatNumber(recovered)}
              </Number>
              <SubNumber color='#43a047'>{`${((recovered / (recovered + deaths)) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
            <Total>
              <Label>Fatalities</Label>
              <Number size="24px" color="#757575">
                {formatNumber(deaths)}
              </Number>
              <SubNumber color='#757575'>{`${((deaths / (recovered + deaths)) * 100).toFixed(2)}%`}</SubNumber>
            </Total>
          </TotalsWrapper>
        </BreakdownBody>
      </BreakdownWrapper>
    </CaseBreakdownWrapper>
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

const CaseBreakdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

` 
const BreakdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${cardBackgroundColor};
  border: 1px solid ${cardBorder};
  box-shadow: ${cardBoxShadow};
  width: 100%;
  /* max-width: 400px; */
  border-radius: 10px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.3s linear;
  transition: background-color 0.3s ease, border 0.3s ease;
`;

const BreakdownHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Header = styled.span`
  font-size: 16px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  font-feature-settings: "tnum";
`

const TotalsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 45%;
`;

const BreakdownBody = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const PieChartWrapper = styled.div`
  width: 55%;
  height: 150px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
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
  font-size: ${({ size }) => size};
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
  color: ${({ color }) => color};
`;

const Label = styled.span`
  font-weight: 300;
  display: flex;
  justify-content: center;
  width: 100%;
  white-space: nowrap;
  font-size: 14px;
`;