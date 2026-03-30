"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function InterestRateCalculator() {
  const [loanAmount, setLoanAmount]   = useState(20000);
  const [monthlyPayment, setMonthlyPayment] = useState(400);
  const [loanTerm, setLoanTerm]       = useState(5);
  const [termUnit, setTermUnit]       = useState("years");
  const [result, setResult]           = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const p   = parseFloat(loanAmount) || 0;
    const pmt = parseFloat(monthlyPayment) || 0;
    const n   = termUnit === "years" ? (parseFloat(loanTerm) || 0) * 12 : parseFloat(loanTerm) || 0;

    if (pmt <= 0 || p <= 0 || n <= 0) return;

    let lo = 0, hi = 1, r = 0;
    for (let i = 0; i < 1000; i++) {
      r = (lo + hi) / 2;
      const calc = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      if (calc < pmt) lo = r;
      else hi = r;
      if (Math.abs(calc - pmt) < 0.0001) break;
    }

    const annualRate    = r * 12 * 100;
    const totalPayment  = pmt * n;
    const totalInterest = totalPayment - p;

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + n);
    const payoffStr = payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    setResult({
      annualRate: annualRate.toFixed(3),
      monthlyRate: (r * 100).toFixed(4),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      payoffDate: payoffStr,
      n: Math.round(n),
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
    setLoanAmount(20000); setMonthlyPayment(400);
    setLoanTerm(5); setTermUnit("years"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / interest rate calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Interest Rate Calculator</h1>
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
                <label>Monthly Payment</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Loan Term</label>
                <div className="mc-input-wrap">
                  <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} style={{ width: "80px" }} />
                  <select value={termUnit} onChange={(e) => setTermUnit(e.target.value)}>
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
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
                  <span>Interest Rate:</span>
                  <strong>{result.annualRate}%</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold"><td>Annual Interest Rate</td><td>{result.annualRate}%</td></tr>
                    <tr><td>Monthly Interest Rate</td><td>{result.monthlyRate}%</td></tr>
                    <tr><td>Total of {result.n} Payments</td><td>{fmt(result.totalPayment)}</td></tr>
                    <tr><td>Total Interest</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr className="mc-bold mc-total"><td>Payoff Date</td><td>{result.payoffDate}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Principal</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Interest</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Loan Amount</td><td>{fmt(loanAmount)}</td></tr>
                    <tr><td>Monthly Payment</td><td>{fmt(monthlyPayment)}</td></tr>
                    <tr><td>Annual Interest Rate</td><td>{result.annualRate}%</td></tr>
                    <tr><td>Total Payments</td><td>{fmt(result.totalPayment)}</td></tr>
                    <tr><td>Total Interest</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr><td>Payoff Date</td><td>{result.payoffDate}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
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