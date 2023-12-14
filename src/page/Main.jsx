import { styled } from 'styled-components'
import { useState, useEffect } from 'react'
import Left from '../component/Left'
import Center from '../component/Center'
import Right from '../component/Right'

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 96%;
  padding: 2%;
  border: 1px solid red;
`
export default function Main(){

  return (
    <MainContainer>
      <Left />
      <Center />
      <Right />
    </MainContainer>
  )
}