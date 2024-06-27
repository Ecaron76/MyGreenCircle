"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridRowParams,
} from "@mui/x-data-grid";
import DetailsModal from "../modalDetail/Page";

interface Row {
  [key: string]: string;
}

interface DataGridComponentProps {
  rows: any[];
  columns: GridColDef[];
  getRowId: GridRowIdGetter<Row>;
  loading: boolean;
  identifier: string;
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  rows,
  columns,
  getRowId,
  loading,
  identifier,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  const handleOpen = (row: Row) => {
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
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        localeText={{ noRowsLabel: "Aucun résultat disponible" }}
        loading={loading}
        pageSizeOptions={[5, 10, 15]}
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
