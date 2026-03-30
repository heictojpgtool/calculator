"use client";
import { useState } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function RandomNumberGenerator() {
  const [min, setMin]       = useState(1);
  const [max, setMax]       = useState(100);
  const [count, setCount]   = useState(1);
  const [unique, setUnique] = useState(false);
  const [result, setResult] = useState(null);

  const generate = () => {
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 100;
    const n  = Math.min(parseInt(count) || 1, 500);

    if (lo > hi) return;

    let nums = [];
    if (unique) {
      const pool = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, Math.min(n, pool.length));
    } else {
      for (let i = 0; i < n; i++) {
        nums.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
      }
    }

    const sorted = [...nums].sort((a, b) => a - b);
    const sum    = nums.reduce((a, b) => a + b, 0);
    const avg    = sum / nums.length;

    setResult({ nums, sorted, sum, avg: avg.toFixed(2), min: sorted[0], max: sorted[sorted.length - 1] });
  };

  const clear = () => { setMin(1); setMax(100); setCount(1); setUnique(false); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / random number generator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Random Number Generator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Generate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Min Value</label>
                <div className="mc-input-wrap">
                  <input type="number" value={min} onChange={(e) => setMin(e.target.value)} style={{ width: "100px" }} />
                </div>
              </div>
              <div className="mc-row">
                <label>Max Value</label>
                <div className="mc-input-wrap">
                  <input type="number" value={max} onChange={(e) => setMax(e.target.value)} style={{ width: "100px" }} />
                </div>
              </div>
              <div className="mc-row">
                <label>How Many</label>
                <div className="mc-input-wrap">
                  <input type="number" value={count} onChange={(e) => setCount(e.target.value)} style={{ width: "100px" }} min="1" max="500" />
                </div>
              </div>
              <div className="mc-checkbox-row">
                <input type="checkbox" id="unique" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
                <label htmlFor="unique"><strong>No Duplicates</strong></label>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={generate}>Generate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>{result.nums.length === 1 ? "Result:" : `${result.nums.length} Numbers:`}</span>
                  <strong>{result.nums.length === 1 ? result.nums[0] : result.min + " – " + result.max}</strong>
                </div>

                <div style={{ background: "#f5f5f5", border: "1px solid #ddd", padding: "10px", marginBottom: "12px", fontSize: "14px", lineHeight: "1.8", wordBreak: "break-all" }}>
                  {result.nums.join(", ")}
                </div>

                {result.nums.length > 1 && (
                  <table className="mc-summary">
                    <tbody>
                      <tr><td>Count</td><td>{result.nums.length}</td></tr>
                      <tr><td>Min</td><td>{result.min}</td></tr>
                      <tr><td>Max</td><td>{result.max}</td></tr>
                      <tr><td>Sum</td><td>{result.sum}</td></tr>
                      <tr><td>Average</td><td>{result.avg}</td></tr>
                    </tbody>
                  </table>
                )}
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