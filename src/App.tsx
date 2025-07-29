import { useState } from 'react'
import styled from 'styled-components'
import { PlayerSection } from './components/PlayerSection'

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`

const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ResetAllButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

function App() {
  const [player1LifePoints, setPlayer1LifePoints] = useState(8000)
  const [player2LifePoints, setPlayer2LifePoints] = useState(8000)

  const resetAll = () => {
    setPlayer1LifePoints(8000)
    setPlayer2LifePoints(8000)
  }

  return (
    <AppContainer>
      <Title>遊戯王 ライフポイント計算機</Title>
      
      <PlayersContainer>
        <PlayerSection
          playerName="プレイヤー1"
          lifePoints={player1LifePoints}
          onDamage={(damage) => setPlayer1LifePoints(prev => Math.max(0, prev - damage))}
          onReset={() => setPlayer1LifePoints(8000)}
          playerColor="primary"
        />
        
        <PlayerSection
          playerName="プレイヤー2"
          lifePoints={player2LifePoints}
          onDamage={(damage) => setPlayer2LifePoints(prev => Math.max(0, prev - damage))}
          onReset={() => setPlayer2LifePoints(8000)}
          playerColor="secondary"
        />
      </PlayersContainer>

      <ResetAllButton onClick={resetAll}>
        両プレイヤーをリセット
      </ResetAllButton>
    </AppContainer>
  )
}

export default App