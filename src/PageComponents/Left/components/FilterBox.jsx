import { styled } from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Pallete from "../../../Pallete";

const FilterOptionDiv = styled.div`
  font-family: 'TheJamsil5Bold';
  font-weight: 100;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  margin: 3% 0;
  padding: 5% 3%;
`
const IndexDiv = styled.div`
  width: 99%;
  font-weight: bold;
  text-align: left;
  padding-left: 1%;
  margin-bottom: 4%;
  color: ${Pallete.main_color_dark};
  border-left: 4px solid ${Pallete.main_color_dark};
`
const FilterSelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 96%;
  border: 2px solid ${Pallete.main_color_dark};
  border-radius: 20px;
  padding: 5% 2%;
`
const FilterOptionButton = styled.div`
  display:flex;
  width: 83%;
  padding-left: 2%;
  align-items: center;
  color: ${Pallete.main_color_dark};
`
const FilterBoxArrow = styled.div`
  display:flex;
  width: 15%;
  align-items: center;
  justify-content: center;
`
const FilterComboOptionUl = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  top: 90%;
  left: 50%; /* 왼쪽 위치를 50%로 설정하여 부모 요소의 중앙에 위치 */
  transform: translateX(-50%); 
  width: 96%;
  border-radius: 20px;
  padding: 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  background-color: ${Pallete.main_color_light};
  transition: opacity 0.3s ease-in-out;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  z-index: ${props => props.open ? 10 : 0};
`
const FilterComboOptionList = styled.li`
  width: 92%;
  padding: 4%;
  color: ${Pallete.main_font_white};
  list-style-type: none;
  border-bottom: 1px dashed ${Pallete.main_font_white};
  &:hover{
    background-color: ${Pallete.main_color_dark};
  }
  &:first-child{
    margin: 0;
    padding-top: 4%; 
  }
  &:last-child{
    margin: 0;
    padding-bottom: 4%; 
    border-bottom: none;
  }
`

const FilterBox = ({data, settingInfo, filter, click}) => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [text, setText] = useState('전체')

    const clickEvent = (e) => {
      const value = e.target.textContent
      setText(value)
      if (settingInfo) {
        if (value !== '전체') {
          dispatch({ type: settingInfo.selectSomething, payload: { ...filter, [settingInfo.changeValue]: value } })
        } else {
          dispatch({ type: settingInfo.selectAll, payload: { ...filter, [settingInfo.changeValue]: '' } })
        }
      } else {
        click(value)
      }
      setOpen(false)
    }
    console.log(settingInfo)
    return(
      <FilterOptionDiv>
        {settingInfo ? <IndexDiv>{settingInfo.type}</IndexDiv> : ''}
        <FilterSelectDiv onClick={() => setOpen(!open)}>
          <FilterOptionButton>{text}</FilterOptionButton>
          <FilterBoxArrow>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </FilterBoxArrow>
        </FilterSelectDiv>
        <FilterComboOptionUl open={open}>
          {settingInfo ?  <FilterComboOptionList onClick={clickEvent}>전체</FilterComboOptionList> : ''}
          {data.map(el => <FilterComboOptionList onClick={clickEvent}>{el}</FilterComboOptionList>)}
        </FilterComboOptionUl>
      </FilterOptionDiv>
    )
  }
  export default FilterBox