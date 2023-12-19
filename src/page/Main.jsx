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
  const category = [...new Set(charger.data.map(el => el.main_category))]
  const town = [...new Set(charger.data.map(el => el.town))]
  const [filter, setFilter] = useState({category:'all', town:'all'})
  const [keyword, setKeyword] = useState('')
  console.log(keyword)
  const [info, setInfo] = useState({})
  return (
    <MainContainer>
      <Left category={category} town={town} setFilter={setFilter} setKeyword={setKeyword} />
      <Center originData={charger.data} setData={setData} filter={filter} info={info} setInfo={setInfo} keyword={keyword}/>
      <Right data={charger.data} info={info} />
    </MainContainer>
  )
}