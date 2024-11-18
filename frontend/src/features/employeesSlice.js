import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  status: 'idle',
  error: null,
};

// Acción para obtener todos los empleados
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:5000/api/employees');
  return response.data;
});

// Acción para agregar un nuevo empleado
export const addEmployee = createAsyncThunk('employees/addEmployee', async (newEmployee) => {
  const response = await axios.post('http://localhost:5000/api/employees', newEmployee);
  return response.data;
});

// Acción para actualizar un empleado
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (updatedEmployee) => {
  const response = await axios.put(`http://localhost:5000/api/employees/${updatedEmployee.id}`, updatedEmployee);
  return response.data;
});

// Acción para eliminar un empleado
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`http://localhost:5000/api/employees/${id}`);
  return id;
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        state.employees[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export default employeesSlice.reducer;
