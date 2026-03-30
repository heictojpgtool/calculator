"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function AutoLoanCalculator() {
  const [carPrice, setCarPrice]         = useState(25000);
  const [downPayment, setDownPayment]   = useState(5000);
  const [loanTerm, setLoanTerm]         = useState(60);
  const [interestRate, setInterestRate] = useState(5.5);
  const [salesTax, setSalesTax]         = useState(0);
  const [fees, setFees]                 = useState(0);
  const [tradeIn, setTradeIn]           = useState(0);
  const [result, setResult]             = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const price     = parseFloat(carPrice) || 0;
    const down      = parseFloat(downPayment) || 0;
    const trade     = parseFloat(tradeIn) || 0;
    const tax       = price * ((parseFloat(salesTax) || 0) / 100);
    const extraFees = parseFloat(fees) || 0;
    const principal = price + tax + extraFees - down - trade;
    const r         = (parseFloat(interestRate) / 100) / 12;
    const n         = parseFloat(loanTerm) || 60;

    const monthly =
      r === 0
        ? principal / n
        : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayment  = monthly * n;
    const totalInterest = totalPayment - principal;

    const start = new Date();
    start.setMonth(start.getMonth() + n);
    const payoffDate = start.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    setResult({
      monthly: monthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
      payoffDate,
      n,
      principalRaw: principal,
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
    setCarPrice(25000); setDownPayment(5000); setLoanTerm(60);
    setInterestRate(5.5); setSalesTax(0); setFees(0); setTradeIn(0);
    setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / auto loan calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Auto Loan Calculator</h1>

          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Auto Price</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} />
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
                  <span className="mc-suffix">months</span>
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

              <div className="mc-row">
                <label>Down Payment</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
                </div>
              </div>

              <div className="mc-row">
                <label>Trade-in Value</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} />
                </div>
              </div>

              <div className="mc-checkbox-row">
                <input type="checkbox" defaultChecked id="taxes" />
                <label htmlFor="taxes"><strong>Include Taxes &amp; Fees Below</strong></label>
              </div>
              <div className="mc-tax-header">Annual Tax &amp; Cost</div>

              <div className="mc-row">
                <label>Sales Tax</label>
                <div className="mc-input-wrap">
                  <input
                    type="number"
                    value={salesTax}
                    onChange={(e) => setSalesTax(e.target.value)}
                    style={{ width: "60px" }}
                  />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-row">
                <label>Title, Registration &amp; Fees</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} style={{ width: "80px" }} />
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
                    <tr className="mc-bold">
                      <td>Monthly Payment</td>
                      <td>{fmt(result.monthly)}</td>
                    </tr>
                    <tr>
                      <td>Total of {result.n} Auto Loan Payments</td>
                      <td>{fmt(result.totalPayment)}</td>
                    </tr>
                    <tr>
                      <td>Total Interest</td>
                      <td>{fmt(result.totalInterest)}</td>
                    </tr>
                    <tr className="mc-bold mc-total">
                      <td>Payoff Date</td>
                      <td>{result.payoffDate}</td>
                    </tr>
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
                    <tr><td>Auto Price</td><td>{fmt(carPrice)}</td></tr>
                    <tr><td>Loan Amount</td><td>{fmt(result.principal)}</td></tr>
                    <tr><td>Down Payment</td><td>{fmt(downPayment)}</td></tr>
                    <tr><td>Total of {result.n} Payments</td><td>{fmt(result.totalPayment)}</td></tr>
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