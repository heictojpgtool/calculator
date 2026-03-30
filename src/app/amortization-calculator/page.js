"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount]     = useState(200000);
  const [loanTerm, setLoanTerm]         = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [startDate, setStartDate]       = useState("2025-01");
  const [result, setResult]             = useState(null);
  const [schedule, setSchedule]         = useState([]);
  const [showAll, setShowAll]           = useState(false);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const p = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;

    const monthly = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment  = monthly * n;
    const totalInterest = totalPayment - p;

    let balance = p;
    const rows = [];
    const [yr, mo] = startDate.split("-").map(Number);
    const start = new Date(yr, mo - 1, 1);

    for (let i = 1; i <= n; i++) {
      const interestPayment   = balance * r;
      const principalPayment  = monthly - interestPayment;
      balance -= principalPayment;
      const date = new Date(start);
      date.setMonth(start.getMonth() + i - 1);
      rows.push({
        month: i,
        date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        payment: monthly.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2),
      });
    }

    setSchedule(rows);
    setResult({
      monthly: monthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principalRaw: p,
      interestRaw: totalInterest,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.principalRaw + result.interestRaw;
    const slices = [
      { val: result.principalRaw, color: "#4a90d9" },
      { val: result.interestRaw,  color: "#e05c5c" },
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let angle = -Math.PI / 2;
    slices.forEach((s) => {
      const sweep = (s.val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + sweep);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      angle += sweep;
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }, [result]);

  const clear = () => {
    setLoanAmount(200000); setLoanTerm(30);
    setInterestRate(6.5); setStartDate("2025-01");
    setResult(null); setSchedule([]);
  };

  const displayed = showAll ? schedule : schedule.slice(0, 12);

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / amortization calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Amortization Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Loan Amount</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Loan Term</label>
                <div className="mc-input-wrap">
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">years</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Interest Rate</label>
                <div className="mc-input-wrap">
                  <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Start Date</label>
                <div className="mc-input-wrap">
                  <input type="month" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>Monthly Pay:</span>
                  <strong>{fmt(result.monthly)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold"><td>Monthly Payment</td><td>{fmt(result.monthly)}</td></tr>
                    <tr><td>Total Payment</td><td>{fmt(result.totalPayment)}</td></tr>
                    <tr><td>Total Interest</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr className="mc-bold mc-total"><td>Loan Amount</td><td>{fmt(loanAmount)}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Principal</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Interest</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {schedule.length > 0 && (
            <div style={{ marginTop: "24px", overflowX: "auto" }}>
              <table className="mc-table" style={{ fontSize: "12px" }}>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Principal</th>
                    <th>Interest</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((row) => (
                    <tr key={row.month}>
                      <td style={{ textAlign: "center" }}>{row.month}</td>
                      <td>{row.date}</td>
                      <td>{fmt(row.payment)}</td>
                      <td>{fmt(row.principal)}</td>
                      <td>{fmt(row.interest)}</td>
                      <td>{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {schedule.length > 12 && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button className="mc-calc-btn" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less ▲" : "Show Full Schedule ▼"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mc-sidebar">
          <div className="mc-search">
            <input type="text" placeholder="" />
            <button>Search</button>
          </div>
          <div className="mc-sidebar-box">
            <div className="mc-sidebar-title">Financial Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/mortgage-calculator">Mortgage</a><a href="/loan-calculator">Loan</a></div>
              <div><a href="/auto-loan-calculator">Auto Loan</a><a href="/interest-calculator">Interest</a></div>
              <div><a href="/payment-calculator">Payment</a><a href="/retirement-calculator">Retirement</a></div>
              <div><a href="/amortization-calculator">Amortization</a><a href="/investment-calculator">Investment</a></div>
              <div><a href="/inflation-calculator">Inflation</a><a href="/finance-calculator">Finance</a></div>
              <div><a href="/income-tax-calculator">Income Tax</a><a href="/compound-interest-calculator">Compound Interest</a></div>
              <div><a href="/salary-calculator">Salary</a><a href="/interest-rate-calculator">Interest Rate</a></div>
              <div><a href="/sales-tax-calculator">Sales Tax</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}