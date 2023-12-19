import { styled } from "styled-components";
import { useState, useEffect } from "react";

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
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
const FilterCombobox = styled.select`
  width: 100%;
  margin: 5% 0;
  padding: 5% 0;
  border: none;
  border-bottom: 3px solid #015aae;
  &:focus{
    outline: none;
  }
`;
const FilterComboOption = styled.option`
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
  font-size: 1.5rem;
  width: 100%;
  padding: 20% 0;
  border: 2px solid #015aae;
`;

export default function Left({category, town, setFilter, setKeyword}) {
  const [now, setNow] = useState();

  const date = new Date();
  const getNow = () => {
    const year = date.getFullYear().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDay().toString().padStart(2, "0");
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
  let select_category = document.getElementById('select_category')
  const setDataByCategory = (e) => {
    const value = select_category.options[select_category.selectedIndex].value
    if(value !== 'all'){
      setFilter(newFilter => ({...newFilter, category: value}))
    } else {
      setFilter(newFilter => ({...newFilter, category: 'all'}))
    }
  }
  let select_town = document.getElementById('select_town')
  const setDataByTown = (e) => {
    const value = select_town.options[select_town.selectedIndex].value
    if(value !== 'all'){
      setFilter(newFilter => ({...newFilter, town: value}))
    } else {
      setFilter(newFilter => ({...newFilter, town: 'all'}))
    }
  }
  
  const search = (e) => {
    setKeyword(e.target.value)
  }


  return (
    <LeftDiv>
      <SearchDiv>
        <SearchImg src="https://www.svgrepo.com/show/532555/search.svg"></SearchImg>
        <SearchBar type="text" onChange={search}></SearchBar>
      </SearchDiv>
      <FilterDiv>
        <FilterCombobox id='select_category' onChange={setDataByCategory}>
          <FilterComboOption value="all">전체</FilterComboOption>
          {category.map(el => <FilterComboOption value={el}>{el}</FilterComboOption>)}
        </FilterCombobox>
        <FilterCombobox id='select_town' onChange={setDataByTown}>
          <FilterComboOption value="all">전체</FilterComboOption>
          {town.map(el => <FilterComboOption value={el}>{el}</FilterComboOption>)}
        </FilterCombobox>
        <FilterCombobox>
          <FilterComboOption value="none">요일별</FilterComboOption>
        </FilterCombobox>
      </FilterDiv>
      <TimeDiv>{now}</TimeDiv>
    </LeftDiv>
  );
}
