import React, { useState } from 'react';
import './App.css';

function App() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [fertileWindow, setFertileWindow] = useState<{ start: string; end: string; ovulation: string } | null>(null);

  const calculateFertileWindow = () => {
    const lastPeriod = new Date(lastPeriodDate);
    
    // Calculate ovulation day (typically 14 days before next period)
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + cycleLength - 14);
    
    // Fertile window is typically 5 days before and 1 day after ovulation
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    setFertileWindow({
      start: fertileStart.toLocaleDateString(),
      end: fertileEnd.toLocaleDateString(),
      ovulation: ovulationDate.toLocaleDateString(),
    });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <h1 className="title">Fertility Tracker</h1>
          <p className="subtitle">Track your cycle and find your most fertile days</p>
          
          <div className="form-container">
            <div className="input-group">
              <label className="label">When did your last period start?</label>
              <input
                type="date"
                className="input-field"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="label">How long is your typical cycle?</label>
              <div className="cycle-input">
                <input
                  type="number"
                  className="input-field"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value))}
                />
                <span className="days-label">days</span>
              </div>
              <span className="helper-text">Most cycles are between 21-35 days</span>
            </div>

            <button className="calculate-btn" onClick={calculateFertileWindow}>
              Calculate Fertile Window
            </button>
          </div>

          {fertileWindow && (
            <div className="results-card">
              <h2 className="results-title">Your Fertility Window</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="date-chip start">
                    <span className="date">{fertileWindow.start}</span>
                    <span className="label">Fertile Window Starts</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="date-chip ovulation">
                    <span className="date">{fertileWindow.ovulation}</span>
                    <span className="label">Predicted Ovulation</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="date-chip end">
                    <span className="date">{fertileWindow.end}</span>
                    <span className="label">Fertile Window Ends</span>
                  </div>
                </div>
              </div>
              
              <div className="info-box">
                <h3 className="info-title">📝 Good to Know</h3>
                <ul className="info-list">
                  <li>Your most fertile days are 2-3 days before ovulation and the day of ovulation</li>
                  <li>Having intercourse every 1-2 days during your fertile window maximizes chances of conception</li>
                  <li>Ovulation typically occurs 14 days before your next period</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
