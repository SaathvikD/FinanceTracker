import React, { useState, useEffect } from 'react';
import api from '../api/api';

const DashboardPage = () => {
  const [dailyExpenses, setDailyExpenses] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      const groupedExpenses = groupByDate(response.data);
      setDailyExpenses(groupedExpenses);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const groupByDate = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(expense);
      return acc;
    }, {});
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <h3>Daily Totals</h3>
          <ul className="list-group">
            {Object.keys(dailyExpenses).map((date) => (
              <li
                key={date}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => setSelectedDate(date)}
                style={{ cursor: 'pointer' }}
              >
                {date}
                <span className="badge bg-primary rounded-pill">
                  ${dailyExpenses[date].reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          {selectedDate && (
            <>
              <h3>Expenses for {selectedDate}</h3>
              <ul className="list-group">
                {dailyExpenses[selectedDate].map((expense) => (
                  <li key={expense.id} className="list-group-item">
                    <strong>{expense.description}</strong> - ${expense.amount} ({expense.category})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;