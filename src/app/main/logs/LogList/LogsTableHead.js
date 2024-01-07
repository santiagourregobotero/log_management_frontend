import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { lighten, styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";

const rows = [
  {
    id: "id",
    align: "left",
    disablePadding: false,
    label: "ID",
    sort: true,
    width: 100,
  },
  {
    id: "timestamp",
    align: "left",
    disablePadding: false,
    label: "Date & Time",
    sort: true,
    width: 300,
  },
  {
    id: "message",
    align: "left",
    disablePadding: false,
    label: "Message",
    sort: true,
  },
  {
    id: "severity",
    align: "left",
    disablePadding: false,
    label: "Severity",
    sort: true,
    width: 100,
  },
  {
    id: "source",
    align: "left",
    disablePadding: false,
    label: "Source",
    sort: true,
    width: 100,
  },
];

const LogTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    fontWeight: "lighter !important",
    background: "white",
  },
  borderBottom: "1px solid #888",
}));

function LogsTableHead(props) {
  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  // const {onSelectAllClick, Log, LogBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-36 sm:h-48">
        {rows.map((row) => {
          return (
            <LogTableHeaderCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              style={{ width: row.width }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </LogTableHeaderCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default LogsTableHead;
