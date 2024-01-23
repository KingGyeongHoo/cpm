import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { BarChart, Bar, AreaChart, Area, ReferenceLine, XAxis, Tooltip, LabelList, ResponsiveContainer} from "recharts";
import Information from './Information'
import { FilterCombobox, FilterComboOption } from "./Left";
import AWS from "aws-sdk";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const GraphDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 29%;
  padding: 1%;
  margin: 1%;
  border: 1px solid blue;
`;
const TitleDiv = styled.div`
    width: 100%;
    text-align: center;
`
const GraphComboBox = styled(FilterCombobox)`
  width: 20%;
  margin: 2% 0;
  padding: 1% 0;
`

export default function Graph() {
  const [data, setData] = useState([]);
  const info = useSelector(state => state.infoReducer)
  useEffect(() => {
    // AWS 설정
    AWS.config.update({
      region: process.env.REACT_APP_region,
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // S3에서 파일 읽기
    const params = { Bucket: "chargers-list/useage-record", Key: "usageData.json" };

    s3.getObject(params, (err, result) => {
      if (err) {
        console.error("Error fetching data from S3:", err);
      } else {
        const fileContent = result.Body.toString("utf-8");
        const filteredData = JSON.parse(fileContent).filter(
          (el) => parseInt(el.id) === info.id
        );
        setData(filteredData);
      }
    });
  }, [info]);

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
  const monthDay= Array.from({length: 15}, (_, i) => i + 1).map(
    (day) =>{
      const dayData = data.filter(el => parseInt(el.start_date.slice(5, 7)) === day)
      return{
        day: day.toString()+"일",
        이용률: dayData.length > 0 ? 
        Math.round(
          dayData.reduce((acc, cur) => acc + cur.minute, 0)/(dayData.length*1440) * 100
        ) : 0
      }
    }
  )

  return (
    <InfoContainer>
      <GraphComboBox>
        <FilterComboOption value="none">요일별</FilterComboOption>
      </GraphComboBox>
      <InfoDiv>
        <Information></Information>
        <GraphDiv>
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
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
          <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            <TitleDiv>일별 이용률</TitleDiv>
            <AreaChart data={monthDay}>
              <XAxis dataKey="day" />
              <Tooltip />
              <ReferenceLine x={50} stroke="red" label="Max PV PAGE" />
              <Area type="monotone" dataKey="이용률" fill="#0a955b">
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </GraphDiv>
        {/* <GraphDiv>
          <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            <TitleDiv>사용량</TitleDiv>
            <BarChart width={500} height={500} data={dataPerDay}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Bar dataKey="사용량" fill="#4a0a7b">
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GraphDiv> */}
      </InfoDiv>
    </InfoContainer>
  );
}
