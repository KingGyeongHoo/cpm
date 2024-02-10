import React, { useState } from "react";
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

import { InfoContainer, FilterContainer, InfoDiv, GraphDiv, TitleDiv, TitleSpan, CustomTooltipDiv, CustumTooltipP, DescH5 } from './InfoDailyUsage'
import Pallete from "../../../Pallete";
import FilterBox from "../../Left/components/FilterBox";

const CustomMonthlyTooltip = ({ active, payload, label }) => {
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
const CustomMonthBar = ({ x, y, width, height, selectedMonth, payload }) => {
    const backgroundColor = selectedMonth === payload.month ? `${Pallete.graph_color_light_purple}` : `${Pallete.graph_color_bar_fill}`;
    return (
        <rect x={x} y={y} width={width} height={height} fill={backgroundColor} />
    );
};

const Info_monthly_usage = ({ data }) => {
    const dispatch=useDispatch()

    const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(el => el + "월")
    const [selectedMonth, setSelectedMonth] = useState("1월");
    const chargerName = useSelector((state) => state.infoReducer.charger_name);

    const daytaPerMonth = Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
        const monthData = data.filter((el) => (new Date(el.start_date).getMonth() + 1) / 1 === month)
        return {
            month: month + "월",
            충전시간: Math.round(
                monthData.reduce((acc, cur) => acc + cur.minute, 0)
            ),
            이용률:
                monthData.length > 0
                    ? Math.round(
                        (monthData.reduce((acc, cur) => acc + cur.minute, 0) /
                            (monthData.length * 1440)) *
                        100
                    )
                    : 0,
        }
    })
    const monthDay = Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
        const monthData = data.filter(el => (new Date(el.start_date).getMonth() + 1) / 1 === selectedMonth.slice(0, -1) / 1)
        return {
            day: day.toString() + "일",
            이용대수: monthData.filter(el => (new Date(el.start_date).getDate()) / 1 === day).length,
            이용시간: Math.round(
                (monthData.reduce((acc, cur) => acc + cur.minute, 0))),
            이용률:
                monthData.length > 0
                    ? Math.round(
                        (monthData.reduce((acc, cur) => acc + cur.minute, 0) /
                            (monthData.length * 1440)) *
                        100
                    )
                    : 0,
        };
    });
    dispatch({type:'SETMONTHDATA', payload:monthDay})

    return (
        <InfoContainer>
            <FilterContainer>
                <FilterBox data={monthArray} click={setSelectedMonth}></FilterBox>
            </FilterContainer>
            <InfoDiv>
                <GraphDiv>
                    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                        <TitleDiv>
                            <h2><TitleSpan>{chargerName}</TitleSpan> 월별 이용률</h2>
                            <DescH5 color="#ffffff">black</DescH5>
                        </TitleDiv>
                        <ComposedChart data={daytaPerMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
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
                            <Legend />
                            <Bar yAxisId="left" dataKey="충전시간" fill={Pallete.graph_color_dark_purple} shape={<CustomMonthBar selectedMonth={selectedMonth}></CustomMonthBar>}></Bar>
                            <Tooltip content={<CustomMonthlyTooltip />}></Tooltip>
                            <Line
                                yAxisId="right"
                                dataKey="이용률"
                                stroke={Pallete.graph_color_light_green}
                                strokeWidth={3}
                                activeDot={{ r: 7 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </GraphDiv>
                <GraphDiv>
                    <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
                        <TitleDiv>
                            <h2><TitleSpan>{selectedMonth}</TitleSpan> 일별 이용 대수</h2>
                            <DescH5>Total : {monthDay.reduce((acc, cur) => acc + cur.이용대수, 0)}대</DescH5>
                        </TitleDiv>
                        <AreaChart data={monthDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
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
export default Info_monthly_usage