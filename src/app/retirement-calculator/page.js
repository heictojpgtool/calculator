"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge]         = useState(30);
  const [retireAge, setRetireAge]           = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [returnRate, setReturnRate]         = useState(7);
  const [inflationRate, setInflationRate]   = useState(2.5);
  const [result, setResult]                 = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const years      = (parseFloat(retireAge) || 0) - (parseFloat(currentAge) || 0);
    const months     = years * 12;
    const p          = parseFloat(currentSavings) || 0;
    const pmt        = parseFloat(monthlyContrib) || 0;
    const r          = (parseFloat(returnRate) || 0) / 100 / 12;
    const inflation  = (parseFloat(inflationRate) || 0) / 100;

    if (years <= 0) return;

    const futureValue =
      p * Math.pow(1 + r, months) +
      (r === 0 ? pmt * months : pmt * ((Math.pow(1 + r, months) - 1) / r));

    const totalContributions = p + pmt * months;
    const totalInterest      = futureValue - totalContributions;
    const inflationAdjusted  = futureValue / Math.pow(1 + inflation, years);

    setResult({
      futureValue: futureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      inflationAdjusted: inflationAdjusted.toFixed(2),
      years,
      contributionsRaw: totalContributions,
      interestRaw: totalInterest,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.contributionsRaw + result.interestRaw;
    const slices = [
      { val: result.contributionsRaw, color: "#4a90d9" },
      { val: result.interestRaw,      color: "#e05c5c" },
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
    setCurrentAge(30); setRetireAge(65); setCurrentSavings(50000);
    setMonthlyContrib(500); setReturnRate(7); setInflationRate(2.5);
    setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / retirement calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Retirement Calculator</h1>

          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Current Age</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    style={{ width: "80px" }}
                  />
                  <span className="mc-suffix">years</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Retirement Age</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    value={retireAge}
                    onChange={(e) => setRetireAge(e.target.value)}
                    style={{ width: "80px" }}
                  />
                  <span className="mc-suffix">years</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Current Savings</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-row">
                <label>Monthly Contribution</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input
                    type="number"
                    value={monthlyContrib}
                    onChange={(e) => setMonthlyContrib(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-row">
                <label>Annual Return Rate</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    style={{ width: "80px" }}
                  />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Inflation Rate</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    style={{ width: "80px" }}
                  />
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
                  <span>Retirement Savings:</span>
                  <strong>{fmt(result.futureValue)}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Contributions</td>
                      <td>{fmt(result.totalContributions)}</td>
                    </tr>
                    <tr>
                      <td>Total Interest Earned</td>
                      <td>{fmt(result.totalInterest)}</td>
                    </tr>
                    <tr className="mc-bold mc-total">
                      <td>Future Value at Retirement</td>
                      <td>{fmt(result.futureValue)}</td>
                    </tr>
                    <tr>
                      <td>Inflation Adjusted Value</td>
                      <td>{fmt(result.inflationAdjusted)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Contributions</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Interest Earned</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Current Age</td><td>{currentAge} years</td></tr>
                    <tr><td>Retirement Age</td><td>{retireAge} years</td></tr>
                    <tr><td>Years to Retire</td><td>{result.years} years</td></tr>
                    <tr><td>Current Savings</td><td>{fmt(currentSavings)}</td></tr>
                    <tr><td>Monthly Contribution</td><td>{fmt(monthlyContrib)}</td></tr>
                    <tr><td>Total Contributions</td><td>{fmt(result.totalContributions)}</td></tr>
                    <tr><td>Total Interest Earned</td><td>{fmt(result.totalInterest)}</td></tr>
                    <tr><td>Future Value</td><td>{fmt(result.futureValue)}</td></tr>
                    <tr><td>Inflation Adjusted</td><td>{fmt(result.inflationAdjusted)}</td></tr>
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