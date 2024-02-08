import { useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FilterCombobox } from "./Left";
import TabInformation from "./TabInformation";
import AWS from "aws-sdk";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  border: 1px solid green;
`
const TabList = styled.div`
  width: 90%;
  padding: 5%;
`
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

export default function ChargerInfo({chargerIdArray}) {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([])
  const info = useSelector(state => state.infoReducer)
  const figure = useSelector(state => state.figureReducer)
  
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
    const params = { Bucket: "chargers-list/useage-record", Key: "ChargerUseData.json" };

    s3.getObject(params, (err, result) => {
      if (err) {
        console.error("Error fetching data from S3:", err);
      } else {
        const fileContent = result.Body.toString("utf-8");
        const data = JSON.parse(fileContent)
        setAllData(data)
        const allInfo = {
          average_cost: Math.round(data.reduce((acc, cur) => acc + cur.cost/1, 0) / data.length),
          average_usage: Math.round(data.reduce((acc, cur) => acc + cur.useage/1, 0) / data.length)
        }
        dispatch({type:'SETINFO', figure:allInfo})
      }
    });
  }, []);

  const charger_sorted = useMemo(() => {
    return chargerIdArray.map(id => {
      const filtered = allData.filter(el => el.id.toString() === id.toString())
      return {
        id: id,
        cost: filtered.length > 0 ? 
        Math.round(filtered.reduce((acc, cur) => acc +cur.cost, 0) / filtered.length) : 0,
        usage: filtered.length > 0 ? 
        Math.round(filtered.reduce((acc, cur) => acc + cur.useage, 0) / filtered.length) : 0
      }
    })
  }, [allData, chargerIdArray])

  useEffect(() => {
    setData(allData.filter((el) => parseInt(el.id) === info.id))
  }, [info])
  return (
    <>
      <TabContainer>
        {["충전기 정보", "요일별 이용률", "일별 이용률", "통계"].map((el, idx) => <TabList onClick={() => dispatch({type: idx.toString()})}>{el}</TabList>)}
      </TabContainer>
      <TabInformation data={data} charger_sorted={charger_sorted}></TabInformation>
    </>
  );
}
