"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function IdealWeightCalculator() {
  const [unit, setUnit]         = useState("us");
  const [gender, setGender]     = useState("male");
  const [height, setHeight]     = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [result, setResult]     = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    const hIn = unit === "us" ? parseFloat(height) || 0 : (parseFloat(heightCm) || 0) / 2.54;
    const overBase = Math.max(0, hIn - 60);

    let robinson, miller, devine, hamwi;
    if (gender === "male") {
      robinson = 52  + 1.9 * overBase;
      miller   = 56.2 + 1.41 * overBase;
      devine   = 50  + 2.3 * overBase;
      hamwi    = 48  + 2.7 * overBase;
    } else {
      robinson = 49  + 1.7 * overBase;
      miller   = 53.1 + 1.36 * overBase;
      devine   = 45.5 + 2.3 * overBase;
      hamwi    = 45.5 + 2.2 * overBase;
    }

    const avg = (robinson + miller + devine + hamwi) / 4;

    const toDisplay = (kg) =>
      unit === "us" ? (kg * 2.20462).toFixed(1) + " lbs" : kg.toFixed(1) + " kg";

    setResult({
      robinson: toDisplay(robinson),
      miller:   toDisplay(miller),
      devine:   toDisplay(devine),
      hamwi:    toDisplay(hamwi),
      avg:      toDisplay(avg),
      avgRaw:   avg,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#4a7c3f";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.font      = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Ideal", cx, cy + 4);
  }, [result]);

  const clear = () => {
    setGender("male"); setHeight(70); setHeightCm(178); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / ideal weight calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Ideal Weight Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Unit</label>
                <div className="mc-input-wrap">
                  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="us">US Units</option>
                    <option value="metric">Metric Units</option>
                  </select>
                </div>
              </div>
              <div className="mc-row">
                <label>Gender</label>
                <div className="mc-input-wrap">
                  <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="mc-row">
                <label>Height</label>
                <div className="mc-input-wrap">
                  {unit === "us" ? (
                    <>
                      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">inches</span>
                    </>
                  ) : (
                    <>
                      <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">cm</span>
                    </>
                  )}
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
                  <span>Ideal Weight (Avg):</span>
                  <strong>{result.avg}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Formula</th><th>Ideal Weight</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Robinson (1983)</td><td>{result.robinson}</td></tr>
                    <tr><td>Miller (1983)</td><td>{result.miller}</td></tr>
                    <tr><td>Devine (1974)</td><td>{result.devine}</td></tr>
                    <tr><td>Hamwi (1964)</td><td>{result.hamwi}</td></tr>
                    <tr className="mc-bold mc-total"><td>Average</td><td>{result.avg}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a7c3f" }}></span> Ideal Weight Range</div>
                    <div style={{ marginTop: "8px", fontSize: "12px" }}>Based on 4 medical formulas</div>
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
            <div className="mc-sidebar-title">Fitness Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/bmi-calculator">BMI</a><a href="/calorie-calculator">Calorie</a></div>
              <div><a href="/body-fat-calculator">Body Fat</a><a href="/bmr-calculator">BMR</a></div>
              <div><a href="/ideal-weight-calculator">Ideal Weight</a><a href="/pace-calculator">Pace</a></div>
              <div><a href="/pregnancy-calculator">Pregnancy</a><a href="/pregnancy-conception-calculator">Conception</a></div>
              <div><a href="/due-date-calculator">Due Date</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}