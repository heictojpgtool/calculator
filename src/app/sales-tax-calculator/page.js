"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function SalesTaxCalculator() {
  const [price, setPrice]         = useState(100);
  const [taxRate, setTaxRate]     = useState(8.5);
  const [solveFor, setSolveFor]   = useState("tax");
  const [result, setResult]       = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const p = parseFloat(price) || 0;
    const r = (parseFloat(taxRate) || 0) / 100;

    let beforeTax = 0, taxAmount = 0, afterTax = 0;

    if (solveFor === "tax") {
      beforeTax = p;
      taxAmount = p * r;
      afterTax  = p + taxAmount;
    } else {
      afterTax  = p;
      beforeTax = p / (1 + r);
      taxAmount = afterTax - beforeTax;
    }

    setResult({
      beforeTax: beforeTax.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      afterTax: afterTax.toFixed(2),
      beforeRaw: beforeTax,
      taxRaw: taxAmount,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.beforeRaw + result.taxRaw;
    const slices = [
      { val: result.beforeRaw, color: "#4a90d9" },
      { val: result.taxRaw,    color: "#e05c5c" },
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
    setPrice(100); setTaxRate(8.5); setSolveFor("tax"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / sales tax calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Sales Tax Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Solve For</label>
                <div className="mc-input-wrap">
                  <select value={solveFor} onChange={(e) => setSolveFor(e.target.value)}>
                    <option value="tax">Tax from Before-Tax Price</option>
                    <option value="reverse">Tax from After-Tax Price</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>{solveFor === "tax" ? "Before-Tax Price" : "After-Tax Price"}</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Sales Tax Rate</label>
                <div className="mc-input-wrap">
                  <input type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} style={{ width: "80px" }} />
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
                  <span>Tax Amount:</span>
                  <strong>{fmt(result.taxAmount)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Before-Tax Price</td><td>{fmt(result.beforeTax)}</td></tr>
                    <tr><td>Sales Tax ({taxRate}%)</td><td>{fmt(result.taxAmount)}</td></tr>
                    <tr className="mc-bold mc-total"><td>After-Tax Price</td><td>{fmt(result.afterTax)}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Base Price</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Sales Tax</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Before-Tax Price</td><td>{fmt(result.beforeTax)}</td></tr>
                    <tr><td>Sales Tax Rate</td><td>{taxRate}%</td></tr>
                    <tr><td>Tax Amount</td><td>{fmt(result.taxAmount)}</td></tr>
                    <tr><td>After-Tax Price</td><td>{fmt(result.afterTax)}</td></tr>
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