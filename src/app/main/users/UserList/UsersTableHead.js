import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { lighten, styled } from "@mui/material/styles";
import { useState } from "react";
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
    id: "name",
    align: "left",
    disablePadding: false,
    label: "Name",
    sort: true,
    width: 300,
  },
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "Email",
    sort: true,
  },
];

const UserTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    fontWeight: "lighter !important",
    background: "white",
  },
  borderBottom: "1px solid #888",
}));

function UsersTableHead(props) {
  const { selectedUserIds } = props;
  const numSelected = selectedUserIds.length;

  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedUsersMenu(event) {
    setSelectedUsersMenu(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setSelectedUsersMenu(null);
  }

  // const {onSelectAllClick, User, UserBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-36 sm:h-48">
        {rows.map((row) => {
          return (
            <UserTableHeaderCell
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
                props.User.id === row.id ? props.User.direction : false
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
                    active={props.User.id === row.id}
                    direction={props.User.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </UserTableHeaderCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
