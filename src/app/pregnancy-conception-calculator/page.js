"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function PregnancyConceptionCalculator() {
  const [dueDate, setDueDate] = useState("2025-06-08");
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
    const due         = new Date(dueDate);
    const lmp         = addDays(due, -280);
    const conception  = addDays(lmp, 14);
    const fertStart   = addDays(lmp, 11);
    const fertEnd     = addDays(lmp, 17);
    const firstTri    = addDays(lmp, 13 * 7);
    const secondTri   = addDays(lmp, 27 * 7);

    setResult({
      due: fmtDate(due),
      lmp: fmtDate(lmp),
      conception: fmtDate(conception),
      fertStart: fmtDate(fertStart),
      fertEnd: fmtDate(fertEnd),
      firstTri: fmtDate(firstTri),
      secondTri: fmtDate(secondTri),
    });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const slices = [
      { sweep: (1/3) * 2 * Math.PI, color: "#4a90d9" },
      { sweep: (1/3) * 2 * Math.PI, color: "#4a7c3f" },
      { sweep: (1/3) * 2 * Math.PI, color: "#e05c5c" },
    ];
    let angle = -Math.PI / 2;
    slices.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + s.sweep);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      angle += s.sweep;
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }, [result]);

  const clear = () => { setDueDate("2025-06-08"); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / pregnancy conception calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Pregnancy Conception Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Due Date</label>
                <div className="mc-input-wrap">
                  <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div className="mc-btns">
                <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
                <button className="mc-clear-btn" onClick={clear}>Clear</button>
              </div>
            </div>

            {result && (
              <div className="mc-results">
                <div className="mc-monthly-pay" style={{ background: "#4a7c3f" }}>
                  <span>Conception Date:</span>
                  <strong style={{ fontSize: "13px" }}>{result.conception}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Milestone</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Last Menstrual Period</td><td>{result.lmp}</td></tr>
                    <tr className="mc-bold"><td>Estimated Conception</td><td>{result.conception}</td></tr>
                    <tr><td>Fertile Window Start</td><td>{result.fertStart}</td></tr>
                    <tr><td>Fertile Window End</td><td>{result.fertEnd}</td></tr>
                    <tr><td>End of 1st Trimester</td><td>{result.firstTri}</td></tr>
                    <tr><td>End of 2nd Trimester</td><td>{result.secondTri}</td></tr>
                    <tr className="mc-bold mc-total"><td>Due Date</td><td>{result.due}</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> 1st Trimester</div>
                    <div><span style={{ background: "#4a7c3f" }}></span> 2nd Trimester</div>
                    <div><span style={{ background: "#e05c5c" }}></span> 3rd Trimester</div>
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