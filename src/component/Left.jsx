import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 1%;
`;
const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  padding: 5% 0;
`;
const SearchBar = styled.input`
  width: 80%;
  border: 0px;
  border-bottom: 3px solid #015aae;
  &:focus{
    outline: none;
  }
`;
const SearchImg = styled.img`
  width: 10%;
  filter: invert(23%) sepia(95%) saturate(1263%) hue-rotate(188deg) brightness(100%) contrast(108%);
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 0;
`;
export const FilterCombobox = styled.select`
  width: 100%;
  margin: 5% 0;
  padding: 5% 0;
  border: none;
  border-bottom: 3px solid #015aae;
  &:focus{
    outline: none;
  }
`;
export const FilterComboOption = styled.option`
  color: black;
  border: 1px solid #015aae;
  &:focus{
    outline: 1px solid #015aae;
  }
`
const TimeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize}px;
  width: 100%;
  padding: 20% 0;
  border: 2px solid #015aae;
`;

export default function Left({category, town}) {
  const [now, setNow] = useState();

  const date = new Date();
  const getNow = () => {
    const year = date.getFullYear().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    setNow(`${year}.${month}.${day} ${hour}:${minute}:${second}`);
  };
  useEffect(() => {
    const intervalId = setTimeout(() => {
      getNow();
    }, 1000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [now]);
  useEffect(() => {
    
  })
  const dispatch = useDispatch()
  const filter = useSelector(state => state)
  let select_category = document.getElementById('select_category')
  const setDataByCategory = (e) => {
    const value = select_category.options[select_category.selectedIndex].value
    if(value !== 'all'){
      dispatch({type:'SelectCategory', payload:{...filter, category: value}})
    } else {
      dispatch({type:'AllCategory', payload:{...filter, category: ''}})
    }
  }
  let select_town = document.getElementById('select_town')
  const setDataByTown = (e) => {
    const value = select_town.options[select_town.selectedIndex].value
    if(value !== 'all'){
      dispatch({type:'SelectTown', payload:{...filter, town: value}})
    } else {
      dispatch({type:'AllTown', payload:{...filter, town: ''}})
    }
  }
  
  const search = (e) => {
    const typed = e.target.value
    dispatch({type:'Search', payload:{...filter, keyword: typed}})
  }

  const [windowSize, setWindowSize] = useState(window.innerWidth)
  useEffect(() => {
    setWindowSize(window.innerWidth/100 + 5)
  }, [window.innerWidth])
  return (
    <LeftDiv>
      <SearchDiv>
        <SearchImg src="https://www.svgrepo.com/show/532555/search.svg"></SearchImg>
        <SearchBar type="text" onChange={search}></SearchBar>
      </SearchDiv>
      <FilterDiv>
        <FilterCombobox id='select_category' onChange={setDataByCategory}>
          <FilterComboOption value="all">시설 구분</FilterComboOption>
          {category.map(el => <FilterComboOption value={el} key={el}>{el}</FilterComboOption>)}
        </FilterCombobox>
        <FilterCombobox id='select_town' onChange={setDataByTown}>
          <FilterComboOption value="all">지역</FilterComboOption>
          {town.map(el => <FilterComboOption value={el} key={el}>{el}</FilterComboOption>)}
        </FilterCombobox>
      </FilterDiv>
      <TimeDiv fontSize={windowSize}>{now}</TimeDiv>
    </LeftDiv>
  );
}
