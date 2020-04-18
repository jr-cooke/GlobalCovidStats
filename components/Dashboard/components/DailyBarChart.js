import styled from "styled-components";
import dayjs from "dayjs";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { textColor, chartTooltipBackground } from "../../../theme";
import abbreviate from "number-abbreviate";

import { formatNumber } from "../../../helpers/numbers";

function CustomTickX(props) {
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

function CustomTickY(props) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <CustomTickText x={0} y={0} dy={0} textAnchor="end" fill="#666">
        {abbreviate(payload.value)}
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
        <ToolTipLabel color="#1e88e5">
          Recovered: {formatNumber(payload[0].payload.recovered)}
        </ToolTipLabel>
        <ToolTipLabel color="#757575">
          Fatalities: {formatNumber(payload[0].payload.deaths)}
        </ToolTipLabel>
      </ToolTipWrapper>
    );
  }

  return null;
}

export default function DailyBarChart({ history }) {
  console.log("DailyBarChart -> history", history)
  const dateRange = Object.keys(history.cases);
  const perDayData = [];
  for (let i = 0; i < dateRange.length; i++) {
    const confirmed = history.cases[dateRange[i]];
    const deaths = history.deaths[dateRange[i]];
    const recovered = history.recovered[dateRange[i]];
    const pastConfirmed = i - 1 < 0 ? 0 : history.cases[dateRange[i - 1]];
    const pastRecovered = i - 1 < 0 ? 0 : history.recovered[dateRange[i - 1]];
    const pastDeaths = i - 1 < 0 ? 0 : history.deaths[dateRange[i - 1]];
    perDayData.push({
      date: dateRange[i],
      confirmed: confirmed - pastConfirmed,
      recovered: recovered - pastRecovered,
      deaths: deaths - pastDeaths
    });
  }
  return (
    <TotalsTimeline>
      <ResponsiveContainer>
        <LineChart
          data={perDayData}
          strokeWidth={1.5}
          margin={{ left: 15, right: 15, bottom: 30, top: 10 }}
        >
          <YAxis tick={<CustomTickY />} width={30} />
          <XAxis
            dataKey="date"
            interval={14}
            tick={<CustomTickX />}
          />
          <Tooltip offset={0} cursor={false} content={<CustomTooltip />} />
          <Line
            dataKey="confirmed"
            stroke="#fb8c00"
            strokeWidth={2}
            dot={false}
            type="natural"
          />
          <Line
            dataKey="recovered"
            stroke="#1e88e5"
            strokeWidth={2}
            dot={false}
            type="natural"
          />
          <Line
            dataKey="deaths"
            stroke="#757575"
            strokeWidth={2}
            dot={false}
            type="natural"
          />
        </LineChart>
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
