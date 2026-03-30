"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function InflationCalculator() {
  const [amount, setAmount]             = useState(100);
  const [startYear, setStartYear]       = useState(2000);
  const [endYear, setEndYear]           = useState(2024);
  const [inflationRate, setInflationRate] = useState(3);
  const [result, setResult]             = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const p    = parseFloat(amount) || 0;
    const r    = (parseFloat(inflationRate) || 0) / 100;
    const yrs  = (parseFloat(endYear) || 0) - (parseFloat(startYear) || 0);
    if (yrs <= 0) return;

    const futureValue    = p * Math.pow(1 + r, yrs);
    const totalInflation = futureValue - p;
    const powerLoss      = ((futureValue - p) / futureValue) * 100;

    setResult({
      futureValue: futureValue.toFixed(2),
      totalInflation: totalInflation.toFixed(2),
      powerLoss: powerLoss.toFixed(2),
      years: yrs,
      originalRaw: p,
      inflationRaw: totalInflation,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.originalRaw + result.inflationRaw;
    const slices = [
      { val: result.originalRaw,  color: "#4a90d9" },
      { val: result.inflationRaw, color: "#e05c5c" },
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
    setAmount(100); setStartYear(2000); setEndYear(2024); setInflationRate(3); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / inflation calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Inflation Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Original Amount</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Start Year</label>
                <div className="mc-input-wrap">
                  <input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} style={{ width: "80px" }} />
                </div>
              </div>

              <div className="mc-row">
                <label>End Year</label>
                <div className="mc-input-wrap">
                  <input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} style={{ width: "80px" }} />
                </div>
              </div>

              <div className="mc-row">
                <label>Inflation Rate</label>
                <div className="mc-input-wrap">
                  <input type="number" step="0.01" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">%</span>
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
                  <span>Future Value:</span>
                  <strong>{fmt(result.futureValue)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Original Amount</td><td>{fmt(amount)}</td></tr>
                    <tr><td>Inflation Amount</td><td>{fmt(result.totalInflation)}</td></tr>
                    <tr className="mc-bold mc-total"><td>Future Value</td><td>{fmt(result.futureValue)}</td></tr>
                    <tr><td>Purchasing Power Loss</td><td>{result.powerLoss}%</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Original Value</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Inflation Effect</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Original Amount</td><td>{fmt(amount)}</td></tr>
                    <tr><td>Start Year</td><td>{startYear}</td></tr>
                    <tr><td>End Year</td><td>{endYear}</td></tr>
                    <tr><td>Years</td><td>{result.years}</td></tr>
                    <tr><td>Inflation Rate</td><td>{inflationRate}%</td></tr>
                    <tr><td>Future Value</td><td>{fmt(result.futureValue)}</td></tr>
                    <tr><td>Purchasing Power Loss</td><td>{result.powerLoss}%</td></tr>
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