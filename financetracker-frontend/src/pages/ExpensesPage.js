import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ExpenseForm from '../components/ExpenseForm';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      await api.post('/expenses', newExpense);
      fetchExpenses(); // Refresh the list after adding
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense);
  };

  const handleSave = async (updatedExpense) => {
    try {
      await api.put(`/expenses/${editExpense.id}`, updatedExpense);
      setEditExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error('Error updating expense:', err);
    }
  };

  const handleFilter = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await api.get(`/expenses/filter?${query}`);
      setExpenses(response.data);
    } catch (err) {
      console.error('Error filtering expenses:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Expenses</h2>
      <div className="mb-3">
        <h3>Filters</h3>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleFilter}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(expense)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editExpense ? (
        <div>
          <h3>Edit Expense</h3>
          <ExpenseForm initialData={editExpense} onSubmit={handleSave} />
        </div>
      ) : (
        <div>
          <h3>Add New Expense</h3>
          <ExpenseForm onSubmit={handleAddExpense} />
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;