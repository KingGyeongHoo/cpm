import { styled } from 'styled-components'

import Pallete from '../../Pallete'

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f0ecdc;
  border-bottom: 10px solid ${Pallete.main_font_dark};
`
const TitleDiv = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1%;
  border-radius: 50%;
`
const TitleLogo = styled.img`
    width: 100%;
`

export default function Title(){
    return(
        <TitleContainer>
            <TitleDiv> 
                <TitleLogo src={process.env.PUBLIC_URL + '/cpm_logo_2.png'}></TitleLogo>
            </TitleDiv> 
        </TitleContainer>
    )
}