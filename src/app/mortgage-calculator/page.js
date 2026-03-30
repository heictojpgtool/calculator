"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice]         = useState(400000);
  const [downPct, setDownPct]             = useState(20);
  const [loanTerm, setLoanTerm]           = useState(30);
  const [interestRate, setInterestRate]   = useState(6.493);
  const [propTax, setPropTax]             = useState(1.2);
  const [homeIns, setHomeIns]             = useState(1500);
  const [pmi, setPmi]                     = useState(0);
  const [hoa, setHoa]                     = useState(0);
  const [otherCosts, setOtherCosts]       = useState(4000);
  const [result, setResult]               = useState(null);
  const canvasRef = useRef(null);

  const fmt = (n) => "$" + Number(n).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});

  const calculate = () => {
    const price     = parseFloat(homePrice) || 0;
    const down      = price * (parseFloat(downPct)/100);
    const principal = price - down;
    const r         = (parseFloat(interestRate)/100) / 12;
    const n         = parseFloat(loanTerm) * 12;
    const monthly   = r === 0 ? principal/n : principal * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1);
    const totalMortgage = monthly * n;
    const monthlyTax    = (price * parseFloat(propTax)/100) / 12;
    const monthlyIns    = parseFloat(homeIns) / 12;
    const monthlyOther  = parseFloat(otherCosts) / 12;
    const monthlyPmi    = parseFloat(pmi) / 12;
    const monthlyHoa    = parseFloat(hoa) / 12;
    const totalMonthly  = monthly + monthlyTax + monthlyIns + monthlyOther + monthlyPmi + monthlyHoa;

    setResult({
      monthly: monthly.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalMortgage: totalMortgage.toFixed(2),
      totalTax: (monthlyTax*12*loanTerm).toFixed(2),
      totalIns: (monthlyIns*12*loanTerm).toFixed(2),
      totalOther: (monthlyOther*12*loanTerm).toFixed(2),
      monthlyTax: monthlyTax.toFixed(2),
      monthlyIns: monthlyIns.toFixed(2),
      monthlyOther: monthlyOther.toFixed(2),
      loanAmount: principal.toFixed(2),
      downPayment: down.toFixed(2),
      totalPayments: (totalMortgage).toFixed(2),
      totalInterest: (totalMortgage - principal).toFixed(2),
      principal,
      interest: totalMortgage - principal,
      tax: monthlyTax * 12 * loanTerm,
      insurance: parseFloat(homeIns) * loanTerm,
      other: parseFloat(otherCosts) * loanTerm,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width/2, cy = canvas.height/2, r = 70;
    const total = result.principal + result.interest + result.tax + result.insurance + result.other;
    const slices = [
      { val: result.principal,  color: "#4a90d9" },
      { val: result.tax,        color: "#e05c5c" },
      { val: result.insurance,  color: "#c0392b" },
      { val: result.other,      color: "#5bc0de" },
    ];
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let start = -Math.PI/2;
    slices.forEach(s => {
      const angle = (s.val/total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start+angle);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      start += angle;
    });
    // donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2*Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }, [result]);

  const clear = () => {
    setHomePrice(400000); setDownPct(20); setLoanTerm(30);
    setInterestRate(6.493); setPropTax(1.2); setHomeIns(1500);
    setPmi(0); setHoa(0); setOtherCosts(4000); setResult(null);
  };

  return (
    <div className="mc-page">

      {/* BREADCRUMB */}
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">financial</Link> / mortgage calculator
      </div>

      <div className="mc-layout">
        {/* LEFT — FORM + RESULTS */}
        <div className="mc-main">
          <h1 className="mc-title">Mortgage Calculator</h1>

          {/* Info bar */}
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            {/* FORM */}
            <div className="mc-form">
              <div className="mc-row">
                <label>Home Price</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={homePrice} onChange={e=>setHomePrice(e.target.value)} />
                </div>
              </div>
              <div className="mc-row">
                <label>Down Payment</label>
                <div className="mc-input-wrap">
                  <input type="number" value={downPct} onChange={e=>setDownPct(e.target.value)} style={{width:"60px"}} />
                  <span className="mc-suffix">%</span>
                  <select><option>%</option><option>$</option></select>
                </div>
              </div>
              <div className="mc-row">
                <label>Loan Term</label>
                <div className="mc-input-wrap">
                  <input type="number" value={loanTerm} onChange={e=>setLoanTerm(e.target.value)} style={{width:"80px"}} />
                  <span className="mc-suffix">years</span>
                </div>
              </div>
              <div className="mc-row">
                <label>Interest Rate</label>
                <div className="mc-input-wrap">
                  <input type="number" step="0.001" value={interestRate} onChange={e=>setInterestRate(e.target.value)} style={{width:"80px"}} />
                  <span className="mc-suffix">%</span>
                </div>
              </div>

              <div className="mc-checkbox-row">
                <input type="checkbox" defaultChecked id="taxes" />
                <label htmlFor="taxes"><strong>Include Taxes &amp; Costs Below</strong></label>
              </div>
              <div className="mc-tax-header">Annual Tax &amp; Cost</div>

              <div className="mc-row">
                <label>Property Taxes</label>
                <div className="mc-input-wrap">
                  <input type="number" value={propTax} onChange={e=>setPropTax(e.target.value)} style={{width:"60px"}} />
                  <span className="mc-suffix">%</span>
                  <select><option>%</option><option>$</option></select>
                </div>
              </div>
              <div className="mc-row">
                <label>Home Insurance</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={homeIns} onChange={e=>setHomeIns(e.target.value)} style={{width:"80px"}} />
                  <select><option>$</option><option>%</option></select>
                </div>
              </div>
              <div className="mc-row">
                <label>PMI Insurance</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={pmi} onChange={e=>setPmi(e.target.value)} style={{width:"80px"}} />
                  <select><option>$</option><option>%</option></select>
                </div>
              </div>
              <div className="mc-row">
                <label>HOA Fee</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={hoa} onChange={e=>setHoa(e.target.value)} style={{width:"80px"}} />
                  <select><option>$</option><option>%</option></select>
                </div>
              </div>
              <div className="mc-row">
                <label>Other Costs</label>
                <div className="mc-input-wrap">
                  <span className="mc-prefix">$</span>
                  <input type="number" value={otherCosts} onChange={e=>setOtherCosts(e.target.value)} style={{width:"80px"}} />
                  <select><option>$</option><option>%</option></select>
                </div>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
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
                    <tr><th></th><th>Monthly</th><th>Total</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold"><td>Mortgage Payment</td><td>{fmt(result.monthly)}</td><td>{fmt(result.totalMortgage)}</td></tr>
                    <tr><td>Property Tax</td><td>{fmt(result.monthlyTax)}</td><td>{fmt(result.totalTax)}</td></tr>
                    <tr><td>Home Insurance</td><td>{fmt(result.monthlyIns)}</td><td>{fmt(result.totalIns)}</td></tr>
                    <tr><td>Other Costs</td><td>{fmt(result.monthlyOther)}</td><td>{fmt(result.totalOther)}</td></tr>
                    <tr className="mc-bold mc-total"><td>Total Out-of-Pocket</td><td>{fmt(result.totalMonthly)}</td><td>{fmt((parseFloat(result.totalMortgage)+parseFloat(result.totalTax)+parseFloat(result.totalIns)+parseFloat(result.totalOther)).toFixed(2))}</td></tr>
                  </tbody>
                </table>

                {/* PIE CHART */}
                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{background:"#4a90d9"}}></span> Principal &amp; Interest</div>
                    <div><span style={{background:"#e05c5c"}}></span> Property Taxes</div>
                    <div><span style={{background:"#c0392b"}}></span> Home Insurance</div>
                    <div><span style={{background:"#5bc0de"}}></span> Other Cost</div>
                  </div>
                </div>

                {/* SUMMARY TABLE */}
                <table className="mc-summary">
                  <tbody>
                    <tr><td>House Price</td><td>{fmt(homePrice)}</td></tr>
                    <tr><td>Loan Amount</td><td>{fmt(result.loanAmount)}</td></tr>
                    <tr><td>Down Payment</td><td>{fmt(result.downPayment)}</td></tr>
                    <tr><td>Total of {loanTerm*12} Mortgage Payments</td><td>{fmt(result.totalPayments)}</td></tr>
                    <tr><td>Total Interest</td><td>{fmt(result.totalInterest)}</td></tr>
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