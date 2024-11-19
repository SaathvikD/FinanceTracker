import React, { useState } from 'react';

const ExpenseForm = ({ initialData = {}, onSubmit }) => {
  const [description, setDescription] = useState(initialData.description || '');
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description, amount, category });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default ExpenseForm;