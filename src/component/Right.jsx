import { styled } from "styled-components";
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 1%;
`
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Info = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5% 0;
  padding: 3% 0;
  border-bottom: 2px solid #015aae;
`
const InfoText = styled.span`
  width: 30%;
  color: #176ab8;
  font-weight: bold;
`
const InfoDetail = styled.div`
  width: 60%;
  font-size: 1.1rem;
`
export default function Right({info}){

  const [data, setData] = useState([]);

  useEffect(() => {
    // AWS 설정
    AWS.config.update({
      region: 'area',
      accessKeyId: 'id',
      secretAccessKey: 'key',
    });

    // S3 객체 생성
    const s3 = new AWS.S3();
 
    // S3에서 파일 읽기
    const params = { Bucket: 'route', Key: 'file' };

    s3.getObject(params, (err, result) => {
      if (err) {
        console.error('Error fetching data from S3:', err);
      } else {
      console.log('success')
        const fileContent = result.Body.toString('utf-8');
        const parsedData = JSON.parse(fileContent);
        setData(parsedData);
      }
    });
  }, []); // useEffect는 최초 렌더링 시에만 호출되도록 빈 배열을 전달

  console.log(data)
  return(
    <RightDiv>
      <InfoDiv>
        <ul>
            <Info>
              <InfoText>충전기 ID</InfoText>
              <InfoDetail>{info.id}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전소 위치</InfoText>
              <InfoDetail>{info.charger_address}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전소명</InfoText>
              <InfoDetail>{info.charger_name}</InfoDetail>
            </Info>
            <Info>
              <InfoText>충전유형</InfoText>
              <InfoDetail>{info.type}</InfoDetail>
            </Info>
            <Info>
              <InfoText>시설구분</InfoText>
              <InfoDetail>{info.sub_category}</InfoDetail>
            </Info>
        </ul>
      </InfoDiv>
    </RightDiv>
  )
}