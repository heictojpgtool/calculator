"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function BodyFatCalculator() {
  const [unit, setUnit]         = useState("us");
  const [gender, setGender]     = useState("male");
  const [age, setAge]           = useState(25);
  const [weight, setWeight]     = useState(160);
  const [weightKg, setWeightKg] = useState(73);
  const [neck, setNeck]         = useState(15);
  const [neckCm, setNeckCm]     = useState(38);
  const [waist, setWaist]       = useState(32);
  const [waistCm, setWaistCm]   = useState(81);
  const [hip, setHip]           = useState(38);
  const [hipCm, setHipCm]       = useState(97);
  const [height, setHeight]     = useState(70);
  const [heightCm, setHeightCm] = useState(178);
  const [result, setResult]     = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    let h = unit === "us" ? (parseFloat(height) || 1) * 2.54  : parseFloat(heightCm) || 1;
    let w = unit === "us" ? (parseFloat(waist) || 0) * 2.54   : parseFloat(waistCm) || 0;
    let n = unit === "us" ? (parseFloat(neck) || 0) * 2.54    : parseFloat(neckCm) || 0;
    let hp= unit === "us" ? (parseFloat(hip) || 0) * 2.54     : parseFloat(hipCm) || 0;

    let bf = 0;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    const bfWeight = unit === "us"
      ? ((bf / 100) * (parseFloat(weight) || 0)).toFixed(1) + " lbs"
      : ((bf / 100) * (parseFloat(weightKg) || 0)).toFixed(1) + " kg";

    let category = "";
    if (gender === "male") {
      if (bf < 6)       category = "Essential Fat";
      else if (bf < 14) category = "Athletes";
      else if (bf < 18) category = "Fitness";
      else if (bf < 25) category = "Average";
      else              category = "Obese";
    } else {
      if (bf < 14)      category = "Essential Fat";
      else if (bf < 21) category = "Athletes";
      else if (bf < 25) category = "Fitness";
      else if (bf < 32) category = "Average";
      else              category = "Obese";
    }

    setResult({ bf: bf.toFixed(1), bfWeight, category, bfRaw: bf });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const bf  = Math.min(parseFloat(result.bf), 100);
    const slices = [
      { val: bf,       color: "#e05c5c" },
      { val: 100 - bf, color: "#4a90d9" },
    ];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let angle = -Math.PI / 2;
    slices.forEach((s) => {
      const sweep = (s.val / 100) * 2 * Math.PI;
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
    ctx.font      = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result.bf + "%", cx, cy + 5);
  }, [result]);

  const clear = () => {
    setGender("male"); setAge(25); setWeight(160); setWeightKg(73);
    setNeck(15); setNeckCm(38); setWaist(32); setWaistCm(81);
    setHip(38); setHipCm(97); setHeight(70); setHeightCm(178); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / body fat calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Body Fat Calculator</h1>
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
                <label>Age</label>
                <div className="mc-input-wrap">
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: "80px" }} />
                  <span className="mc-suffix">years</span>
                </div>
              </div>

              {unit === "us" ? (
                <>
                  <div className="mc-row">
                    <label>Height</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">in</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Weight</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">lbs</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Neck</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">in</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Waist</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">in</span>
                    </div>
                  </div>
                  {gender === "female" && (
                    <div className="mc-row">
                      <label>Hip</label>
                      <div className="mc-input-wrap">
                        <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} style={{ width: "80px" }} />
                        <span className="mc-suffix">in</span>
                      </div>
                    </div>
                  )}
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
                  <div className="mc-row">
                    <label>Neck</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={neckCm} onChange={(e) => setNeckCm(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">cm</span>
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Waist</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={waistCm} onChange={(e) => setWaistCm(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">cm</span>
                    </div>
                  </div>
                  {gender === "female" && (
                    <div className="mc-row">
                      <label>Hip</label>
                      <div className="mc-input-wrap">
                        <input type="number" value={hipCm} onChange={(e) => setHipCm(e.target.value)} style={{ width: "80px" }} />
                        <span className="mc-suffix">cm</span>
                      </div>
                    </div>
                  )}
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
                  <span>Body Fat:</span>
                  <strong>{result.bf}%</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Category</th><th>{gender === "male" ? "Men" : "Women"}</th></tr>
                  </thead>
                  <tbody>
                    {gender === "male" ? (
                      <>
                        <tr style={result.category === "Essential Fat" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Essential Fat</td><td>2–5%</td></tr>
                        <tr style={result.category === "Athletes" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Athletes</td><td>6–13%</td></tr>
                        <tr style={result.category === "Fitness" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Fitness</td><td>14–17%</td></tr>
                        <tr style={result.category === "Average" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Average</td><td>18–24%</td></tr>
                        <tr style={result.category === "Obese" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Obese</td><td>25%+</td></tr>
                      </>
                    ) : (
                      <>
                        <tr style={result.category === "Essential Fat" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Essential Fat</td><td>10–13%</td></tr>
                        <tr style={result.category === "Athletes" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Athletes</td><td>14–20%</td></tr>
                        <tr style={result.category === "Fitness" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Fitness</td><td>21–24%</td></tr>
                        <tr style={result.category === "Average" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Average</td><td>25–31%</td></tr>
                        <tr style={result.category === "Obese" ? { fontWeight: "bold", background: "#f0f8ff" } : {}}><td>Obese</td><td>32%+</td></tr>
                      </>
                    )}
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#e05c5c" }}></span> Fat: {result.bf}%</div>
                    <div><span style={{ background: "#4a90d9" }}></span> Lean Mass</div>
                    <div style={{ marginTop: "6px" }}><strong>Category:</strong> {result.category}</div>
                    <div><strong>Fat Weight:</strong> {result.bfWeight}</div>
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