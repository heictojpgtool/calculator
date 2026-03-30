"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState("2, 4, 4, 4, 5, 5, 7, 9");
  const [result, setResult]   = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    const nums = numbers.split(/[\s,]+/).map(Number).filter((n) => !isNaN(n));
    if (nums.length < 2) return;

    const n    = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const varPop  = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    const varSamp = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    const sdPop   = Math.sqrt(varPop);
    const sdSamp  = Math.sqrt(varSamp);
    const sorted  = [...nums].sort((a, b) => a - b);
    const min     = sorted[0];
    const max     = sorted[sorted.length - 1];
    const range   = max - min;
    const mid     = Math.floor(n / 2);
    const median  = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    const freq = {};
    nums.forEach((n) => { freq[n] = (freq[n] || 0) + 1; });
    const mode = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];

    setResult({
      n, mean: mean.toFixed(4), sdPop: sdPop.toFixed(4), sdSamp: sdSamp.toFixed(4),
      varPop: varPop.toFixed(4), varSamp: varSamp.toFixed(4),
      min, max, range, median, mode, nums, sorted,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { nums, min, max } = result;
    const range = max - min || 1;
    const bins  = 8;
    const binSize = range / bins;
    const counts  = Array(bins).fill(0);

    nums.forEach((n) => {
      const idx = Math.min(Math.floor((n - min) / binSize), bins - 1);
      counts[idx]++;
    });

    const maxCount = Math.max(...counts);
    const bw = canvas.width / bins;
    const pad = 10;

    counts.forEach((cnt, i) => {
      const barH = maxCount > 0 ? ((cnt / maxCount) * (canvas.height - pad * 2)) : 0;
      ctx.fillStyle = "#4a90d9";
      ctx.fillRect(i * bw + 2, canvas.height - pad - barH, bw - 4, barH);
    });
  }, [result]);

  const clear = () => { setNumbers("2, 4, 4, 4, 5, 5, 7, 9"); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">math</Link> / standard deviation calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Standard Deviation Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row" style={{ alignItems: "flex-start" }}>
                <label>Data Set</label>
                <div className="mc-input-wrap">
                  <textarea
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    style={{ width: "180px", height: "80px", border: "1px solid #aaa", padding: "6px", fontSize: "13px", resize: "vertical" }}
                    placeholder="Enter numbers separated by commas"
                  />
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
                  <span>Std Dev (Population):</span>
                  <strong>{result.sdPop}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Count (n)</td><td>{result.n}</td></tr>
                    <tr><td>Mean (Average)</td><td>{result.mean}</td></tr>
                    <tr><td>Median</td><td>{result.median}</td></tr>
                    <tr><td>Mode</td><td>{result.mode}</td></tr>
                    <tr><td>Min</td><td>{result.min}</td></tr>
                    <tr><td>Max</td><td>{result.max}</td></tr>
                    <tr><td>Range</td><td>{result.range}</td></tr>
                    <tr className="mc-bold"><td>SD (Population)</td><td>{result.sdPop}</td></tr>
                    <tr className="mc-bold mc-total"><td>SD (Sample)</td><td>{result.sdSamp}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="120"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Distribution</div>
                    <div style={{ marginTop: "6px", fontSize: "12px" }}>Mean: {result.mean}</div>
                    <div style={{ fontSize: "12px" }}>SD: {result.sdPop}</div>
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