import React, { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { isValidUrl, isValidShortcode } from "../utils/validators";

export default function UrlForm({ onSubmit }) {
  const [rows, setRows] = useState([{ longUrl: "", validity: "", shortcode: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < 5) {
      setRows([...rows, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const errors = [];
    for (let row of rows) {
      if (!isValidUrl(row.longUrl)) {
        errors.push(`Invalid URL: ${row.longUrl}`);
      }
      if (row.shortcode && !isValidShortcode(row.shortcode)) {
        errors.push(`Invalid shortcode: ${row.shortcode}`);
      }
    }
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    onSubmit(rows);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      {rows.map((row, i) => (
        <Grid container spacing={2} key={i} sx={{ marginBottom: 2 }}>
          <Grid item xs={5}>
            <TextField
              label="Original URL"
              value={row.longUrl}
              fullWidth
              onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Validity (minutes)"
              type="number"
              value={row.validity}
              fullWidth
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Shortcode"
              value={row.shortcode}
              fullWidth
              onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addRow} disabled={rows.length >= 5}>
        Add Another URL
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten URLs
      </Button>
    </Paper>
  );
}
