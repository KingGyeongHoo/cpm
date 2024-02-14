import { styled } from 'styled-components'
import { useState, useEffect, useMemo } from 'react'
import Title from '../PageComponents/Title/Title'
import Left from '../PageComponents/Left/Left'
import Center from '../PageComponents/Map/Center'
import ChargerInfo from '../PageComponents/ChargerInfo/ChargerInfo'
import AWS from 'aws-sdk';

import Pallete from '../Pallete'

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  padding: 0% 2%;
  background-color: ${Pallete.main_font_white};
  border-bottom: 10px solid ${Pallete.main_color_light};
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: ${Pallete.side_color_light};
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
  const category = useMemo(() => [...new Set(data.map(el => el.main_category))], [data])
  const town = useMemo(() => [...new Set(data.map(el => el.town))], [data])
  return (
    <>
      <Title></Title>
      <MainContainer>
        <Left category={category} town={town} />
        <Center serverData={data} />
      </MainContainer>
      <InformationContainer>
        <ChargerInfo chargerIdArray={data.map(el => el.id.toString())} />
      </InformationContainer>
    </>
  )
}
