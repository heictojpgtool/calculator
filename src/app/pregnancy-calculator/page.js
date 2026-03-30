"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function PregnancyCalculator() {
  const [method, setMethod]   = useState("lmp");
  const [lmpDate, setLmpDate] = useState("2024-09-01");
  const [dueDate, setDueDate] = useState("2025-06-08");
  const [ultrasound, setUltrasound] = useState("2024-11-01");
  const [weeks, setWeeks]     = useState(10);
  const [result, setResult]   = useState(null);
  const canvasRef = useRef(null);

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const fmtDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const calculate = () => {
    let due, lmp;

    if (method === "lmp") {
      lmp = new Date(lmpDate);
      due = addDays(lmp, 280);
    } else if (method === "due") {
      due = new Date(dueDate);
      lmp = addDays(due, -280);
    } else {
      lmp = addDays(new Date(ultrasound), -(parseInt(weeks) || 0) * 7);
      due = addDays(lmp, 280);
    }

    const today     = new Date();
    const daysLeft  = Math.round((due - today) / (1000 * 60 * 60 * 24));
    const daysPast  = Math.round((today - lmp) / (1000 * 60 * 60 * 24));
    const weeksPreg = Math.floor(daysPast / 7);
    const daysPastW = daysPast % 7;
    const trimester = weeksPreg < 14 ? "1st" : weeksPreg < 28 ? "2nd" : "3rd";

    setResult({
      due: fmtDate(due),
      lmp: fmtDate(lmp),
      daysLeft: Math.max(0, daysLeft),
      weeksPreg,
      daysPastW,
      trimester,
      conception: fmtDate(addDays(lmp, 14)),
      daysPast: Math.max(0, daysPast),
      pct: Math.min(100, Math.round((daysPast / 280) * 100)),
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const pct = result.pct / 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + pct * 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#4a7c3f";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -Math.PI / 2 + pct * 2 * Math.PI, -Math.PI / 2 + 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.fillStyle = "#333";
    ctx.font      = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result.pct + "%", cx, cy + 5);
  }, [result]);

  const clear = () => {
    setLmpDate("2024-09-01"); setDueDate("2025-06-08");
    setUltrasound("2024-11-01"); setWeeks(10); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / pregnancy calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Pregnancy Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Calculate By</label>
                <div className="mc-input-wrap">
                  <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="lmp">Last Menstrual Period</option>
                    <option value="due">Due Date</option>
                    <option value="ultrasound">Ultrasound</option>
                  </select>
                </div>
              </div>

              {method === "lmp" && (
                <div className="mc-row">
                  <label>Last Period Date</label>
                  <div className="mc-input-wrap">
                    <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} />
                  </div>
                </div>
              )}

              {method === "due" && (
                <div className="mc-row">
                  <label>Due Date</label>
                  <div className="mc-input-wrap">
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                </div>
              )}

              {method === "ultrasound" && (
                <>
                  <div className="mc-row">
                    <label>Ultrasound Date</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={ultrasound} onChange={(e) => setUltrasound(e.target.value)} />
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Weeks Pregnant</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={weeks} onChange={(e) => setWeeks(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">weeks</span>
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
                <div className="mc-monthly-pay" style={{ background: "#4a7c3f" }}>
                  <span>Due Date:</span>
                  <strong style={{ fontSize: "14px" }}>{result.due}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Date / Value</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Last Menstrual Period</td><td>{result.lmp}</td></tr>
                    <tr><td>Estimated Conception</td><td>{result.conception}</td></tr>
                    <tr><td>Due Date</td><td>{result.due}</td></tr>
                    <tr><td>Current Week</td><td>{result.weeksPreg} weeks, {result.daysPastW} days</td></tr>
                    <tr><td>Trimester</td><td>{result.trimester} Trimester</td></tr>
                    <tr className="mc-bold mc-total"><td>Days Until Due</td><td>{result.daysLeft} days</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a7c3f" }}></span> Progress: {result.pct}%</div>
                    <div><span style={{ background: "#e0e0e0" }}></span> Remaining</div>
                    <div style={{ marginTop: "6px" }}><strong>{result.trimester} Trimester</strong></div>
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