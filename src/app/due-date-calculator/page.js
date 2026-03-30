"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function DueDateCalculator() {
  const [method, setMethod]   = useState("lmp");
  const [lmpDate, setLmpDate] = useState("2024-09-01");
  const [cycleLen, setCycleLen] = useState(28);
  const [ultrasound, setUltrasound] = useState("2024-11-01");
  const [weeksAt, setWeeksAt] = useState(10);
  const [ivfDate, setIvfDate] = useState("2024-10-01");
  const [embryo, setEmbryo]   = useState("5");
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
    let due;

    if (method === "lmp") {
      const extra = (parseFloat(cycleLen) || 28) - 28;
      due = addDays(new Date(lmpDate), 280 + extra);
    } else if (method === "ultrasound") {
      const lmp = addDays(new Date(ultrasound), -(parseInt(weeksAt) || 0) * 7);
      due = addDays(lmp, 280);
    } else {
      const offset = parseInt(embryo) === 3 ? 263 : 261;
      due = addDays(new Date(ivfDate), offset);
    }

    const today    = new Date();
    const daysLeft = Math.max(0, Math.round((due - today) / (1000 * 60 * 60 * 24)));
    const lmpCalc  = addDays(due, -280);
    const daysPast = Math.round((today - lmpCalc) / (1000 * 60 * 60 * 24));
    const weekNum  = Math.max(0, Math.floor(daysPast / 7));
    const pct      = Math.min(100, Math.round((daysPast / 280) * 100));
    const trimester = weekNum < 14 ? "1st" : weekNum < 28 ? "2nd" : "3rd";

    const milestones = [
      { label: "End of 1st Trimester", date: addDays(lmpCalc, 13 * 7) },
      { label: "End of 2nd Trimester", date: addDays(lmpCalc, 27 * 7) },
      { label: "Due Date",             date: due },
    ];

    setResult({ due: fmtDate(due), daysLeft, weekNum, pct, trimester, milestones });
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
    ctx.arc(cx, cy, r, -Math.PI / 2 + pct * 2 * Math.PI, 3 * Math.PI / 2);
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
    setLmpDate("2024-09-01"); setCycleLen(28); setUltrasound("2024-11-01");
    setWeeksAt(10); setIvfDate("2024-10-01"); setEmbryo("5"); setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">fitness</Link> / due date calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Due Date Calculator</h1>
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
                    <option value="ultrasound">Ultrasound</option>
                    <option value="ivf">IVF Transfer Date</option>
                  </select>
                </div>
              </div>

              {method === "lmp" && (
                <>
                  <div className="mc-row">
                    <label>Last Period</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Cycle Length</label>
                    <div className="mc-input-wrap">
                      <input type="number" value={cycleLen} onChange={(e) => setCycleLen(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">days</span>
                    </div>
                  </div>
                </>
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
                      <input type="number" value={weeksAt} onChange={(e) => setWeeksAt(e.target.value)} style={{ width: "80px" }} />
                      <span className="mc-suffix">weeks</span>
                    </div>
                  </div>
                </>
              )}

              {method === "ivf" && (
                <>
                  <div className="mc-row">
                    <label>Transfer Date</label>
                    <div className="mc-input-wrap">
                      <input type="date" value={ivfDate} onChange={(e) => setIvfDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="mc-row">
                    <label>Embryo Type</label>
                    <div className="mc-input-wrap">
                      <select value={embryo} onChange={(e) => setEmbryo(e.target.value)}>
                        <option value="5">Day 5 Blastocyst</option>
                        <option value="3">Day 3 Embryo</option>
                      </select>
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
                  <strong style={{ fontSize: "13px" }}>{result.due}</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th>Milestone</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {result.milestones.map((m, i) => (
                      <tr key={i} className={m.label === "Due Date" ? "mc-bold mc-total" : ""}>
                        <td>{m.label}</td>
                        <td>{m.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a7c3f" }}></span> Progress: {result.pct}%</div>
                    <div><span style={{ background: "#e0e0e0" }}></span> Remaining</div>
                    <div style={{ marginTop: "6px" }}><strong>Week {result.weekNum} — {result.trimester} Trimester</strong></div>
                    <div><strong>{result.daysLeft} days until due date</strong></div>
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