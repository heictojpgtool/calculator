"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function BMRCalculator() {
  const [unit, setUnit]         = useState("us");
  const [age, setAge]           = useState(25);
  const [gender, setGender]     = useState("male");
  const [height, setHeight]     = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [weight, setWeight]     = useState(160);
  const [weightKg, setWeightKg] = useState(73);
  const [result, setResult]     = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    const w = unit === "us" ? (parseFloat(weight) || 0) * 0.453592   : parseFloat(weightKg) || 0;
    const h = unit === "us" ? (parseFloat(height) || 0) * 2.54       : parseFloat(heightCm) || 0;
    const a = parseFloat(age) || 0;

    let bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    setResult({
      bmr: Math.round(bmr),
      sedentary:  Math.round(bmr * 1.2),
      light:      Math.round(bmr * 1.375),
      moderate:   Math.round(bmr * 1.55),
      active:     Math.round(bmr * 1.725),
      veryActive: Math.round(bmr * 1.9),
      bmrRaw: bmr,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const total  = result.moderate;
    const slices = [
      { val: result.bmrRaw,               color: "#4a90d9" },
      { val: total - result.bmrRaw,       color: "#e05c5c" },
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
    setAge(25); setGender("male"); setHeight(70); setHeightCm(178);
    setWeight(160); setWeightKg(73); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / bmr calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">BMR Calculator</h1>
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

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay">
                  <span>BMR:</span>
                  <strong>{result.bmr} Cal/day</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Activity Level</th><th>Calories/Day</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Sedentary</td><td>{result.sedentary}</td></tr>
                    <tr><td>Lightly Active</td><td>{result.light}</td></tr>
                    <tr className="mc-bold mc-total"><td>Moderately Active</td><td>{result.moderate}</td></tr>
                    <tr><td>Very Active</td><td>{result.active}</td></tr>
                    <tr><td>Extra Active</td><td>{result.veryActive}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> BMR: {result.bmr} Cal</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Activity Calories</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>BMR (Mifflin-St Jeor)</td><td>{result.bmr} Cal/day</td></tr>
                    <tr><td>Moderately Active TDEE</td><td>{result.moderate} Cal/day</td></tr>
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