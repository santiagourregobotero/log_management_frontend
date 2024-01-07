import FuseLoading from "@fuse/core/FuseLoading";
import withRouter from "@fuse/core/withRouter";
import _ from "@lodash";
import { TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  selectUsers,
  selectUsersSearchText,
  userTotalCount,
} from "../store/usersSlice";
import UsersTableHead from "./UsersTableHead";

const UserTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    color: "#333",
  },
  borderBottom: "1px solid #ccc",
}));

const UserTableRow = styled(TableRow)(({ theme }) => ({
  height: "5rem !important",
}));

function UsersTable(props) {
  const dispatch = useDispatch();
  const Users = useSelector(selectUsers);
  const searchText = useSelector(selectUsersSearchText);
  const totalCount = useSelector(userTotalCount);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(Users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [User, setUser] = useState({
    direction: "asc",
    id: null,
  });

  useEffect(() => {
    dispatch(getUsers({ page, rowsPerPage, searchText })).then(() =>
      setLoading(false)
    );
  }, [dispatch, page, rowsPerPage, searchText]);

  useEffect(() => {
    setData(Users);
  }, [Users]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (User.id === property && User.direction === "desc") {
      direction = "asc";
    }

    setUser({
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
    // props.navigate(`/apps/e-commerce/Users/${item.id}`);
    props.navigate(`/user-detail/${item.id}`);
    // props.navigate(`/user-detail`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
          There are no Users!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full h-full">
      <TableContainer className="h-full">
        <Table
          stickyHeader
          className="min-w-xl sticky table"
          aria-labelledby="tableTitle"
        >
          <UsersTableHead
            selectedUserIds={selected}
            User={User}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (User.id) {
                    case "id": {
                      return parseInt(o.id, 10);
                    }
                    case "name": {
                      return o.first_name;
                    }
                    case "email": {
                      return o.email;
                    }
                    default: {
                      return o[User.id];
                    }
                  }
                },
              ],
              [User.direction]
            )
              .slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <UserTableRow
                    key={n.id}
                    className="h-72 cursor-pointer"
                    hover
                    // role="checkbox"
                    // aria-checked={isSelected}
                    // tabIndex={-1}
                    // selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    {/* <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell> */}

                    <UserTableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.id}
                    </UserTableCell>

                    <UserTableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {`${n.first_name} ${n.last_name}`}
                    </UserTableCell>

                    <UserTableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.email}
                    </UserTableCell>
                  </UserTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        className="shrink-0 bUser-t-1"
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

export default withRouter(UsersTable);
