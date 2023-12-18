import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import Left from '../component/Left'
import Center from '../component/Center'
import Right from '../component/Right'
import charger from "../data/data";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 96%;
  padding: 2%;
  border: 1px solid red;
`
export default function Main(){
  const [data, setData] = useState(charger.data)
  const [category, setCategory] = useState([...new Set(charger.data.map(el => el.sub_category))])
  const [info, setInfo] = useState({})
  return (
    <MainContainer>
      <Left data={charger.data} setData={setData} category={category} />
      <Center data={data} setData={setData} setInfo={setInfo} />
      <Right data={charger.data} info={info} />
    </MainContainer>
  )
}