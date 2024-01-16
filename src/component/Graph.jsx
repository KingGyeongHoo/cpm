import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { BarChart, Bar, XAxis, YAxis , Legend } from 'recharts';

const GraphDiv = styled.div`
    width: 29%;
    padding: 1%;
    margin: 1%;
    border: 1px solid blue;
`

export default function Graph({info, data}){
    const graphData = data.filter(el => el.chargeday === "월요일")
    const sum = data.filter(el => el.chargeday === "월요일").reduce((acc, cur) => acc + cur.chargeminute, 0)
    console.log(sum)
    return(
        <>
            <GraphDiv>
                <BarChart width={300} height={300} data={data}>
                    <XAxis datakey="chargeday" />
                    <YAxis />
                    <Legend />
                    <Bar datakey="chargeminute" fill="#ffff00" />
                </BarChart>
            </GraphDiv>
            <GraphDiv></GraphDiv>
            <GraphDiv></GraphDiv>
        </>
    )
}