"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount]       = useState(20000);
  const [loanTerm, setLoanTerm]           = useState(5);
  const [termUnit, setTermUnit]           = useState("years");
  const [interestRate, setInterestRate]   = useState(6.5);
  const [repayDate, setRepayDate]         = useState("");
  const [result, setResult]               = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate      = (parseFloat(interestRate) / 100) / 12;
    const months    = termUnit === "years"
      ? parseFloat(loanTerm) * 12
      : parseFloat(loanTerm);

    const monthly =
      rate === 0
        ? principal / months
        : (principal * rate * Math.pow(1 + rate, months)) /
          (Math.pow(1 + rate, months) - 1);

    const totalPayment = monthly * months;
    const totalInterest = totalPayment - principal;

    // Repay date
    const start = new Date();
    start.setMonth(start.getMonth() + Math.round(months));
    const dateStr = start.toLocaleDateString("en-US", {
      month: "long", year: "numeric",
    });

    setResult({
      monthly: monthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal,
      interest: totalInterest,
      repayDate: dateStr,
      months: Math.round(months),
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total = result.principal + result.interest;
    const slices = [
      { val: result.principal, color: "#4a90d9" },
      { val: result.interest,  color: "#e05c5c" },
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let start = -Math.PI / 2;
    slices.forEach((s) => {
      const angle = (s.val / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      start += angle;
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }, [result]);

  const clear = () => {
    setLoanAmount(20000);
    setLoanTerm(5);
    setTermUnit("years");
    setInterestRate(6.5);
    setResult(null);
  };

  return (
    <div className="mc-page">

      {/* BREADCRUMB */}
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / loan calculator
      </div>

      <div className="mc-layout">
        {/* LEFT — FORM + RESULTS */}
        <div className="mc-main">
          <h1 className="mc-title">Loan Calculator</h1>

          {/* Info bar */}
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            {/* FORM */}
            <div className="mc-form">
              <div className="mc-row">
                <label>Loan Amount</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-row">
                <label>Loan Term</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    style={{ width: "80px" }}
                  />
                  <select
                    value={termUnit}
                    onChange={(e) => setTermUnit(e.target.value)}
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>Interest Rate</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    style={{ width: "80px" }}
                  />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>
                  Calculate ▶
                </button>
                <button className="mc-clear-btn" onClick={clear}>
                  Clear
                </button>
              </div>
            </div>

            {/* RESULTS */}
            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>Monthly Pay:</span>
                  <strong>{fmt(result.monthly)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold">
                      <td>Monthly Payment</td>
                      <td>{fmt(result.monthly)}</td>
                    </tr>
                    <tr>
                      <td>Total of {result.months} Loan Payments</td>
                      <td>{fmt(result.totalPayment)}</td>
                    </tr>
                    <tr>
                      <td>Total Interest</td>
                      <td>{fmt(result.totalInterest)}</td>
                    </tr>
                    <tr className="mc-bold mc-total">
                      <td>Payoff Date</td>
                      <td>{result.repayDate}</td>
                    </tr>
                  </tbody>
                </table>

                {/* PIE CHART */}
                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div>
                      <span style={{ background: "#4a90d9" }}></span>
                      Principal
                    </div>
                    <div>
                      <span style={{ background: "#e05c5c" }}></span>
                      Interest
                    </div>
                  </div>
                </div>

                {/* SUMMARY TABLE */}
                <table className="mc-summary">
                  <tbody>
                    <tr>
                      <td>Loan Amount</td>
                      <td>{fmt(loanAmount)}</td>
                    </tr>
                    <tr>
                      <td>Total of {result.months} Loan Payments</td>
                      <td>{fmt(result.totalPayment)}</td>
                    </tr>
                    <tr>
                      <td>Total Interest</td>
                      <td>{fmt(result.totalInterest)}</td>
                    </tr>
                    <tr>
                      <td>Payoff Date</td>
                      <td>{result.repayDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="mc-sidebar">
          <div className="mc-search">
            <input type="text" placeholder="" />
            <button>Search</button>
          </div>
          <div className="mc-sidebar-box">
            <div className="mc-sidebar-title">Financial Calculators</div>
            <div className="mc-sidebar-links">
              <div>
                <a href="/mortgage-calculator">Mortgage</a>
                <a href="/loan-calculator">Loan</a>
              </div>
              <div>
                <a href="/auto-loan-calculator">Auto Loan</a>
                <a href="/interest-calculator">Interest</a>
              </div>
              <div>
                <a href="/payment-calculator">Payment</a>
                <a href="/retirement-calculator">Retirement</a>
              </div>
              <div>
                <a href="/amortization-calculator">Amortization</a>
                <a href="/investment-calculator">Investment</a>
              </div>
              <div>
                <a href="/inflation-calculator">Inflation</a>
                <a href="/finance-calculator">Finance</a>
              </div>
              <div>
                <a href="/income-tax-calculator">Income Tax</a>
                <a href="/compound-interest-calculator">Compound Interest</a>
              </div>
              <div>
                <a href="/salary-calculator">Salary</a>
                <a href="/interest-rate-calculator">Interest Rate</a>
              </div>
              <div>
                <a href="/sales-tax-calculator">Sales Tax</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}