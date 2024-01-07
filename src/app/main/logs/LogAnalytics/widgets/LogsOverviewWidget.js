import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import FuseLoading from "../../../../../@fuse/core/FuseLoading";
import {
  getLogAnalytics,
  selectLogAnalytics,
  selectLogsEndDateFilter,
  selectLogsSeverityFilter,
  selectLogsSourceFilter,
  selectLogsStartDateFilter,
} from "../../store/analyticsSlice";

import raw_data from "./data.json";
const widgets_data = raw_data.series;

const Root = styled(Paper)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

function LogsOverviewWidget() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const severityText = useSelector(selectLogsSeverityFilter);
  const sourceText = useSelector(selectLogsSourceFilter);
  const startDate = useSelector(selectLogsStartDateFilter);
  const endDate = useSelector(selectLogsEndDateFilter);

  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );

  useEffect(() => {
    dispatch(
      getLogAnalytics({
        severityText,
        sourceText,
        startDate,
        endDate,
        constraint: "timestamp__date",
      })
    );
  }, [dispatch, severityText, sourceText, startDate, endDate]);

  const data = useSelector(selectLogAnalytics);

  const chartOptions = {
    chart: {
      fontFamily: "inherit",
      foreColor: "inherit",
      width: "100%",
      height: "100%",
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [contrastTheme.palette.secondary.light],
    dataLabels: {
      enabled: false,
    },

    grid: {
      show: true,
      borderColor: contrastTheme.palette.divider,
      padding: {
        top: 0,
        bottom: -10,
        left: 30,
        right: 30,
      },
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      width: 1,
    },
    tooltip: {
      followCursor: true,
      theme: "dark",
      x: {
        format: "yyyy-MM-dd",
      },
      y: {
        formatter: (value) => `${value}`,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        stroke: {
          color: contrastTheme.palette.divider,
          dashArray: 0,
          width: 2,
        },
      },
      labels: {
        offsetY: -20,
        style: {
          colors: contrastTheme.palette.text.secondary,
        },
      },
      tickAmount: 20,
      tooltip: {
        enabled: false,
      },
      type: "datetime",
    },
    yaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      min: (min) => min - 10,
      max: (max) => max + 10,
      tickAmount: 5,
      show: false,
    },
  };

  if (data == null) return <FuseLoading />;
  return (
    <Root className="sm:col-span-2 lg:col-span-3 flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between mt-40 ml-40 mr-24 sm:mr-40">
        <div className="flex flex-col">
          <Typography className="mr-16 text-2xl md:text-3xl font-semibold tracking-tight leading-7">
            Logs Overview
          </Typography>
        </div>
      </div>

      <div className="flex flex-col flex-auto h-320">
        <ReactApexChart
          options={chartOptions}
          series={data}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
    </Root>
  );
}

export default LogsOverviewWidget;
