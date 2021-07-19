import LineChart from "./LineChart"
export default function CumulativeChart(props) {
    return LineChart(props, ["newcases"], ["Daily Count vs Time", "Count", "Date"], ["#222629"]);
  }