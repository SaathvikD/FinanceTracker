import React, { useState, useEffect } from 'react';
import api from '../api/api';

const DashboardPage = () => {
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    fetchDailySummary();
  }, []);

  const fetchDailySummary = async () => {
    try {
      const response = await api.get('/expenses');
      const expenses = response.data;

      const summary = expenses.reduce((acc, expense) => {
        const date = new Date(expense.date).toLocaleDateString();
        if (!acc[date]) acc[date] = { total: 0, details: [] };
        acc[date].total += parseFloat(expense.amount);
        acc[date].details.push(expense);
        return acc;
      }, {});

      setDailySummary(Object.entries(summary));
    } catch (err) {
      console.error('Error fetching daily summary:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="mt-4">
        {dailySummary.map(([date, { total, details }]) => (
          <div key={date} className="mb-4">
            <h4>{date}</h4>
            <p>Total Expenditure: ${total.toFixed(2)}</p>
            <details>
              <summary>View Details</summary>
              <ul>
                {details.map((expense) => (
                  <li key={expense.id}>
                    {expense.description} - ${expense.amount} ({expense.category})
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;