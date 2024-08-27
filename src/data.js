// data.js
const initialData = [
    {
      id: 1,
      category: "CSPM Executive Dashboard",
      chartType: "Donut Chart",
      widgets: [
        {
          id: 1,
          name: "Cloud Accounts",
          labels: ["Connected", "Not Connected"],
          chartData: [2, 2],
        },
        {
          id: 2,
          name: "Cloud Account Risk Assessment",
          labels: ["Failed", "Warning", "Not Available", "Passed"],
          chartData: [1689, 681, 36, 7253],
        },
      ],
    },
    {
      id: 2,
      category: "CWPP Dashboard",
      widgets: [
        {
          id: 3,
          name: "Top 5 Namespace Specific Alerts",
          content: "No graph data available!",
        },
        {
          id: 4,
          name: "Workload Alerts",
          content: "No graph data available!",
        },
      ],
    },
    {
      id: 3,
      category: "Registry Scan",
      chartType: "Horizontal Stacked Chart",
      widgets: [
        {
          id: 5,
          name: "Image Risk Assessment",
          labels: ["Critical", "High", "Moderate", "Low", "None"],
          chartData: [9, 150, 702, 477, 132],
        },
        {
          id: 6,
          name: "Image Security Issues",
          labels: ["Critical", "High", "Moderate", "Low", "None"],
          chartData: [2, 2, 2, 1, 1],
        },
      ],
    },
  ];
  
  export default initialData;
  