"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function AgeCalculator() {
  const [dob, setDob]       = useState("1995-06-15");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const calculate = () => {
    const birth = new Date(dob);
    const to    = new Date(toDate);
    if (birth > to) return;

    let years  = to.getFullYear() - birth.getFullYear();
    let months = to.getMonth() - birth.getMonth();
    let days   = to.getDate() - birth.getDate();

    if (days < 0) { months--; const prev = new Date(to.getFullYear(), to.getMonth(), 0); days += prev.getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays   = Math.floor((to - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks  = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours  = totalDays * 24;

    const next = new Date(birth);
    next.setFullYear(to.getFullYear());
    if (next <= to) next.setFullYear(to.getFullYear() + 1);
    const daysToNext = Math.ceil((next - to) / (1000 * 60 * 60 * 24));

    const nextBday = next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, nextBday, daysToNext });
  };

  useEffect(() => { calculate(); }, []);

  useEffect(() => {
    if (!result || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    const pct = Math.min((result.years % 10) / 10, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + pct * 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = "#4a90d9";
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
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(result.years, cx, cy + 6);
  }, [result]);

  const clear = () => { setDob("1995-06-15"); setToDate(new Date().toISOString().split("T")[0]); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">other</Link> / age calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Age Calculator</h1>
          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Modify the values and click the Calculate button to use
          </div>

          <div className="mc-body">
            <div className="mc-form">
              <div className="mc-row">
                <label>Date of Birth</label>
                <div className="mc-input-wrap">
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
              </div>
              <div className="mc-row">
                <label>Age At Date</label>
                <div className="mc-input-wrap">
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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
                  <span>Age:</span>
                  <strong>{result.years} years, {result.months} months, {result.days} days</strong>
                </div>

                <table className="mc-table">
                  <thead>
                    <tr><th></th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    <tr className="mc-bold"><td>Age</td><td>{result.years} yrs {result.months} mo {result.days} days</td></tr>
                    <tr><td>Total Months</td><td>{result.totalMonths}</td></tr>
                    <tr><td>Total Weeks</td><td>{result.totalWeeks}</td></tr>
                    <tr><td>Total Days</td><td>{result.totalDays}</td></tr>
                    <tr><td>Total Hours</td><td>{result.totalHours.toLocaleString()}</td></tr>
                    <tr className="mc-bold mc-total"><td>Next Birthday</td><td>{result.nextBday} ({result.daysToNext} days)</td></tr>
                  </tbody>
                </table>

                <div className="mc-chart-wrap">
                  <canvas ref={canvasRef} width="160" height="160"></canvas>
                  <div className="mc-legend">
                    <div><span style={{ background: "#4a90d9" }}></span> Current Year Progress</div>
                    <div style={{ marginTop: "6px" }}><strong>{result.years}</strong> years old</div>
                    <div>Next birthday in <strong>{result.daysToNext}</strong> days</div>
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
            <div className="mc-sidebar-title">Other Calculators</div>
            <div className="mc-sidebar-links">
              <div><a href="/age-calculator">Age</a><a href="/date-calculator">Date</a></div>
              <div><a href="/time-calculator">Time</a><a href="/hours-calculator">Hours</a></div>
              <div><a href="/gpa-calculator">GPA</a><a href="/grade-calculator">Grade</a></div>
              <div><a href="/concrete-calculator">Concrete</a><a href="/subnet-calculator">Subnet</a></div>
              <div><a href="/password-generator">Password</a><a href="/conversion-calculator">Conversion</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}