"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { name: "Mathematics", grade: "A", credits: 3 },
    { name: "English",     grade: "B+", credits: 3 },
    { name: "Science",     grade: "A-", credits: 4 },
    { name: "History",     grade: "B", credits: 3 },
  ]);
  const [result, setResult] = useState(null);

  const gradeMap = { "A+":4.0,"A":4.0,"A-":3.7,"B+":3.3,"B":3.0,"B-":2.7,"C+":2.3,"C":2.0,"C-":1.7,"D+":1.3,"D":1.0,"D-":0.7,"F":0.0 };

  const updateCourse = (i, field, val) => {
    const c = [...courses];
    c[i] = { ...c[i], [field]: val };
    setCourses(c);
  };

  const addRow = () => setCourses([...courses, { name: "", grade: "A", credits: 3 }]);

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach((c) => {
      const pts = gradeMap[c.grade] ?? 0;
      const cr  = parseFloat(c.credits) || 0;
      totalPoints  += pts * cr;
      totalCredits += cr;
    });
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    let letter = "F";
    if (gpa >= 3.7) letter = "A/A-";
    else if (gpa >= 3.3) letter = "B+";
    else if (gpa >= 3.0) letter = "B";
    else if (gpa >= 2.7) letter = "B-";
    else if (gpa >= 2.3) letter = "C+";
    else if (gpa >= 2.0) letter = "C";
    setResult({ gpa: gpa.toFixed(2), totalCredits, letter });
  };

  useEffect(() => { calculate(); }, []);
  const clear = () => { setCourses([{ name: "", grade: "A", credits: 3 }]); setResult(null); };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb"><Link href="/">home</Link> / <Link href="/">other</Link> / gpa calculator</div>
      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">GPA Calculator</h1>
          <div className="mc-infobar"><span className="mc-arrow">▼</span>Enter your courses and click Calculate</div>
          <div className="mc-body" style={{ flexDirection: "column" }}>
            <table className="mc-table" style={{ marginBottom: "12px" }}>
              <thead>
                <tr><th>Course</th><th>Grade</th><th>Credits</th></tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i}>
                    <td><input value={c.name} onChange={(e) => updateCourse(i, "name", e.target.value)} style={{ width: "130px", border: "1px solid #aaa", padding: "3px 5px" }} placeholder="Course name" /></td>
                    <td>
                      <select value={c.grade} onChange={(e) => updateCourse(i, "grade", e.target.value)} style={{ border: "1px solid #aaa", padding: "3px" }}>
                        {Object.keys({"A+":1,"A":1,"A-":1,"B+":1,"B":1,"B-":1,"C+":1,"C":1,"C-":1,"D+":1,"D":1,"D-":1,"F":1}).map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </td>
                    <td><input type="number" value={c.credits} onChange={(e) => updateCourse(i, "credits", e.target.value)} style={{ width: "60px", border: "1px solid #aaa", padding: "3px" }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginBottom: "12px" }}>
              <button className="mc-clear-btn" onClick={addRow}>+ Add Course</button>
            </div>

            <div className="mc-btns">
              <button className="mc-calc-btn" onClick={calculate}>Calculate ▶</button>
              <button className="mc-clear-btn" onClick={clear}>Clear</button>
            </div>

            {result && (
              <div className="mc-results" style={{ marginTop: "16px" }}>
                <div className="mc-monthly-pay"><span>GPA:</span><strong>{result.gpa}</strong></div>
                <table className="mc-summary">
                  <tbody>
                    <tr><td>GPA</td><td>{result.gpa} / 4.00</td></tr>
                    <tr><td>Letter Grade</td><td>{result.letter}</td></tr>
                    <tr><td>Total Credits</td><td>{result.totalCredits}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="mc-sidebar">
          <div className="mc-search"><input type="text" placeholder="" /><button>Search</button></div>
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