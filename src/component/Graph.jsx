import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BarChart, Bar, XAxis, Tooltip, LabelList, ResponsiveContainer} from "recharts";
import AWS from "aws-sdk";

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

export default function Graph({ info }) {
  const [data, setData] = useState([]);

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
    const params = { Bucket: "chargers-list/useage-record", Key: "data.json" };

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
            .filter((el) => el.chargeday === day)
            .reduce((acc, cur) => acc + cur.chargeminute, 0)
        ),
        충전비용: Math.round(
          data
            .filter((el) => el.chargeday === day)
            .reduce((acc, cur) => acc + cur.cost, 0)
        ),
        사용량: Math.round(
          data
            .filter((el) => el.chargeday === day)
            .reduce((acc, cur) => acc + cur.used, 0)
        ),
      };
    }
  );

  return (
    <>
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
          <TitleDiv>충전비용</TitleDiv>
          <BarChart width={500} height={500} data={dataPerDay}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Bar dataKey="충전비용" fill="#0a955b">
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GraphDiv>
      <GraphDiv>
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
          <TitleDiv>사용량</TitleDiv>
          <BarChart width={500} height={500} data={dataPerDay}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Bar dataKey="사용량" fill="#4a0a7b">
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GraphDiv>
    </>
  );
}
