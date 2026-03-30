"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function IncomeTaxCalculator() {
  const [income, setIncome]           = useState(75000);
  const [filingStatus, setFilingStatus] = useState("single");
  const [deductions, setDeductions]   = useState(14600);
  const [otherIncome, setOtherIncome] = useState(0);
  const [result, setResult]           = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const brackets2024 = {
    single: [
      { limit: 11600,  rate: 0.10 },
      { limit: 47150,  rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    married: [
      { limit: 23200,  rate: 0.10 },
      { limit: 94300,  rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    hoh: [
      { limit: 16550,  rate: 0.10 },
      { limit: 63100,  rate: 0.12 },
      { limit: 100500, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243700, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  };

  const calculate = () => {
    const gross    = (parseFloat(income) || 0) + (parseFloat(otherIncome) || 0);
    const ded      = parseFloat(deductions) || 0;
    const taxable  = Math.max(0, gross - ded);
    const selected = brackets2024[filingStatus];

    let tax = 0;
    let prev = 0;
    let marginalRate = 0;

    for (const bracket of selected) {
      if (taxable <= prev) break;
      const taxed = Math.min(taxable, bracket.limit) - prev;
      tax += taxed * bracket.rate;
      marginalRate = bracket.rate;
      prev = bracket.limit;
    }

    const effectiveRate = gross > 0 ? (tax / gross) * 100 : 0;
    const afterTax      = gross - tax;

    setResult({
      tax: tax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      marginalRate: (marginalRate * 100).toFixed(0),
      afterTax: afterTax.toFixed(2),
      taxable: taxable.toFixed(2),
      gross: gross.toFixed(2),
      taxRaw: tax,
      afterTaxRaw: afterTax,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.taxRaw + result.afterTaxRaw;
    const slices = [
      { val: result.afterTaxRaw, color: "#4a90d9" },
      { val: result.taxRaw,      color: "#e05c5c" },
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
    setIncome(75000); setFilingStatus("single");
    setDeductions(14600); setOtherIncome(0); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / income tax calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Income Tax Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Annual Income</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Filing Status</label>
                <div className="mc-input-wrap">
                  <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)}>
                    <option value="single">Single</option>
                    <option value="married">Married Filing Jointly</option>
                    <option value="hoh">Head of Household</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>Other Income</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Deductions</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
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
                  <span>Tax Owed:</span>
                  <strong>{fmt(result.tax)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Gross Income</td><td>{fmt(result.gross)}</td></tr>
                    <tr><td>Taxable Income</td><td>{fmt(result.taxable)}</td></tr>
                    <tr><td>Federal Tax</td><td>{fmt(result.tax)}</td></tr>
                    <tr><td>Effective Tax Rate</td><td>{result.effectiveRate}%</td></tr>
                    <tr><td>Marginal Tax Rate</td><td>{result.marginalRate}%</td></tr>
                    <tr className="mc-bold mc-total"><td>After-Tax Income</td><td>{fmt(result.afterTax)}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> After-Tax Income</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Tax Owed</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Gross Income</td><td>{fmt(result.gross)}</td></tr>
                    <tr><td>Deductions</td><td>{fmt(deductions)}</td></tr>
                    <tr><td>Taxable Income</td><td>{fmt(result.taxable)}</td></tr>
                    <tr><td>Federal Tax</td><td>{fmt(result.tax)}</td></tr>
                    <tr><td>Effective Rate</td><td>{result.effectiveRate}%</td></tr>
                    <tr><td>Marginal Rate</td><td>{result.marginalRate}%</td></tr>
                    <tr><td>After-Tax Income</td><td>{fmt(result.afterTax)}</td></tr>
                    <tr><td>Monthly Take-Home</td><td>{fmt(result.afterTaxRaw / 12)}</td></tr>
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