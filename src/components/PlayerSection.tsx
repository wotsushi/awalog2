import { useState } from 'react'
import styled from 'styled-components'
import { DamageInputModal } from './DamageInputModal'
import { HealInputModal } from './HealInputModal'

const Section = styled.div`
  background: #f5f5f5;
  border-radius: 20px;
  padding: 1.5rem;
`

const PlayerName = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

const LifePointsDisplay = styled.div<{ playerColor: 'primary' | 'secondary' }>`
  background: ${props => props.playerColor === 'primary' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`

const LifePointsLabel = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`

const LifePointsValue = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const DamageButtonsContainer = styled.div`
  margin-bottom: 1rem;
`

const CustomDamageButton = styled.button`
  background: #9c27b0;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background: #7b1fa2;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

const CustomButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const CustomHealButton = styled(CustomDamageButton)`
  background: #4caf50;

  &:hover {
    background: #45a049;
  }
`

const DamageButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const DamageButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  font-size: 1rem;
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
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;

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

interface PlayerSectionProps {
  playerName: string
  lifePoints: number
  onDamage: (damage: number) => void
  onHeal: (heal: number) => void
  onReset: () => void
  playerColor: 'primary' | 'secondary'
}

const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

export function PlayerSection({ playerName, lifePoints, onDamage, onHeal, onReset, playerColor }: PlayerSectionProps) {
  const [isDamageModalOpen, setIsDamageModalOpen] = useState(false)
  const [isHealModalOpen, setIsHealModalOpen] = useState(false)

  return (
    <Section>
      <PlayerName>{playerName}</PlayerName>
      <LifePointsDisplay playerColor={playerColor}>
        <LifePointsLabel>ライフポイント</LifePointsLabel>
        <LifePointsValue data-testid={`life-points-${playerName}`}>{lifePoints}</LifePointsValue>
      </LifePointsDisplay>

      <DamageButtonsContainer>
        <CustomButtonsContainer>
          <CustomDamageButton onClick={() => setIsDamageModalOpen(true)}>
            -
          </CustomDamageButton>
          <CustomHealButton onClick={() => setIsHealModalOpen(true)}>
            +
          </CustomHealButton>
        </CustomButtonsContainer>
        
        <DamageButtonsGrid>
          {damageValues.map(damage => (
            <DamageButton
              key={damage}
              onClick={() => onDamage(damage)}
            >
              -{damage}
            </DamageButton>
          ))}
        </DamageButtonsGrid>
      </DamageButtonsContainer>

      <ResetButton onClick={onReset}>
        リセット
      </ResetButton>

      <DamageInputModal
        isOpen={isDamageModalOpen}
        onClose={() => setIsDamageModalOpen(false)}
        onConfirm={onDamage}
        playerName={playerName}
      />
      <HealInputModal
        isOpen={isHealModalOpen}
        onClose={() => setIsHealModalOpen(false)}
        onConfirm={onHeal}
        playerName={playerName}
      />
    </Section>
  )
}