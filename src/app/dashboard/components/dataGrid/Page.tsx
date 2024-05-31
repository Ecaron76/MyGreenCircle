import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function DataGridComponent({ rows, columns }: any) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default DataGridComponent;
