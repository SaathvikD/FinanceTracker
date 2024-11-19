import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ExpenseForm from '../components/ExpenseForm';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
  const [isFiltered, setIsFiltered] = useState(false); // Track filter state

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
      fetchExpenses(); // Refresh expenses after adding
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
      setEditExpense(null); // Clear the edit state
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
      setIsFiltered(true); // Indicate that the list is filtered
    } catch (err) {
      console.error('Error filtering expenses:', err);
    }
  };

  const handleClearFilters = () => {
    setFilters({ category: '', startDate: '', endDate: '' });
    fetchExpenses(); // Reset to full expense list
  };

  return (
    <div className="container mt-5">
      <h2>Expenses</h2>

      {/* Add Expense Form */}
      <div>
        <h3>Add New Expense</h3>
        <ExpenseForm onSubmit={handleAddExpense} />
      </div>

      {/* Filters */}
      <div className="my-4">
        <h3>Filters</h3>
        <div className="row g-2 align-items-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
          <div className="col-md-3 d-flex gap-2">
            <button className="btn btn-primary" onClick={handleFilter}>
              Apply Filters
            </button>
            {isFiltered && (
              <button className="btn btn-secondary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
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
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editExpense && (
        <div>
          <h3>Edit Expense</h3>
          <ExpenseForm initialData={editExpense} onSubmit={handleSave} />
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;