"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function CalorieCalculator() {
  const [unit, setUnit]         = useState("us");
  const [age, setAge]           = useState(25);
  const [gender, setGender]     = useState("male");
  const [height, setHeight]     = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [weight, setWeight]     = useState(160);
  const [weightKg, setWeightKg] = useState(73);
  const [activity, setActivity] = useState("moderate");
  const [result, setResult]     = useState(null);
  const canvasRef = useRef(null);

  const activityMap = {
    sedentary:    1.2,
    light:        1.375,
    moderate:     1.55,
    active:       1.725,
    veryactive:   1.9,
  };

  const calculate = () => {
    let w = unit === "us" ? (parseFloat(weight) || 0) * 0.453592 : parseFloat(weightKg) || 0;
    let h = unit === "us" ? (parseFloat(height) || 0) * 2.54     : parseFloat(heightCm) || 0;
    const a = parseFloat(age) || 0;
    const factor = activityMap[activity];

    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const maintenance = bmr * factor;

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      mildLoss:   Math.round(maintenance - 250),
      loss:       Math.round(maintenance - 500),
      extremeLoss: Math.round(maintenance - 1000),
      mildGain:   Math.round(maintenance + 250),
      gain:       Math.round(maintenance + 500),
      bmrRaw: bmr,
      maintenanceRaw: maintenance,
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const slices = [
      { val: result.bmrRaw,                             color: "#4a90d9" },
      { val: result.maintenanceRaw - result.bmrRaw,     color: "#e05c5c" },
    ];
    const total = result.maintenanceRaw;
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
    setWeight(160); setWeightKg(73); setActivity("moderate"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / calorie calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Calorie Calculator</h1>
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

              <div className="mc-row">
                <label>Activity Level</label>
                <div className="mc-input-wrap">
                  <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                    <option value="sedentary">Sedentary (little/no exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="veryactive">Very Active (hard exercise)</option>
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
                <div className="mc-monthly-pay">
                  <span>Maintenance Calories:</span>
                  <strong>{result.maintenance} Cal/day</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Goal</th><th>Calories/Day</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Lose 2 lbs/week</td><td>{result.extremeLoss}</td></tr>
                    <tr><td>Lose 1 lb/week</td><td>{result.loss}</td></tr>
                    <tr><td>Lose 0.5 lb/week</td><td>{result.mildLoss}</td></tr>
                    <tr className="mc-bold mc-total"><td>Maintain Weight</td><td>{result.maintenance}</td></tr>
                    <tr><td>Gain 0.5 lb/week</td><td>{result.mildGain}</td></tr>
                    <tr><td>Gain 1 lb/week</td><td>{result.gain}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> BMR: {result.bmr} Cal</div>
                    <div><span style={{ background: "#e05c5c" }}></span> Activity: {result.maintenance - result.bmr} Cal</div>
                  </div>
                </div>

                <table className="mc-summary">
                  <tbody>
                    <tr><td>Basal Metabolic Rate (BMR)</td><td>{result.bmr} Cal/day</td></tr>
                    <tr><td>Maintenance Calories</td><td>{result.maintenance} Cal/day</td></tr>
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