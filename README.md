# CPM
![MainImg](https://github.com/KingGyeongHoo/cpm/assets/117385050/560145ab-d92a-46a8-91cc-a2d43afc66c0](https://github.com/KingGyeongHoo/cpm/blob/main/public/cpm.png?raw=true)
)

## 📃프로젝트 소개

**전기차, 핸드폰보다 빠르게 충전하자**

CPM은 사용 가능한 전기차 지도를 한눈에 보여주고. 충전기 이용 데이터를 제공하여 보다 효율적이고.빠른 전기차 충전을 제공하는 서비스입니다

### 📆개발 기간
**2023.12~2024.02**

## ✏목차
1. **기술 스택**
2. **주요 기능**
3. **링크**
4. **폴더 구조**

## 🛠기술 스택
- **Frontend**: <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
- **Backend**:  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
- **Deployment**: <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
- **Other Tools**: <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><img src="https://img.shields.io/badge/photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white">

## 💻주요 기능

### 필터(Filter)
- **시설구분, 충전소 위치, 충전기 타입, 검색결과 등을 바탕으로 원하는 조건 필터링**
  - Redux를 이용한 전역 상태관리를 이용해 필터를 관리하였습니다
  - 사용자가 선택한 조건에 따라 충전기를 필터링하고, 해당 조건에 부합하는 충전기만을 화면에 표시했습니다.
- **조건에 일치하는 충전기 대수 표기**
  - 사용자가 선택한 조건에 맞는 충전기의 수를 계산하여 화면에 표시하여 필터링 결과를 쉽게 파악할 수 있도록 했습니다.

### 지도(Map)
- **KakaoMap API를 사용한 지도 어플리케이션 렌더링**
  - KakaoMap API를 활용하여 지도 어플리케이션을 렌더링했습니다.
  - Marker 요소를 이용해 지도 위에 충전소 위치를 표시하고, 이벤트를 적용하여 사용자가 상호작용할 수 있도록 구현했습니다.
- **aws-sdk 및 S3를 이용한 데이터 통신 및 위치 렌더링**
  - aws-sdk를 활용하여 AWS의 S3 서비스와 통신하고, 데이터를 받아와 충전소의 위치를 지도에 렌더링했습니다.
- **충전소 클릭시 충전기명, 사용 가능 여부 표시**
  - 사용자가 선택한 조건에 부합하는 충전소들만을 지도에 표시했습니다. 이를 통해 사용자가 관심 있는 정보에 집중할 수 있도록 했습니다.
- **지도 이동 위치에 따라 상단 지역 주소 변경**
  - Kakao Map API의 지도 이동 메서드를 통해 지도를 움직일 때 마다 현재 좌표를 읽어와 useState Hook에 저장합니다.
  - useEffect Hook을 이용해 주소가 바뀔 때 마다 지도 위에 현재 주소를 렌더링 했습니다.

### 충전소 정보(ChargerInfo)
- **지도에서 충전기 클릭시 각종 정보 확인**
  - 사용자가 지도에서 특정 충전기를 클릭하면 해당 충전기에 관한 다양한 정보(충전기명, 사용 가능 여부 등)를 Modal 형태로 표시합니다.
  - 클릭한 충전기의 정보를 동적으로 불러와 사용자가 필요로 하는 정보를 즉시 확인할 수 있도록 구현했습니다.
- **Redux를 이용한 전역 상태 관리를 통해 충전기 선택시 정보 변경**
  - Redux를 활용하여 전역 상태를 관리하고, 사용자가 특정 충전기를 선택할 때마다 상태를 업데이트하여 해당 충전기의 정보를 동기화 했습니다.
  - 선택한 충전기의 정보가 어플리케이션 내의 여러 컴포넌트(지도, 분석 등)에서 공유되고 동시에 반영되도록 구현했습니다.

### 이용률 분석 (Usage)
- **Recharts 라이브러리를 이용한 데이터 시각화**
  - Recharts 라이브러리를 통해 다양한 그래픽 요소와 차트 유형을 이용하여 데이터를 직관적으로 시각화 했습니다.
  - 데이터 시각화를 위해 Recharts의 컴포넌트 및 기능을 사용하여 다양한 그래프를 생성하고, 사용자가 원하는 차트 스타일 및 옵션을 선택할 수 있도록 구현했습니다.
- **각 충전소의 요일별, 일별 이용률을 그래프를 통해 시각화**
  - 사용자가 특정 충전소의 이용률을 쉽게 파악할 수 있도록 다양한 그래프 유형을 활용하여 데이터를 시각화했습니다.
- **Custom Graph를 통해 필요한 정보만 표기**
  - 사용자가 필요로 하는 정보만을 그래프에 표기하여 불필요한 정보를 최소화했습니다.
  - 그래프의 디자인과 내용을 사용자 요구에 맞추어 커스터마이징하여 가독성을 높였습니다.
- **Redux를 이용한 전역 상태 관리를 통해 필터별, 충전소별 그래프 데이터 변경**
  - Redux를 활용하여 전역 상태를 관리하고, 사용자가 선택한 필터 및 조건에 따라 실시간으로 그래프 데이터를 동적으로 변경했습니다.
  - 사용자가 필터를 조정하거나 새로운 데이터를 요청할 때 Redux를 통해 상태를 업데이트하여 그래프를 즉시 반영하도록 구현했습니다.

### 통계(Statistics)
- **선택한 충전소와 전체 충전소의 데이터 비교**
  - 불필요한 연산을 막기 위해 useMemo Hook을 이용해 페이지가 렌더링 될 때 전체 데이터 연산을 실행하고, 더이상 실행되지 않도록 했습니다.
  - 연산된 전체 데이터와 선택한 충전소의 데이터를 시각적으로 비교하여 사용자가 직관적으로 비교할 수 있게 만들었습니다.
- **연간 이용량 표기 및 전체 순위 표시**
  - 연간 이용량 데이터를 수집하여 각 충전소의 이용량을 시각적으로 표기하고, 전체 충전소 중 해당 충전소의 순위를 표시합니다.
  - 사용자가 특정 충전소의 이용량을 파악하고, 해당 충전소가 전체 충전소 중 어떤 위치에 있는지 쉽게 확인할 수 있습니다.

## 📎링크
### [배포](https://cpm-map.netlify.app/)

## 📁폴더 구조
```
📦src
 ┣ 📂PageComponents
 ┃ ┣ 📂ChargerInfo
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜InfoDailyUsage.jsx
 ┃ ┃ ┃ ┣ 📜InfoInformation.jsx
 ┃ ┃ ┃ ┣ 📜InfoMonthlyUsage.jsx
 ┃ ┃ ┃ ┣ 📜InfoStatistics.jsx
 ┃ ┃ ┃ ┗ 📜TabInformation.jsx
 ┃ ┃ ┗ 📜ChargerInfo.jsx
 ┃ ┣ 📂Left
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜FilterBox.jsx
 ┃ ┃ ┃ ┣ 📜SearchBar.jsx
 ┃ ┃ ┃ ┗ 📜TimeComponent.jsx
 ┃ ┃ ┗ 📜Left.jsx
 ┃ ┣ 📂Map
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜AllChargersInfo.jsx
 ┃ ┃ ┃ ┗ 📜Map.jsx
 ┃ ┃ ┗ 📜Center.jsx
 ┃ ┗ 📂Title
 ┃ ┃ ┗ 📜Title.jsx
 ┣ 📂page
 ┃ ┗ 📜Main.jsx
 ┣ 📂redux
 ┃ ┣ 📜reducer.jsx
 ┃ ┗ 📜store.jsx
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜Pallete.jsx
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
  ```
