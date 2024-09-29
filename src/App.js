import React, { useState } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState([{ id: 1, sign: "+", value: 0, enabled: true }]);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, sign: "+", value: 0, enabled: true };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleDisableRow = (id) => {
    setRows(rows.map(row => row.id === id ? { ...row, enabled: !row.enabled } : row));
  };

  const handleValueChange = (id, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, value: parseFloat(value) || 0 } : row));
  };

  const handleSignChange = (id, sign) => {
    setRows(rows.map(row => row.id === id ? { ...row, sign } : row));
  };

  const calculateResult = () => {
    return rows.reduce((total, row) => {
      if (row.enabled) {
        return row.sign === "+" ? total + row.value : total - row.value;
      }
      return total;
    }, 0);
  };

  return (
    <div className="app">
      <h1>React Calculator</h1>
      <button onClick={handleAddRow}>Add Row</button>
      <ul>
        {rows.map((row) => (
          <li key={row.id} className={row.enabled ? "enabled" : "disabled"}>
            <select
              value={row.sign}
              onChange={(e) => handleSignChange(row.id, e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="number"
              value={row.value}
              onChange={(e) => handleValueChange(row.id, e.target.value)}
              disabled={!row.enabled}
            />
            <button onClick={() => handleRemoveRow(row.id)}>Delete</button>
            <button onClick={() => handleDisableRow(row.id)}>
              {row.enabled ? "Disable" : "Enable"}
            </button>
          </li>
        ))}
      </ul>
      <div className="result">
        Result: {calculateResult()}
      </div>
    </div>
  );
}

export default App;
