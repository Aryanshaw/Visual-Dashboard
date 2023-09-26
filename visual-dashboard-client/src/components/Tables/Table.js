import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DataTable = ({ data }) => {
  const getUniqueValues = (data, key) => {
    const uniqueValues = new Set();
    return data.filter((item) => {
      if (!uniqueValues.has(item[key])) {
        uniqueValues.add(item[key]);
        return true;
      }
      return false;
    });
  };

  const uniqueData = getUniqueValues(data, "sector");

  return (
    <TableContainer
      component={Paper}
      style={{ overflow: "auto", width: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sector</TableCell>
            <TableCell>Intensity</TableCell>
            <TableCell>Likelihood</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.sector}</TableCell>
              <TableCell>{item.intensity}</TableCell>
              <TableCell>{item.likelihood}</TableCell>
              <TableCell>{item.topic}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
