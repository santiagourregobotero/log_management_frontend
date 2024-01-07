import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import AddIcon from "@mui/icons-material/Add";
import { Fab, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogs,
  logTotalCount,
  selectLogs,
  selectLogsEndDateFilter,
  selectLogsSeverityFilter,
  selectLogsSourceFilter,
  selectLogsStartDateFilter,
} from "../store/logsSlice";
import LogsTableHead from "./LogsTableHead";

const LogTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: "#333",
  },
  borderBottom: "1px solid #ccc",
}));

const LogTableRow = styled(TableRow)(({ theme }) => ({
  height: "5rem !important",
}));

function LogsTable(props) {
  const dispatch = useDispatch();
  const Logs = useSelector(selectLogs);
  const severityText = useSelector(selectLogsSeverityFilter);
  const sourceText = useSelector(selectLogsSourceFilter);
  const startDate = useSelector(selectLogsStartDateFilter);
  const endDate = useSelector(selectLogsEndDateFilter);
  const totalCount = useSelector(logTotalCount);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(Logs);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    dispatch(
      getLogs({
        page,
        rowsPerPage,
        severityText,
        sourceText,
        startDate,
        endDate,
        order,
      })
    ).then(() => setLoading(false));
  }, [
    dispatch,
    order,
    page,
    rowsPerPage,
    severityText,
    sourceText,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    setData(Logs);
  }, [Logs]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    // props.navigate(`/apps/e-commerce/Logs/${item.id}`);
    props.navigate(`/Log-detail/${item.id}`);
    // props.navigate(`/Log-detail`);
  }

  function handleAdd() {
    props.navigate(`/Log-detail/new`);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no Logs!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full h-full">
      <div className="absolute bottom-48 right-48">
        <Fab color="primary" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </Fab>
      </div>
      <TableContainer className="h-full">
        <Table
          stickyHeader
          className="min-w-xl sticky table"
          aria-labelledby="tableTitle"
        >
          <LogsTableHead
            selectedLogIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {
              /*_.orderBy(
              data,
              [
                (o) => {
                  switch (Log.id) {
                    case "id": {
                      return parseInt(o.id, 10);
                    }
                    case "timestamp": {
                      return o.timestamp;
                    }
                    case "message": {
                      return o.message;
                    }
                    case "severity": {
                      return o.severity;
                    }
                    case "source": {
                      return o.source;
                    }
                    default: {
                      return o[Log.id];
                    }
                  }
                },
              ],
              [Log.direction]
            )*/
              data
                .slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = selected.indexOf(n.id) !== -1;
                  return (
                    <LogTableRow
                      key={n.id}
                      className="h-72 cursor-pointer"
                      hover
                      onClick={(event) => handleClick(n)}
                    >
                      <LogTableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {n.id}
                      </LogTableCell>

                      <LogTableCell
                        className="p-4 md:p-16 truncate"
                        component="th"
                        scope="row"
                      >
                        {`${dayjs(n.timestamp).format("YYYY-MM-DD hh:mm:ss")}`}
                      </LogTableCell>

                      <LogTableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {n.message}
                      </LogTableCell>

                      <LogTableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {n.severity}
                      </LogTableCell>

                      <LogTableCell
                        className="p-4 md:p-16"
                        component="th"
                        scope="row"
                      >
                        {n.source}
                      </LogTableCell>
                    </LogTableRow>
                  );
                })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="shrink-0 bLog-t-1"
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(LogsTable);
