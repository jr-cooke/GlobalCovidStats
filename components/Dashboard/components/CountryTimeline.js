import styled from "styled-components";
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { textColor, chartTooltipBackground } from "../../../theme";

import { formatNumber } from "../../../helpers/numbers";

function CustomTick(props) {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <CustomTickText
        x={0}
        y={0}
        dy={12}
        textAnchor="start"
        fill="#666"
        transform="rotate(45)"
      >
        {dayjs(payload.value).format("MMM DD")}
      </CustomTickText>
    </g>
  );
}

function CustomTooltip({ active, payload }) {
  if (active) {
    return (
      <ToolTipWrapper>
        <ToolTipLabel>
          {dayjs(payload[0].payload.date).format("MMM DD, YYYY")}
        </ToolTipLabel>
        <ToolTipLabel color="#fb8c00">
          Confirmed: {formatNumber(payload[0].payload.confirmed)}
        </ToolTipLabel>
        <ToolTipLabel color="#757575">
          deaths: {formatNumber(payload[0].payload.deaths)}
        </ToolTipLabel>
      </ToolTipWrapper>
    );
  }
  return null;
}

export default function CountryTimeline({ history }) { 
  return (
    <TotalsTimeline>
      <ResponsiveContainer>
        <AreaChart
          data={history}
          strokeWidth={1.5}
          margin={{ left: 15, right: 15, bottom: 30, top: 10 }}
        >
          <XAxis
            dataKey="date"
            tickCount={1}
            interval={7}
            axisLine={false}
            tick={<CustomTick />}
          />
          <Tooltip offset={0} cursor={false} content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="confirmed"
            stackId="1"
            stroke="#fb8c00"
            fill="#fb8c00"
          />
          <Area
            type="monotone"
            dataKey="deaths"
            stackId="2"
            stroke="#757575"
            fill="#757575"
          />
        </AreaChart>
      </ResponsiveContainer>
    </TotalsTimeline>
  );
}

const TotalsTimeline = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
`;

const CustomTickText = styled.text`
  font-size: 12px;
  fill: ${textColor};
  animation: all 0.5s ease;
`;

const ToolTipWrapper = styled.div`
  opacity: 0.8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 150px;
  background-color: ${chartTooltipBackground};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
`;

const ToolTipLabel = styled.span`
  margin-bottom: 3px;
  color: ${({ color }) => color};
`;
