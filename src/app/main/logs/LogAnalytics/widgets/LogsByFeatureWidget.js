import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as dayjs from "dayjs";
import "dayjs/locale/en";
import { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogAnalyticsByFeature,
  selectLogsEndDateFilter,
  selectLogsSeverityFilter,
  selectLogsSourceFilter,
  selectLogsStartDateFilter,
} from "../../store/analyticsSlice";
import raw_data from "./data.json";
dayjs.locale("en");

const widgets_data = raw_data.severity;

function LogsByFeatureWidget({ feature, title, colors }) {
  // const { series, labels, uniqueVisitors } = widgets_data;
  const [total, setTotal] = useState(0);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const [awaitRender, setAwaitRender] = useState(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const severityText = useSelector(selectLogsSeverityFilter);
  const sourceText = useSelector(selectLogsSourceFilter);
  const startDate = useSelector(selectLogsStartDateFilter);
  const endDate = useSelector(selectLogsEndDateFilter);
  const dataPeriod = startDate == null ? null : endDate.diff(startDate, "day");
  dayjs().diff;
  const chartOptions = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "donut",
      sparkline: {
        enabled: true,
      },
    },
    colors: colors,
    labels,
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: "70%",
        },
      },
    },
    stroke: {
      colors: [theme.palette.background.paper],
    },
    series,
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: "dark",
      custom: ({ seriesIndex, w }) =>
        `<div class="flex items-center h-32 min-h-32 max-h-23 px-12">
            <div class="w-12 h-12 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`,
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  const processData = (data) => {
    setLabels(data.map((value, index) => value[feature]));
    setTotal(data.reduce((sum, value) => sum + value["count"], 0));
    setSeries(data.map((value, index) => value["count"]));
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        getLogAnalyticsByFeature({
          severityText,
          sourceText,
          startDate,
          endDate,
          constraint: feature,
        })
      );
      console.log("fetched data", data);
      processData(data.payload);
    };
    fetchData();
  }, [dispatch, severityText, sourceText, startDate, endDate]);
  if (awaitRender) {
    return null;
  }
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-24">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          {title}
        </Typography>
        <div className="ml-8">
          <Chip
            size="small"
            className="font-medium text-sm"
            label={dataPeriod == null ? "FULL" : ` ${dataPeriod} days `}
          />
        </div>
      </div>

      <div className="flex flex-col flex-auto mt-24 h-192">
        <ReactApexChart
          className="flex flex-auto items-center justify-center w-full h-full"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
      <div className="mt-32">
        <div className="-my-12 divide-y">
          {series.map((dataset, i) => (
            <div className="grid grid-cols-3 py-12" key={i}>
              <div className="flex items-center">
                <Box
                  className="flex-0 w-8 h-8 rounded-full"
                  sx={{ backgroundColor: chartOptions.colors[i] }}
                />
                <Typography className="ml-12 truncate">{labels[i]}</Typography>
              </div>
              <Typography className="font-medium text-right">
                {dataset}
              </Typography>
              <Typography className="text-right" color="text.secondary">
                {((dataset / total) * 100).toLocaleString("en-US")}%
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

export default memo(LogsByFeatureWidget);
