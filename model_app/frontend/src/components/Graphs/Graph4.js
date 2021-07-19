import LineChart from "./LineChart"
export default function Graph4(props) {
    return LineChart(props, ["normal", "asym", "mild", "critical", "recovered"], ["Daily Infection Breakdown", "Count", "Date"], ["yellow", "orange", "blue", "grey", "purple"]);
}

/*
'normal': 10,
'asym': 0,
'mild': 0,
'critical': 0,
'recovered': 0
*/