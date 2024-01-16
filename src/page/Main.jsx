import { styled } from 'styled-components'
import { useState } from 'react'
import Left from '../component/Left'
import Center from '../component/Center'
import Right from '../component/Right'
import Graph from '../component/Graph'
import charger from "../data/data";

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
const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  padding: 2%;
  border: 1px solid red;
`
export default function Main(){
  const category = [...new Set(charger.data.map(el => el.main_category))]
  const town = [...new Set(charger.data.map(el => el.town))]
  const [info, setInfo] = useState({})
  const useData = info.id === undefined ? [] : charger.useData.filter(el => el.id === info.id.toString())
  return (
    <>
      <TitleContainer>
        <TitleDiv>CPM</TitleDiv>
      </TitleContainer>
      <MainContainer>
        <Left category={category} town={town} />
        <Center setInfo={setInfo} />
        <Right data={charger.data} info={info} />
      </MainContainer>
      <GraphContainer>
        <Graph info={info} data={useData} />
      </GraphContainer>
    </>
  )
}
