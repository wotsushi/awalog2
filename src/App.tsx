import { useState } from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`

const LifePointsDisplay = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

const LifePointsLabel = styled.h2`
  color: white;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`

const LifePointsValue = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const DamageButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const DamageButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const ResetButton = styled.button`
  background: #4ecdc4;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #45b7aa;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

function App() {
  const [lifePoints, setLifePoints] = useState(8000)

  const takeDamage = (damage: number) => {
    setLifePoints(prev => Math.max(0, prev - damage))
  }

  const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

  return (
    <AppContainer>
      <Title>遊戯王 ライフポイント計算機</Title>
      
      <LifePointsDisplay>
        <LifePointsLabel>ライフポイント</LifePointsLabel>
        <LifePointsValue>{lifePoints}</LifePointsValue>
      </LifePointsDisplay>

      <DamageButtonsGrid>
        {damageValues.map(damage => (
          <DamageButton
            key={damage}
            onClick={() => takeDamage(damage)}
          >
            -{damage}
          </DamageButton>
        ))}
      </DamageButtonsGrid>

      <ResetButton onClick={() => setLifePoints(8000)}>
        リセット
      </ResetButton>
    </AppContainer>
  )
}

export default App