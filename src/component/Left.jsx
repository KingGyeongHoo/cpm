import { styled } from "styled-components";
import { useState, useEffect } from "react";

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  padding: 1%;
  border: 1px solid blue;
`;
const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid red;
`;
const SearchBar = styled.input`
  width: 80%;
`;
const SearchImg = styled.img`
  width: 10%;
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 0;
  border: 1px solid yellow;
`;
const FilterCombobox = styled.select`
  width: 100%;
  margin: 5% 0;
`;
const TimeDiv = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid orange;
`;

export default function Left() {
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

  return (
    <LeftDiv>
      <SearchDiv>
        <SearchBar type="text"></SearchBar>
        <SearchImg src="https://www.svgrepo.com/show/532555/search.svg"></SearchImg>
      </SearchDiv>
      <FilterDiv>
        <FilterCombobox>
          <option value="none">시설구분별</option>
        </FilterCombobox>
        <FilterCombobox>
          <option value="none">지역별</option>
        </FilterCombobox>
        <FilterCombobox>
          <option value="none">요일별</option>
        </FilterCombobox>
      </FilterDiv>
      <TimeDiv>{now}</TimeDiv>
    </LeftDiv>
  );
}
