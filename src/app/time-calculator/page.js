"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function DateCalculator() {
  const [mode, setMode]       = useState("diff");
  const [date1, setDate1]     = useState("2024-01-01");
  const [date2, setDate2]     = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStart] = useState(new Date().toISOString().split("T")[0]);
  const [addDays, setAddDays] = useState(30);
  const [addUnit, setAddUnit] = useState("days");
  const [result, setResult]   = useState(null);

  const calculate = () => {
    if (mode === "diff") {
      const d1 = new Date(date1), d2 = new Date(date2);
      const diff = Math.abs(d2 - d1);
      const totalDays  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const remDays    = totalDays % 7;

      let years = 0, months = 0, days = 0;
      const from = d1 < d2 ? new Date(d1) : new Date(d2);
      const to   = d1 < d2 ? new Date(d2) : new Date(d1);
      years  = to.getFullYear() - from.getFullYear();
      months = to.getMonth() - from.getMonth();
      days   = to.getDate() - from.getDate();
      if (days < 0) { months--; days += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }

      setResult({ mode: "diff", years, months, days, totalDays, totalWeeks, remDays });
    } else {
      const base = new Date(startDate);
      const n    = parseFloat(addDays) || 0;
      let res    = new Date(base);
      if (addUnit === "days")   res.setDate(base.getDate() + n);
      if (addUnit === "weeks")  res.setDate(base.getDate() + n * 7);
      if (addUnit === "months") res.setMonth(base.getMonth() + n);
      if (addUnit === "years")  res.setFullYear(base.getFullYear() + n);
      const diff = Math.abs(res - base);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      setResult({
        mode: "add",
        resultDate: res.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        totalDays,
      });
    }
  };

  useEffect(() => { calculate(); }, []);

  const clear = () => {
    setDate1("2024-01-01"); setDate2(new Date().toISOString().split("T")[0]);
    setStart(new Date().toISOString().split("T")[0]); setAddDays(30); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">other</Link> / date calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Date Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Mode</label>
                <div className="mc-input-wrap">
                  <select value={mode} onChange={(e) => setMode(e.target.value)}>
                    <option value="diff">Difference Between Dates</option>
                    <option value="add">Add / Subtract Days</option>
                  </select>
                </div>
              </div>

              {mode === "diff" ? (
                <>
                  <div className="mc-row">
                    <label>Start Date</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>End Date</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mc-row">
                    <label>Start Date</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={startDate} onChange={(e) => setStart(e.target.value)} />
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Add / Subtract</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={addDays} onChange={(e) => setAddDays(e.target.value)} style={{ width: "80px" }} />
                      <select value={addUnit} onChange={(e) => setAddUnit(e.target.value)}>
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                {result.mode === "diff" ? (
                  <>
                    <div className="mc-monthly-pay">
                      <span>Difference:</span>
                      <strong>{result.years}y {result.months}m {result.days}d</strong>
                    </div>
                    <table className="mc-table">
                      <thead><tr><th></th><th>Value</th></tr></thead>
                      <tbody>
                        <tr className="mc-bold"><td>Years, Months, Days</td><td>{result.years} yrs {result.months} mo {result.days} days</td></tr>
                        <tr><td>Total Days</td><td>{result.totalDays}</td></tr>
                        <tr className="mc-bold mc-total"><td>Total Weeks</td><td>{result.totalWeeks} weeks {result.remDays} days</td></tr>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div className="mc-monthly-pay">
                      <span>Result Date:</span>
                      <strong style={{ fontSize: "13px" }}>{result.resultDate}</strong>
                    </div>
                    <table className="mc-table">
                      <thead><tr><th></th><th>Value</th></tr></thead>
                      <tbody>
                        <tr className="mc-bold mc-total"><td>Result Date</td><td>{result.resultDate}</td></tr>
                        <tr><td>Total Days Added</td><td>{result.totalDays}</td></tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mc-sidebar">
          <div className="mc-search"><input type="text" placeholder="" /><button>Search</button></div>
          <div className="mc-sidebar-box">
            <div className="mc-sidebar-title">Other Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/age-calculator">Age</a><a href="/date-calculator">Date</a></div>
              <div><a href="/time-calculator">Time</a><a href="/hours-calculator">Hours</a></div>
              <div><a href="/gpa-calculator">GPA</a><a href="/grade-calculator">Grade</a></div>
              <div><a href="/concrete-calculator">Concrete</a><a href="/subnet-calculator">Subnet</a></div>
              <div><a href="/password-generator">Password</a><a href="/conversion-calculator">Conversion</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}