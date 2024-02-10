import React, { useState } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  Legend,
  Line,
  Bar,
  AreaChart,
  Area,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ComposedChart,
} from "recharts";

import Pallete from "../../../Pallete";
import FilterBox from "../../Left/components/FilterBox";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  background-color: ${Pallete.main_font_white};
`;
export const FilterContainer = styled.div`
    width: 20%;
`
export const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "50%")};
  padding: 1%;
  margin: 1%;
  box-shadow: 0px 1px 5px ${Pallete.main_font_dark};
`;
export const TitleDiv = styled.div`
  width: 100%;
  text-align: center;
  color:${Pallete.side_color_dark};
`;
export const TitleSpan = styled.span`
    color: ${Pallete.main_color_dark};
`
export const CustomTooltipDiv = styled.div`
  width: 100%;
  padding: 4%;
  background-color: #ffffff;
  border: 1px solid ${Pallete.graph_color_bar_fill};
  color: ${Pallete.side_color_dark};
`;
export const CustumTooltipP = styled.p`
  color: ${(props) => props.color};
`;
export const DescH5 = styled.h5`
    opacity: ${props => props.color ? 0 : 1};
    text-align: right;
`
const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
        const time = payload[0] ? payload[0].value : 0
        const amount = payload[1] ? payload[1].value : 0

        return (
            <CustomTooltipDiv>
                <CustumTooltipP>{label}</CustumTooltipP>
                <CustumTooltipP color={Pallete.graph_color_light_purple}>{`이용시간: ${time.toLocaleString()}분`}</CustumTooltipP>
                <CustumTooltipP color={Pallete.graph_color_dark_green}>{`이용률: ${amount.toLocaleString()}%`}</CustumTooltipP>
            </CustomTooltipDiv>
        );
    }

    return null;
};

const CustomUsageTooltip = ({ active, payload, label }) => {
    if (active) {
        // payload는 데이터 포인트에 대한 정보를 가지고 있습니다.
        const amount = payload[0] ? payload[0].value : 0

        return (
            <CustomTooltipDiv>
                <CustumTooltipP>{label}</CustumTooltipP>
                <CustumTooltipP color={Pallete.graph_color_dark_green}>{`이용대수: ${amount.toLocaleString()}대`}</CustumTooltipP>
            </CustomTooltipDiv>
        );
    }

    return null;
};

const CustomBar = ({ x, y, width, height, selectedDate, payload }) => {
    const backgroundColor = selectedDate === payload.day ? `${Pallete.graph_color_light_purple}` : `${Pallete.graph_color_bar_fill}`;
    return (
      <rect x={x} y={y} width={width} height={height} fill={backgroundColor} />
    );
  };
const Info_daily_usage = ({ data }) => {
    const dispatch = useDispatch()
    const monthArray = ["월요일", "화요일", "수요일", "목요일", "금요일"]

    const [selectedDate, setSelectedDate] = useState("월요일");
    const chargerName = useSelector((state) => state.infoReducer.charger_name);
    const dayFilterdData = data.filter((el) => el.date === selectedDate);

    const dataPerDay = monthArray.map(
        (day) => {
            const dayData = data.filter((el) => el.date === day)
            return {
                day: day,
                충전시간: Math.round(
                    dayData.reduce((acc, cur) => acc + cur.minute, 0)
                ),
                이용대수: data.filter((el) => el.date === day).length,
                이용률:
                    dayData.length > 0
                        ? Math.round(
                            (dayData.reduce((acc, cur) => acc + cur.minute, 0) /
                                (dayData.length * 1440)) *
                            100
                        )
                        : 0,
            };
        }
    );
    dispatch({type:'SETTIMEDATA', payload:dataPerDay})
    const dataPerTime =
        Array.from({ length: 24 }, (_, i) => i + 1).map((time) => {
            return {
                time: time.toString() + "시",
                이용대수: dayFilterdData.filter(
                    (el) => parseInt(el.start_time.slice(0, 3)) === time
                ).length,
            };
        })
    return (
        <InfoContainer>
            <FilterContainer>
                <FilterBox data={monthArray} click={setSelectedDate}></FilterBox>
            </FilterContainer>
            <InfoDiv>
                <GraphDiv>
                    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                        <TitleDiv>
                            <h2><TitleSpan>{chargerName}</TitleSpan> 이용 시간</h2>
                            <DescH5 color="#ffffff">black</DescH5>
                        </TitleDiv>
                        <ComposedChart data={dataPerDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                stroke={Pallete.graph_color_dark_purple}
                                tickFormatter={(value) => value.toLocaleString() + "분"}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke={Pallete.graph_color_light_green}
                                tickFormatter={(value) => value.toLocaleString() + "%"}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="충전시간"
                                fill={Pallete.graph_color_dark_purple}
                                shape={<CustomBar selectedDate={selectedDate}></CustomBar>}
                            ></Bar>
                            <Line
                                yAxisId="right"
                                dataKey="이용률"
                                stroke={Pallete.graph_color_light_green}
                                activeDot={{ r: 7 }}
                                strokeWidth={3}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </GraphDiv>
                <GraphDiv>
                    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                        <TitleDiv>
                            <h2><TitleSpan>{selectedDate}</TitleSpan> 시간별 이용 대수</h2>
                            <DescH5>Total : {dataPerTime.reduce((acc, cur) => acc + cur.이용대수, 0)}대</DescH5>
                        </TitleDiv>
                        <AreaChart data={dataPerTime}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis
                                tickFormatter={(value) => Number.isInteger(value) ? value.toLocaleString() + "대" : ''}
                            />
                            <Tooltip content={<CustomUsageTooltip />} />
                            <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
                            <Area
                                type="monotone"
                                dataKey="이용대수"
                                fill={Pallete.graph_color_area_fill}
                            ></Area>
                        </AreaChart>
                    </ResponsiveContainer>
                </GraphDiv>
            </InfoDiv>
        </InfoContainer>
    )
}
export default Info_daily_usage