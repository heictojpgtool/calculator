"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function InvestmentCalculator() {
  const [startAmount, setStartAmount]   = useState(10000);
  const [monthlyAdd, setMonthlyAdd]     = useState(200);
  const [returnRate, setReturnRate]     = useState(7);
  const [years, setYears]               = useState(20);
  const [compound, setCompound]         = useState("monthly");
  const [result, setResult]             = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const compoundMap = { annually: 1, semiannually: 2, quarterly: 4, monthly: 12, daily: 365 };

  const calculate = () => {
    const p   = parseFloat(startAmount) || 0;
    const pmt = parseFloat(monthlyAdd) || 0;
    const r   = (parseFloat(returnRate) || 0) / 100 / 12;
    const n   = (parseFloat(years) || 0) * 12;

    const fv = p * Math.pow(1 + r, n) + (r === 0 ? pmt * n : pmt * ((Math.pow(1 + r, n) - 1) / r));
    const totalDeposits = p + pmt * n;
    const totalInterest = fv - totalDeposits;

    setResult({
      endBalance: fv.toFixed(2),
      totalDeposits: totalDeposits.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      depositsRaw: totalDeposits,
      interestRaw: totalInterest,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.depositsRaw + result.interestRaw;
    const slices = [
      { val: result.depositsRaw, color: "#4a90d9" },
      { val: result.interestRaw, color: "#e05c5c" },
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
    setStartAmount(10000); setMonthlyAdd(200);
    setReturnRate(7); setYears(20); setCompound("monthly"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / investment calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Investment Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Starting Amount</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={startAmount} onChange={(e) => setStartAmount(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Monthly Addition</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={monthlyAdd} onChange={(e) => setMonthlyAdd(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Annual Return Rate</label>
                <div className="mc-input-wrap">
                  <input type="number" step="0.01" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Compound</label>
                <div className="mc-input-wrap">
                  <select value={compound} onChange={(e) => setCompound(e.target.value)}>
                    <option value="annually">Annually</option>
                    <option value="semiannually">Semi-Annually</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>Investment Period</label>
                <div className="mc-input-wrap">
                  <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">years</span>
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
                  <span>End Balance:</span>
                  <strong>{fmt(result.endBalance)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Total Deposits</td><td>{fmt(result.totalDeposits)}</td></tr>
                    <tr><td>Total Interest Earned</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr className="mc-bold mc-total"><td>End Balance</td><td>{fmt(result.endBalance)}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Deposits</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Interest</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Starting Amount</td><td>{fmt(startAmount)}</td></tr>
                    <tr><td>Monthly Addition</td><td>{fmt(monthlyAdd)}</td></tr>
                    <tr><td>Annual Return Rate</td><td>{returnRate}%</td></tr>
                    <tr><td>Investment Period</td><td>{years} years</td></tr>
                    <tr><td>Total Deposits</td><td>{fmt(result.totalDeposits)}</td></tr>
                    <tr><td>Total Interest</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr><td>End Balance</td><td>{fmt(result.endBalance)}</td></tr>
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