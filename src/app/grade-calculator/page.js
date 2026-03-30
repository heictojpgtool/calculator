"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../mortgage.css";

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { name: "Homework", score: 85, weight: 20 },
    { name: "Midterm", score: 78, weight: 30 },
    { name: "Final Exam", score: 92, weight: 40 },
    { name: "Quiz", score: 90, weight: 10 },
  ]);
  const [result, setResult] = useState(null);

  const update = (i, field, val) => {
    const copy = [...assignments];
    copy[i] = { ...copy[i], [field]: val };
    setAssignments(copy);
  };

  const addRow = () => {
    setAssignments([...assignments, { name: "", score: 0, weight: 0 }]);
  };

  const calculate = () => {
    let weighted = 0;
    let totalWeight = 0;
    assignments.forEach((a) => {
      const s = parseFloat(a.score) || 0;
      const w = parseFloat(a.weight) || 0;
      weighted += s * w;
      totalWeight += w;
    });
    const grade = totalWeight > 0 ? weighted / totalWeight : 0;
    let letter = "F";
    if (grade >= 93) letter = "A";
    else if (grade >= 90) letter = "A-";
    else if (grade >= 87) letter = "B+";
    else if (grade >= 83) letter = "B";
    else if (grade >= 80) letter = "B-";
    else if (grade >= 77) letter = "C+";
    else if (grade >= 73) letter = "C";
    else if (grade >= 70) letter = "C-";
    else if (grade >= 67) letter = "D+";
    else if (grade >= 60) letter = "D";
    setResult({ grade: grade.toFixed(2), letter, totalWeight });
  };

  useEffect(() => {
    calculate();
  }, []);

  const clear = () => {
    setAssignments([{ name: "", score: 0, weight: 0 }]);
    setResult(null);
  };

  return (
    <div className="mc-page">
      <div className="mc-breadcrumb">
        <Link href="/">home</Link> / <Link href="/">other</Link> / grade calculator
      </div>

      <div className="mc-layout">
        <div className="mc-main">
          <h1 className="mc-title">Grade Calculator</h1>

          <div className="mc-infobar">
            <span className="mc-arrow">▼</span>
            Enter assignments, scores and weights then click Calculate
          </div>

          <div className="mc-body" style={{ flexDirection: "column" }}>
            <table className="mc-table" style={{ marginBottom: "12px" }}>
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Score (%)</th>
                  <th>Weight (%)</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        value={a.name}
                        onChange={(e) => update(i, "name", e.target.value)}
                        style={{ width: "130px", border: "1px solid #aaa", padding: "3px 5px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={a.score}
                        onChange={(e) => update(i, "score", e.target.value)}
                        style={{ width: "70px", border: "1px solid #aaa", padding: "3px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={a.weight}
                        onChange={(e) => update(i, "weight", e.target.value)}
                        style={{ width: "70px", border: "1px solid #aaa", padding: "3px" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginBottom: "12px" }}>
              <button className="mc-clear-btn" onClick={addRow}>
                + Add Row
              </button>
            </div>

            <div className="mc-btns">
              <button className="mc-calc-btn" onClick={calculate}>
                Calculate ▶
              </button>
              <button className="mc-clear-btn" onClick={clear}>
                Clear
              </button>
            </div>

            {result && (
              <div className="mc-results" style={{ marginTop: "16px" }}>
                <div className="mc-monthly-pay">
                  <span>Final Grade:</span>
                  <strong>{result.grade}% ({result.letter})</strong>
                </div>
                <table className="mc-summary">
                  <tbody>
                    <tr>
                      <td>Weighted Grade</td>
                      <td>{result.grade}%</td>
                    </tr>
                    <tr>
                      <td>Letter Grade</td>
                      <td>{result.letter}</td>
                    </tr>
                    <tr>
                      <td>Total Weight</td>
                      <td>{result.totalWeight}%</td>
                    </tr>
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
            <div className="mc-sidebar-title">Other Calculators</div>
            <div className="mc-sidebar-links">
              <div>
                <a href="/age-calculator">Age</a>
                <a href="/date-calculator">Date</a>
              </div>
              <div>
                <a href="/time-calculator">Time</a>
                <a href="/hours-calculator">Hours</a>
              </div>
              <div>
                <a href="/gpa-calculator">GPA</a>
                <a href="/grade-calculator">Grade</a>
              </div>
              <div>
                <a href="/concrete-calculator">Concrete</a>
                <a href="/subnet-calculator">Subnet</a>
              </div>
              <div>
                <a href="/password-generator">Password</a>
                <a href="/conversion-calculator">Conversion</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}