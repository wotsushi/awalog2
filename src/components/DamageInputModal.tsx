import { useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`

const ModalHeader = styled.h3`
  margin: 0 0 1.5rem 0;
  text-align: center;
  color: #333;
`

const Display = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  padding: 1rem;
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #333;
`

const NumPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const NumButton = styled.button`
  background: #e0e0e0;
  border: none;
  border-radius: 10px;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;

  &:hover {
    background: #d0d0d0;
    transform: scale(0.98);
  }

  &:active {
    transform: scale(0.95);
  }
`

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`

const BottomButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`

const ClearButton = styled(NumButton)`
  background: #ffeb3b;
  
  &:hover {
    background: #fdd835;
  }
`

const ConfirmButton = styled(NumButton)`
  background: #ff6b6b;
  color: white;
  
  &:hover {
    background: #ff5252;
  }
`

const CancelButton = styled(NumButton)`
  background: #9e9e9e;
  color: white;
  
  &:hover {
    background: #757575;
  }
`

interface DamageInputModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (damage: number) => void
  playerName: string
}

export function DamageInputModal({ isOpen, onClose, onConfirm, playerName }: DamageInputModalProps) {
  const [inputValue, setInputValue] = useState('')

  const handleNumberClick = (num: number) => {
    if (inputValue.length < 5) { // 最大5桁まで
      setInputValue(prev => prev + num)
    }
  }

  const handleDoubleZero = () => {
    if (inputValue.length > 0 && inputValue.length <= 3) { // 00を追加しても5桁以内
      setInputValue(prev => prev + '00')
    }
  }

  const handleClear = () => {
    setInputValue('')
  }

  const handleConfirm = () => {
    const damage = parseInt(inputValue)
    if (damage > 0) {
      onConfirm(damage)
      setInputValue('')
      onClose()
    }
  }

  const handleClose = () => {
    setInputValue('')
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()} data-testid={`damage-modal-${playerName}`}>
        <ModalHeader>{playerName}へのダメージ</ModalHeader>
        <Display data-testid={`damage-input-display-${playerName}`}>{inputValue || '0'}</Display>
        
        <NumPad>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <NumButton key={num} onClick={() => handleNumberClick(num)}>
              {num}
            </NumButton>
          ))}
        </NumPad>
        
        <ActionButtons>
          <ClearButton onClick={handleClear}>
            C
          </ClearButton>
          <NumButton onClick={() => handleNumberClick(0)}>
            0
          </NumButton>
          <NumButton onClick={handleDoubleZero}>
            00
          </NumButton>
        </ActionButtons>
        
        <BottomButtons>
          <CancelButton onClick={handleClose}>
            キャンセル
          </CancelButton>
          <ConfirmButton onClick={handleConfirm}>
            決定
          </ConfirmButton>
        </BottomButtons>
      </ModalContent>
    </ModalOverlay>
  )
}