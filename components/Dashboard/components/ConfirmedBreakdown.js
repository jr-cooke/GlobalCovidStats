import styled from 'styled-components';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from '../../../contexts/theme';

const COLORS = ["#e53935", "#1e88e5", "#757575"];

export default function ConfirmedBreakdown({ data }){
  console.log("ConfirmedBreakdown -> data", data)
  const active = data.find(d => d.stat === "Active").value;
  const recovered = data.find(d => d.stat === "Recovered").value;
  const deaths = data.find(d => d.stat === "Deaths").value;
  const confirmed = active + deaths + recovered;
  const { theme } = useTheme();
  return (
    <ConfirmedBreakdownWrapper>
      <PieChartWrapper>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              stroke="none"
              data={data}
              innerRadius="74%"
              outerRadius="80%"
              fill="#82ca9d"
              dataKey="value"
              paddingAngle={5}
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </PieChartWrapper>
      <PercentsWrapper>
        <Total>
          <Number color="#e53935">
            {((active / confirmed) * 100).toFixed(2)}%
          </Number>
          <Label>Active</Label>
        </Total>
        <Total>
          <Number color="#1e88e5">
            {((recovered / confirmed) * 100).toFixed(2)}%
          </Number>
          <Label>Recovered</Label>
        </Total>
        <Total>
          <Number color="#757575">
            {((deaths / confirmed) * 100).toFixed(2)}%
          </Number>
          <Label>Fatal</Label>
        </Total>
      </PercentsWrapper>
    </ConfirmedBreakdownWrapper>
  );
}

const ConfirmedBreakdownWrapper = styled.div`
  position: relative;
  top: -30px;
  display: flex;
  height: 300px;
` 

const PieChartWrapper = styled.div`
  display: flex;
  width: 50%;
`

const PercentsWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

const Label = styled.span`
  font-weight: 300;
  display: flex;
  justify-content: center;
  width: 100%;
  white-space: nowrap;
`;