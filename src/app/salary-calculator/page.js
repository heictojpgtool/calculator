"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function SalaryCalculator() {
  const [salary, setSalary]           = useState(60000);
  const [salaryType, setSalaryType]   = useState("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [result, setResult]           = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const val   = parseFloat(salary) || 0;
    const hpw   = parseFloat(hoursPerWeek) || 40;
    const dpw   = parseFloat(daysPerWeek) || 5;

    let annual = 0;
    if (salaryType === "annual")    annual = val;
    else if (salaryType === "monthly")  annual = val * 12;
    else if (salaryType === "weekly")   annual = val * 52;
    else if (salaryType === "daily")    annual = val * dpw * 52;
    else if (salaryType === "hourly")   annual = val * hpw * 52;

    const monthly  = annual / 12;
    const weekly   = annual / 52;
    const daily    = weekly / dpw;
    const hourly   = weekly / hpw;
    const biweekly = weekly * 2;

    setResult({ annual, monthly, weekly, daily, hourly, biweekly });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const tax    = result.annual * 0.22;
    const net    = result.annual - tax;
    const slices = [
      { val: net, color: "#4a90d9" },
      { val: tax, color: "#e05c5c" },
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let angle = -Math.PI / 2;
    slices.forEach((s) => {
      const sweep = (s.val / result.annual) * 2 * Math.PI;
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
    setSalary(60000); setSalaryType("annual");
    setHoursPerWeek(40); setDaysPerWeek(5); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / salary calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Salary Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Salary</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Salary Type</label>
                <div className="mc-input-wrap">
                  <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              </div>

              <div className="mc-row">
                <label>Hours Per Week</label>
                <div className="mc-input-wrap">
                  <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">hours</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Days Per Week</label>
                <div className="mc-input-wrap">
                  <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">days</span>
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
                  <span>Annual Salary:</span>
                  <strong>{fmt(result.annual)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Period</th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold"><td>Annual</td><td>{fmt(result.annual)}</td></tr>
                    <tr><td>Monthly</td><td>{fmt(result.monthly)}</td></tr>
                    <tr><td>Bi-Weekly</td><td>{fmt(result.biweekly)}</td></tr>
                    <tr><td>Weekly</td><td>{fmt(result.weekly)}</td></tr>
                    <tr><td>Daily</td><td>{fmt(result.daily)}</td></tr>
                    <tr className="mc-bold mc-total"><td>Hourly</td><td>{fmt(result.hourly)}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Estimated Net Pay</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Estimated Tax (22%)</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Annual</td><td>{fmt(result.annual)}</td></tr>
                    <tr><td>Monthly</td><td>{fmt(result.monthly)}</td></tr>
                    <tr><td>Bi-Weekly</td><td>{fmt(result.biweekly)}</td></tr>
                    <tr><td>Weekly</td><td>{fmt(result.weekly)}</td></tr>
                    <tr><td>Daily</td><td>{fmt(result.daily)}</td></tr>
                    <tr><td>Hourly</td><td>{fmt(result.hourly)}</td></tr>
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