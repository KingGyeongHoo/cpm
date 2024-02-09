import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Pallete from "../../../Pallete";

const TimeDiv = styled.div`
  font-family: 'DOSIyagiMedium';
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize}px;
  width: 100%;
  padding: 20% 0;
  background-color: ${Pallete.main_color_dark};
  color: ${Pallete.main_font_white};
  border: 2px solid ${Pallete.main_color_dark};
  border-radius: 10px;
`;

const TimeComponent = () => {
    const [now, setNow] = useState(new Date());
    const formatDate = (date) => {
      const year = date.getFullYear().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");
      const second = date.getSeconds().toString().padStart(2, "0");
      return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    return <TimeDiv fontSize={window.innerWidth / 100 + 10}>{formatDate(now)}</TimeDiv>;
  }
  export default TimeComponent