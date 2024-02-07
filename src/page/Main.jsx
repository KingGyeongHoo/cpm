import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import Left from '../component/Left'
import Center from '../component/Center'
import ChargerInfo from '../component/ChargerInfo'
import AWS from 'aws-sdk';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  padding: 2%;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
`
const TitleDiv = styled.div`
  width: 10%;
  font-size: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 1px #015aae;
  margin-bottom: 1%;
`
const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  border: 1px solid red;
`
export default function Main(){
  const [data, setData] = useState([]);

  useEffect(() => {
    // AWS 설정
    AWS.config.update({
      region: process.env.REACT_APP_region,
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey
    });

    // S3 객체 생성
    const s3 = new AWS.S3();
 
    // S3에서 파일 읽기
    const params = { Bucket: 'chargers-list/chargers', Key: 'chargers.json' };

    s3.getObject(params, (err, result) => {
      if (err) {
        console.error('Error fetching data from S3:', err);
      } else {
        const fileContent = result.Body.toString('utf-8');
        const parsedData = JSON.parse(fileContent);
        setData(parsedData);
      }
    });
  }, []); // useEffect는 최초 렌더링 시에만 호출되도록 빈 배열을 전달
  const category = [...new Set(data.map(el => el.main_category))]
  const town = [...new Set(data.map(el => el.town))]
  return (
    <>
      <TitleContainer>
        <TitleDiv>CPM</TitleDiv>
      </TitleContainer>
      <MainContainer>
        <Left category={category} town={town} />
        <Center serverData={data} />
        {/* <Right /> */}
      </MainContainer>
      <InformationContainer>
        <ChargerInfo chargerIdArray={data.map(el => el.id.toString())} />
      </InformationContainer>
    </>
  )
}
