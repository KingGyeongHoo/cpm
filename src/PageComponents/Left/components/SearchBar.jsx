import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pallete from "../../../Pallete";

const SearchDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 5% 0;
`;
const SearchImgDiv = styled.div`
  width: 10%;
  padding: 3%;
  border-radius: 100%;
  background-color: ${Pallete.main_color_dark};
  z-index: 2;
`
const SearchBarInput = styled.input`
  width: 73%;
  height: 30%;
  border: 0px;
  border: 3px solid ${Pallete.main_color_dark};
  margin-left: -5%;
  padding:3% 0 3% 7%;
  &:focus{
    outline: none;
  }
`;
const SearchImg = styled.img`
  width: 100%;
  filter: ${Pallete.filter_white};
`;

const SearchBar = ({ filter }) => {
    const dispatch = useDispatch()
    const search = (e) => {
        const typed = e.target.value
        dispatch({ type: 'Search', payload: { ...filter, keyword: typed } })
    }

    return (
        <SearchDiv>
            <SearchImgDiv>
                <SearchImg src="https://www.svgrepo.com/show/532555/search.svg"></SearchImg>
            </SearchImgDiv>
            <SearchBarInput type="text" onChange={search}></SearchBarInput>
        </SearchDiv>
    )
}
export default SearchBar