import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import DetailsModal from "../modalDetail/Page";

interface DataGridComponentProps {
  rows: any;
  columns: GridColDef[];
  identifier: string;
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  columns,
  identifier,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const handleOpen = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(identifier);
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
        onRowClick={(params: GridRowParams) => handleOpen(params.row)}
      />
      <DetailsModal
        open={open}
        onClose={handleClose}
        selectedRow={selectedRow}
        identifier={identifier}
      />
    </Box>
  );
};

export default DataGridComponent;
