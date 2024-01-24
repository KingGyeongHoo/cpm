import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector, dispatch } from "react-redux";
import Information from './Information'
import { FilterCombobox, FilterComboOption } from "./Left";
import { BarChart, Bar, AreaChart, Area, ReferenceLine, XAxis, Tooltip, LabelList, ResponsiveContainer } from "recharts";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  border: 1px solid green;
`
const GraphComboBox = styled(FilterCombobox)`
  width: 20%;
  margin: 2% 1%;
  padding: 1% 0;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid pink;
`
const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1%;
  margin: 1%;
  border: 1px solid blue;
`;
const TitleDiv = styled.div`
    width: 100%;
    text-align: center;
`

export default function TabInformation({data}) {
    const [dayFilterdData, setDayFilterdData] = useState(data.filter(el => el.date === "월요일"))
    let select_day = document.getElementById('select_day')
    const setDataByDay = (e) => {
        const value = select_day.options[select_day.selectedIndex].value
        setDayFilterdData(data.filter(el => el.date === value))
      }
    const dataPerTime = Array.from({ length: 24 }, (_, i) => i + 1).map(time =>{
        return({
                time: time.toString() + "시",
                충전대수: dayFilterdData.filter(el => parseInt(el.start_time.slice(0, 3)) === time).length
                
            }
        )
    })
    const dataPerDay = ["월요일", "화요일", "수요일", "목요일", "금요일"].map(
        (day) => {
            return {
                day: day,
                충전시간: Math.round(
                    data
                        .filter((el) => el.date === day)
                        .reduce((acc, cur) => acc + cur.minute, 0)
                )
            }
        }
    );
    const monthDay = Array.from({ length: 15 }, (_, i) => i + 1).map(
        (day) => {
            const dayData = data.filter(el => parseInt(el.start_date.slice(5, 7)) === day)
            return {
                day: day.toString() + "일",
                이용률: dayData.length > 0 ?
                    Math.round(
                        dayData.reduce((acc, cur) => acc + cur.minute, 0) / (dayData.length * 1440) * 100
                    ) : 0
            }
        }
    )
    console.log(dayFilterdData)
    const idx = useSelector(state => state.idxReducer)
    switch (idx) {
        case 0:
            return (
                <InfoContainer>
                    <Information></Information>
                </InfoContainer>
            )
        case 1:
            return (
                <InfoContainer>
                    <GraphComboBox  id='select_day' onChange={setDataByDay}>
                        {["월요일", "화요일", "수요일", "목요일", "금요일"].map(el => {
                            return(
                                <FilterComboOption value={el} key={el}>{el}</FilterComboOption>
                            )
                        })}
                        
                    </GraphComboBox>
                    <InfoDiv>
                        <GraphDiv>
                            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                                <TitleDiv>충전시간</TitleDiv>
                                <BarChart data={dataPerDay}>
                                    <XAxis dataKey="day" />
                                    <Tooltip />
                                    <Bar dataKey="충전시간" fill="#f0cc20">
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </GraphDiv>
                        <GraphDiv>
                            <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
                                <TitleDiv>일별 이용률</TitleDiv>
                                <AreaChart data={dataPerTime}>
                                    <XAxis dataKey="time" />
                                    <Tooltip />
                                    <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
                                    <Area type="monotone" dataKey="충전대수" fill="#0a955b">
                                    </Area>
                                </AreaChart>
                            </ResponsiveContainer>
                        </GraphDiv>
                    </InfoDiv>
                </InfoContainer>
            )
    }
}
