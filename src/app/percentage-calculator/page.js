"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function PercentageCalculator() {
  const [v1, setV1]     = useState(10);
  const [v2, setV2]     = useState(200);
  const [pct, setPct]   = useState(15);
  const [base, setBase] = useState(80);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const whatPct  = ((parseFloat(v1) || 0) / (parseFloat(v2) || 1)) * 100;
    const pctOfNum = ((parseFloat(pct) || 0) / 100) * (parseFloat(base) || 0);
    const increase = parseFloat(base) || 0;
    const after    = parseFloat(v2) || 0;
    const changePct = ((after - increase) / (increase || 1)) * 100;

    setResult({
      whatPct: whatPct.toFixed(4),
      pctOfNum: pctOfNum.toFixed(2),
      changePct: changePct.toFixed(4),
    });
  };

  useEffect(() => { calculate(); }, []);

  const clear = () => { setV1(10); setV2(200); setPct(15); setBase(80); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / percentage calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Percentage Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px", color: "#1e3f6e" }}>
                What is X% of Y?
              </div>
              <div className="mc-row">
                <label>Percentage</label>
                <div className="mc-input-wrap">
                  <input type="number" value={pct} onChange={(e) => setPct(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">%  of</span>
                  <input type="number" value={base} onChange={(e) => setBase(e.target.value)} style={{ width: "80px" }} />
                </div>
              </div>

              <div style={{ fontSize: "13px", fontWeight: "bold", margin: "14px 0 8px", color: "#1e3f6e" }}>
                X is what % of Y?
              </div>
              <div className="mc-row">
                <label>Values</label>
                <div className="mc-input-wrap">
                  <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">is what % of</span>
                  <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} style={{ width: "80px" }} />
                </div>
              </div>

              <div style={{ fontSize: "13px", fontWeight: "bold", margin: "14px 0 8px", color: "#1e3f6e" }}>
                % Change from X to Y?
              </div>
              <div className="mc-row">
                <label>From / To</label>
                <div className="mc-input-wrap">
                  <input type="number" value={base} onChange={(e) => setBase(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">to</span>
                  <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} style={{ width: "80px" }} />
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
                  <span>{pct}% of {base} =</span>
                  <strong>{result.pctOfNum}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Question</th><th>Answer</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold">
                      <td>{pct}% of {base}</td>
                      <td>{result.pctOfNum}</td>
                    </tr>
                    <tr>
                      <td>{v1} is what % of {v2}</td>
                      <td>{result.whatPct}%</td>
                    </tr>
                    <tr className="mc-bold mc-total">
                      <td>% change from {base} to {v2}</td>
                      <td>{result.changePct}%</td>
                    </tr>
                  </tbody>
                </table>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>{pct}% of {base}</td><td>{result.pctOfNum}</td></tr>
                    <tr><td>{v1} is what % of {v2}</td><td>{result.whatPct}%</td></tr>
                    <tr><td>% change: {base} → {v2}</td><td>{result.changePct}%</td></tr>
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