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

const UndoButton = styled.button`
  background: #17a2b8;
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
  margin-left: 1rem;

  &:hover {
    background: #138496;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #c6c6c6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const RedoButton = styled.button`
  background: #28a745;
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
  margin-left: 1rem;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #c6c6c6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

type HistoryEntry = {
  player: 'player1' | 'player2'
  previousValue: number
  newValue: number
}

function App() {
  const [player1LifePoints, setPlayer1LifePoints] = useState(8000)
  const [player2LifePoints, setPlayer2LifePoints] = useState(8000)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [redoHistory, setRedoHistory] = useState<HistoryEntry[]>([])

  const handlePlayer1Damage = (damage: number) => {
    const previousValue = player1LifePoints
    const newValue = Math.max(0, previousValue - damage)
    setPlayer1LifePoints(newValue)
    setHistory(prev => [...prev, { player: 'player1', previousValue, newValue }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const handlePlayer2Damage = (damage: number) => {
    const previousValue = player2LifePoints
    const newValue = Math.max(0, previousValue - damage)
    setPlayer2LifePoints(newValue)
    setHistory(prev => [...prev, { player: 'player2', previousValue, newValue }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const handlePlayer1Heal = (heal: number) => {
    const previousValue = player1LifePoints
    const newValue = previousValue + heal
    setPlayer1LifePoints(newValue)
    setHistory(prev => [...prev, { player: 'player1', previousValue, newValue }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const handlePlayer2Heal = (heal: number) => {
    const previousValue = player2LifePoints
    const newValue = previousValue + heal
    setPlayer2LifePoints(newValue)
    setHistory(prev => [...prev, { player: 'player2', previousValue, newValue }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const handlePlayer1Reset = () => {
    const previousValue = player1LifePoints
    setPlayer1LifePoints(8000)
    setHistory(prev => [...prev, { player: 'player1', previousValue, newValue: 8000 }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const handlePlayer2Reset = () => {
    const previousValue = player2LifePoints
    setPlayer2LifePoints(8000)
    setHistory(prev => [...prev, { player: 'player2', previousValue, newValue: 8000 }])
    setRedoHistory([]) // 新しい操作を行ったらredoHistoryをクリア
  }

  const resetAll = () => {
    setPlayer1LifePoints(8000)
    setPlayer2LifePoints(8000)
    setHistory([])
    setRedoHistory([])
  }

  const handleUndo = () => {
    if (history.length === 0) return
    
    const lastEntry = history[history.length - 1]
    if (lastEntry.player === 'player1') {
      setPlayer1LifePoints(lastEntry.previousValue)
    } else {
      setPlayer2LifePoints(lastEntry.previousValue)
    }
    
    setHistory(prev => prev.slice(0, -1))
    setRedoHistory(prev => [...prev, lastEntry])
  }

  const handleRedo = () => {
    if (redoHistory.length === 0) return
    
    const lastEntry = redoHistory[redoHistory.length - 1]
    if (lastEntry.player === 'player1') {
      setPlayer1LifePoints(lastEntry.newValue)
    } else {
      setPlayer2LifePoints(lastEntry.newValue)
    }
    
    setHistory(prev => [...prev, lastEntry])
    setRedoHistory(prev => prev.slice(0, -1))
  }

  return (
    <AppContainer>
      <Title>遊戯王 ライフポイント計算機</Title>
      
      <PlayersContainer>
        <PlayerSection
          playerName="プレイヤー1"
          lifePoints={player1LifePoints}
          onDamage={handlePlayer1Damage}
          onHeal={handlePlayer1Heal}
          onReset={handlePlayer1Reset}
          playerColor="primary"
        />
        
        <PlayerSection
          playerName="プレイヤー2"
          lifePoints={player2LifePoints}
          onDamage={handlePlayer2Damage}
          onHeal={handlePlayer2Heal}
          onReset={handlePlayer2Reset}
          playerColor="secondary"
        />
      </PlayersContainer>

      <ButtonContainer>
        <ResetAllButton onClick={resetAll}>
          両プレイヤーをリセット
        </ResetAllButton>
        <UndoButton onClick={handleUndo} disabled={history.length === 0}>
          戻る
        </UndoButton>
        <RedoButton onClick={handleRedo} disabled={redoHistory.length === 0}>
          進む
        </RedoButton>
      </ButtonContainer>
    </AppContainer>
  )
}

export default App