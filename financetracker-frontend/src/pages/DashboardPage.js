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

      // Convert the summary object to an array of entries for easier rendering
      setDailySummary(Object.entries(summary));
    } catch (err) {
      console.error('Error fetching daily summary:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard</h2>
      {dailySummary.length > 0 ? (
        <div className="mt-4">
          {dailySummary.map(([date, { total, details }]) => (
            <div key={date} className="mb-4 border rounded p-3 shadow-sm">
              <h4 className="mb-3">{date}</h4>
              <p className="mb-2">
                <strong>Total Expenditure:</strong> ${total.toFixed(2)}
              </p>
              <details>
                <summary className="mb-2 text-primary">View Details</summary>
                <ul className="mt-2">
                  {details.map((expense) => (
                    <li key={expense.id}>
                      <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)} 
                      <span className="text-muted"> ({expense.category})</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center">
          <h4>No expenses recorded yet!</h4>
          <p className="text-muted">Start adding expenses to see your daily summary here.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;