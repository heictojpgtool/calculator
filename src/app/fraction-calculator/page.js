"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function FractionCalculator() {
  const [n1, setN1]         = useState(1);
  const [d1, setD1]         = useState(2);
  const [n2, setN2]         = useState(1);
  const [d2, setD2]         = useState(3);
  const [operation, setOp]  = useState("+");
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);

  const simplify = (n, d) => {
    if (d === 0) return { n: 0, d: 0 };
    const g = gcd(Math.abs(n), Math.abs(d));
    const sn = n / g, sd = d / g;
    return sd < 0 ? { n: -sn, d: -sd } : { n: sn, d: sd };
  };

  const calculate = () => {
    const a = parseInt(n1) || 0, b = parseInt(d1) || 1;
    const c = parseInt(n2) || 0, d = parseInt(d2) || 1;
    let rn = 0, rd = 1;

    if (operation === "+") { rn = a * d + c * b; rd = b * d; }
    if (operation === "-") { rn = a * d - c * b; rd = b * d; }
    if (operation === "×") { rn = a * c; rd = b * d; }
    if (operation === "÷") { rn = a * d; rd = b * c; }

    const s   = simplify(rn, rd);
    const dec = s.d !== 0 ? (s.n / s.d).toFixed(6) : "undefined";
    const whole = s.d !== 0 ? Math.floor(Math.abs(s.n) / Math.abs(s.d)) : 0;
    const remN  = Math.abs(s.n) % Math.abs(s.d);

    setResult({
      n: s.n, d: s.d, decimal: dec,
      mixed: whole > 0 && remN !== 0
        ? `${s.n < 0 ? "-" : ""}${whole} ${remN}/${Math.abs(s.d)}`
        : null,
    });
  };

  useEffect(() => { calculate(); }, []);

  const clear = () => { setN1(1); setD1(2); setN2(1); setD2(3); setOp("+"); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / fraction calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Fraction Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row" style={{ alignItems: "flex-start" }}>
                <label>First Fraction</label>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} style={{ width: "70px", border: "1px solid #aaa", padding: "4px 6px", textAlign: "center" }} />
                  <div style={{ width: "70px", borderTop: "2px solid #333" }}></div>
                  <input type="number" value={d1} onChange={(e) => setD1(e.target.value)} style={{ width: "70px", border: "1px solid #aaa", padding: "4px 6px", textAlign: "center" }} />
                </div>
              </div>

              <div className="mc-row">
                <label>Operation</label>
                <div className="mc-input-wrap">
                  <select value={operation} onChange={(e) => setOp(e.target.value)}>
                    <option value="+">+ Add</option>
                    <option value="-">− Subtract</option>
                    <option value="×">× Multiply</option>
                    <option value="÷">÷ Divide</option>
                  </select>
                </div>
              </div>

              <div className="mc-row" style={{ alignItems: "flex-start" }}>
                <label>Second Fraction</label>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} style={{ width: "70px", border: "1px solid #aaa", padding: "4px 6px", textAlign: "center" }} />
                  <div style={{ width: "70px", borderTop: "2px solid #333" }}></div>
                  <input type="number" value={d2} onChange={(e) => setD2(e.target.value)} style={{ width: "70px", border: "1px solid #aaa", padding: "4px 6px", textAlign: "center" }} />
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
                  <span>Result:</span>
                  <strong>{result.n}/{result.d}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold">
                      <td>Fraction Result</td>
                      <td style={{ fontSize: "16px" }}>{result.n}/{result.d}</td>
                    </tr>
                    {result.mixed && (
                      <tr><td>Mixed Number</td><td>{result.mixed}</td></tr>
                    )}
                    <tr><td>Decimal</td><td>{result.decimal}</td></tr>
                    <tr className="mc-bold mc-total">
                      <td>Expression</td>
                      <td>{n1}/{d1} {operation} {n2}/{d2}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>First Fraction</td><td>{n1}/{d1}</td></tr>
                    <tr><td>Operation</td><td>{operation}</td></tr>
                    <tr><td>Second Fraction</td><td>{n2}/{d2}</td></tr>
                    <tr><td>Simplified Result</td><td>{result.n}/{result.d}</td></tr>
                    <tr><td>Decimal Equivalent</td><td>{result.decimal}</td></tr>
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
            <div className="mc-sidebar-title">Math Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/scientific-calculator">Scientific</a><a href="/fraction-calculator">Fraction</a></div>
              <div><a href="/percentage-calculator">Percentage</a><a href="/random-number-generator">Random Number</a></div>
              <div><a href="/triangle-calculator">Triangle</a><a href="/standard-deviation-calculator">Std Deviation</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}