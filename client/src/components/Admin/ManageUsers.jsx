import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../utils/api_call";
import auth from "../../utils/auth";
import Layout from "./Layout";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";

function AdminHome() {
  //const navigate = useNavigate();
  //useEffect(() => {
  //  if (!auth.checkAdmin()) {
  //    navigate("/");
  //  }
  //}, []);

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    api.get("/user/all").then(({ data }) => {
      setUsers(data);
    });
  }
  function deactivate(row) {
    api.post("/user/deactivate", { id: row.id }).then(({ data }) => {
      getUsers();
    });
  }
  function activate(row) {
    api.post("/user/activate", { id: row.id }).then(({ data }) => {
      getUsers();
    });
  }
  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1,
      sortable: true,
    },
    {
      name: "FullName",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Deactivate",
      selector: (row) =>
        row.active ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => deactivate(row)}
            color="primary"
          >
            Deactivate
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => activate(row)}
            color="success"
          >
            Activate
          </Button>
        ),
      sortable: true,
    },
  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = Users.filter(
    (item) =>
      item.firstname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastname.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        className="form-control"
        type="search"
        onChange={(e) => setFilterText(e.target.value)}
        //onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <Layout />
      <main class="mt-4 mx-lg-5">
        <div class="container-fluid ">
          <div className="row">
            <div className="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <DataTable
                    columns={columns}
                    //data={Users}
                    pagination
                    title="Users List"
                    data={filteredItems}
                    //paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    selectableRows
                    //persistTableHead
                    paginationComponentOptions={{
                      rowsPerPageText: "Filas por página",
                      rangeSeparatorText: "de",
                      selectAllRowsItem: true,
                      selectAllRowsItemText: "Todos",
                      rowsPerPageText: "2",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AdminHome;
