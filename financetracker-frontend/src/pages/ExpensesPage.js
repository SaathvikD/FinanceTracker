import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ExpenseForm from '../components/ExpenseForm';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null); // Track the expense to edit

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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  const handleEdit = (expense) => {
    setEditExpense(expense); // Set the expense to edit
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

  return (
    <div className="container mt-5">
      <h2>Expenses</h2>
      <table className="table">
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