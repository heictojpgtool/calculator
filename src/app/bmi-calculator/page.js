"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function BMICalculator() {
  const [unit, setUnit]       = useState("us");
  const [height, setHeight]   = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [weight, setWeight]   = useState(160);
  const [weightKg, setWeightKg] = useState(73);
  const [age, setAge]         = useState(25);
  const [gender, setGender]   = useState("male");
  const [result, setResult]   = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    let bmi = 0;
    if (unit === "us") {
      bmi = (703 * (parseFloat(weight) || 0)) / Math.pow(parseFloat(height) || 1, 2);
    } else {
      bmi = (parseFloat(weightKg) || 0) / Math.pow((parseFloat(heightCm) || 1) / 100, 2);
    }

    let category = "";
    let color    = "";
    if (bmi < 18.5)      { category = "Underweight"; color = "#5bc0de"; }
    else if (bmi < 25)   { category = "Normal weight"; color = "#4a7c3f"; }
    else if (bmi < 30)   { category = "Overweight"; color = "#f0ad4e"; }
    else                 { category = "Obese"; color = "#e05c5c"; }

    const h = unit === "us" ? (parseFloat(height) || 1) / 39.3701 : (parseFloat(heightCm) || 1) / 100;
    const normalMin = (18.5 * h * h).toFixed(1);
    const normalMax = (24.9 * h * h).toFixed(1);

    setResult({ bmi: bmi.toFixed(1), category, color, normalMin, normalMax });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const bmi   = parseFloat(result.bmi);
    const pct   = Math.min(bmi / 40, 1);
    const slices = [
      { val: pct,     color: result.color },
      { val: 1 - pct, color: "#e0e0e0" },
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let angle = -Math.PI / 2;
    slices.forEach((s) => {
      const sweep = s.val * 2 * Math.PI;
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
    ctx.fillStyle = "#333";
    ctx.font      = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result.bmi, cx, cy + 6);
  }, [result]);

  const clear = () => {
    setHeight(70); setWeight(160); setHeightCm(178);
    setWeightKg(73); setAge(25); setGender("male"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / bmi calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">BMI Calculator</h1>
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

              {unit === "us" ? (
                <>
                  <div className="mc-row">
                    <label>Height</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">inches</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Weight</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">lbs</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mc-row">
                    <label>Height</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">cm</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Weight</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">kg</span>
                    </div>
                  </div>
                </>
              )}

              <div className="mc-row">
                <label>Age</label>
                <div className="mc-input-wrap">
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">years</span>
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

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay" style={{ background: result.color }}>
                  <span>Your BMI:</span>
                  <strong>{result.bmi}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Category</th><th>BMI Range</th></tr>
                  </thead>
                  <tbody>
                    <tr style={result.category === "Underweight" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Underweight</td><td>&lt; 18.5</td></tr>
                    <tr style={result.category === "Normal weight" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Normal weight</td><td>18.5 – 24.9</td></tr>
                    <tr style={result.category === "Overweight" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Overweight</td><td>25 – 29.9</td></tr>
                    <tr style={result.category === "Obese" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Obese</td><td>≥ 30</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: result.color }}></span> Your BMI: {result.bmi}</div>
                    <div style={{ marginTop: "8px", fontSize: "13px" }}>
                      <strong>Category:</strong> {result.category}
                    </div>
                    <div style={{ marginTop: "4px", fontSize: "12px", color: "#555" }}>
                      Healthy range: {result.normalMin} – {result.normalMax} {unit === "us" ? "lbs" : "kg"}
                    </div>
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