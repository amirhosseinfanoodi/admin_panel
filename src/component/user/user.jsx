import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

async function fetchData() {
  const url = 'https://paneladminmui-default-rtdb.firebaseio.com/user.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function deleteData(id) {
  const url = `https://paneladminmui-default-rtdb.firebaseio.com/user/${id}.json`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete data');
    }
    return true;
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
  }
}

async function updateData(id, updatedData) {
  const url = `https://paneladminmui-default-rtdb.firebaseio.com/user/${id}.json`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    return true;
  } catch (error) {
    console.error('Error updating data:', error);
    return false;
  }
}

export default function User() {
  const [rows, setRows] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    createdAt: '',
  });

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      if (data) {
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          email: data[key].email,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          password: data[key].password,
          createdAt: data[key].created_at,
        }));
        setRows(formattedData);
      }
    }

    getData();
  }, []);

  const handleEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      email: row.email,
      firstName: row.firstName,
      lastName: row.lastName,
      password: row.password,
      createdAt: row.createdAt,
    });
  };

  const handleDelete = async (id) => {
    const success = await deleteData(id);
    if (success) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    const success = await updateData(editingId, formData);
    if (success) {
      setRows(rows.map(row => (row.id === editingId ? { ...row, ...formData } : row)));
      setEditingId(null);
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        createdAt: '',
      });
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.email}
                </StyledTableCell>
                <StyledTableCell align="right">{row.firstName}</StyledTableCell>
                <StyledTableCell align="right">{row.lastName}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleEdit(row)}><ModeEditIcon /></Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => handleDelete(row.id)}><DeleteIcon /></Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingId && (
        <Box component="form" sx={{ mt: 4, maxWidth: 600, margin: 'auto' }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Created At"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            margin="normal"
            required
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={handleUpdate} variant="contained" color="primary" sx={{ mt: 2 }}>
            Update
          </Button>
        </Box>
      )}
    </div>
  );
}