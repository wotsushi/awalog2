import { useState } from 'react'
import './App.css'

function App() {
  const [lifePoints, setLifePoints] = useState(8000)

  const takeDamage = (damage: number) => {
    setLifePoints(prev => Math.max(0, prev - damage))
  }

  const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

  return (
    <div className="app">
      <h1>遊戯王 ライフポイント計算機</h1>
      
      <div className="life-points-display">
        <h2>ライフポイント</h2>
        <div className="life-points-value">{lifePoints}</div>
      </div>

      <div className="damage-buttons">
        {damageValues.map(damage => (
          <button
            key={damage}
            className="damage-button"
            onClick={() => takeDamage(damage)}
          >
            -{damage}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={() => setLifePoints(8000)}>
        リセット
      </button>
    </div>
  )
}

export default App
