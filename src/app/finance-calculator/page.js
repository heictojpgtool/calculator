"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function FinanceCalculator() {
  const [solveFor, setSolveFor]         = useState("pv");
  const [presentValue, setPresentValue] = useState(10000);
  const [futureValue, setFutureValue]   = useState(20000);
  const [rate, setRate]                 = useState(5);
  const [periods, setPeriods]           = useState(10);
  const [payment, setPayment]           = useState(0);
  const [result, setResult]             = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const pv  = parseFloat(presentValue) || 0;
    const fv  = parseFloat(futureValue) || 0;
    const r   = (parseFloat(rate) || 0) / 100;
    const n   = parseFloat(periods) || 0;
    const pmt = parseFloat(payment) || 0;

    let answer = 0;
    let label  = "";

    if (solveFor === "pv") {
      answer = fv / Math.pow(1 + r, n);
      label  = "Present Value";
    } else if (solveFor === "fv") {
      answer = pv * Math.pow(1 + r, n);
      label  = "Future Value";
    } else if (solveFor === "rate") {
      answer = (Math.pow(fv / pv, 1 / n) - 1) * 100;
      label  = "Annual Rate (%)";
    } else if (solveFor === "periods") {
      answer = Math.log(fv / pv) / Math.log(1 + r);
      label  = "Number of Periods";
    }

    setResult({ answer: answer.toFixed(4), label, pvRaw: pv, fvRaw: fv > 0 ? fv : answer });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const pv    = result.pvRaw;
    const gain  = Math.max(0, result.fvRaw - pv);
    const total = pv + gain;
    const slices = [
      { val: pv,   color: "#4a90d9" },
      { val: gain, color: "#e05c5c" },
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
    setPresentValue(10000); setFutureValue(20000); setRate(5);
    setPeriods(10); setPayment(0); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / finance calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Finance Calculator</h1>
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
                    <option value="pv">Present Value</option>
                    <option value="fv">Future Value</option>
                    <option value="rate">Interest Rate</option>
                    <option value="periods">No. of Periods</option>
                  </select>
                </div>
              </div>

              {solveFor !== "pv" && (
                <div className="mc-row">
                  <label>Present Value</label>
                  <div className="mc-input-wrap">
                    <span className="mc-prefix">$</span>
                    <input type="number" value={presentValue} onChange={(e) => setPresentValue(e.target.value)} />
                  </div>
                </div>
              )}

              {solveFor !== "fv" && (
                <div className="mc-row">
                  <label>Future Value</label>
                  <div className="mc-input-wrap">
                    <span className="mc-prefix">$</span>
                    <input type="number" value={futureValue} onChange={(e) => setFutureValue(e.target.value)} />
                  </div>
                </div>
              )}

              {solveFor !== "rate" && (
                <div className="mc-row">
                  <label>Interest Rate</label>
                  <div className="mc-input-wrap">
                    <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} style={{ width: "80px" }} />
                    <span className="mc-suffix">%</span>
                  </div>
                </div>
              )}

              {solveFor !== "periods" && (
                <div className="mc-row">
                  <label>No. of Periods</label>
                  <div className="mc-input-wrap">
                    <input type="number" value={periods} onChange={(e) => setPeriods(e.target.value)} style={{ width: "80px" }} />
                    <span className="mc-suffix">years</span>
                  </div>
                </div>
              )}

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>{result.label}:</span>
                  <strong>
                    {solveFor === "rate"
                      ? result.answer + "%"
                      : solveFor === "periods"
                      ? result.answer + " yrs"
                      : fmt(result.answer)}
                  </strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Present Value</td><td>{solveFor === "pv" ? fmt(result.answer) : fmt(presentValue)}</td></tr>
                    <tr><td>Future Value</td><td>{solveFor === "fv" ? fmt(result.answer) : fmt(futureValue)}</td></tr>
                    <tr><td>Interest Rate</td><td>{solveFor === "rate" ? result.answer + "%" : rate + "%"}</td></tr>
                    <tr className="mc-bold mc-total"><td>No. of Periods</td><td>{solveFor === "periods" ? result.answer + " yrs" : periods + " yrs"}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Present Value</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Growth</div>
                  </div>
                </div>
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