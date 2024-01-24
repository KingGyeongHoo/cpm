import { useEffect, useState } from "react";
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

export default function ChargerInfo() {
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

  const dispatch = useDispatch()
  return (
    <>
      <TabContainer>
        {["충전기 정보", "요일별 사용률", "일별 사용률", "통계"].map((el, idx) => <TabList onClick={() => dispatch({type: idx.toString()})}>{el}</TabList>)}
      </TabContainer>
      <TabInformation data={data}></TabInformation>
    </>
  );
}
