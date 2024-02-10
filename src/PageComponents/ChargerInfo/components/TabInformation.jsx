import { useSelector } from "react-redux";

import InfoInformation from "./InfoInformation";
import InfoDailyUsage from "./InfoDailyUsage";
import InfoMonthlyUsage from "./InfoMonthlyUsage";
import InfoStatistics from "./InfoStatistics";

export default function TabInformation({ data, charger_sorted }) {
  const idx = useSelector((state) => state.idxReducer);
  switch (idx) {
    case 0:
      return <InfoInformation></InfoInformation>
    case 1:
      return <InfoDailyUsage data={data}></InfoDailyUsage>
    case 2:
      return <InfoMonthlyUsage data={data}></InfoMonthlyUsage>
    case 3:
      return (
        <InfoStatistics data={data} charger_sorted={charger_sorted}></InfoStatistics>
      )
    default:
      <></>;
  }
}
