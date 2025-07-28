import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('初期ライフポイントが8000で表示される', () => {
    render(<App />)
    expect(screen.getByText('8000')).toBeInTheDocument()
  })

  it('タイトルが正しく表示される', () => {
    render(<App />)
    expect(screen.getByText('遊戯王 ライフポイント計算機')).toBeInTheDocument()
  })

  it('ダメージボタンをクリックするとライフポイントが減少する', () => {
    render(<App />)
    
    const damage100Button = screen.getByText('-100')
    fireEvent.click(damage100Button)
    
    expect(screen.getByText('7900')).toBeInTheDocument()
  })

  it('複数回ダメージを与えると累積してライフポイントが減少する', () => {
    render(<App />)
    
    const damage500Button = screen.getByText('-500')
    const damage300Button = screen.getByText('-300')
    
    fireEvent.click(damage500Button)
    fireEvent.click(damage300Button)
    
    expect(screen.getByText('7200')).toBeInTheDocument()
  })

  it('ライフポイントが0未満にならない', () => {
    render(<App />)
    
    const damage1000Button = screen.getByText('-1000')
    
    // 8000のライフポイントに対して9回1000ダメージを与える
    for (let i = 0; i < 9; i++) {
      fireEvent.click(damage1000Button)
    }
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('リセットボタンをクリックするとライフポイントが8000に戻る', () => {
    render(<App />)
    
    const damage1000Button = screen.getByText('-1000')
    const resetButton = screen.getByText('リセット')
    
    fireEvent.click(damage1000Button)
    expect(screen.getByText('7000')).toBeInTheDocument()
    
    fireEvent.click(resetButton)
    expect(screen.getByText('8000')).toBeInTheDocument()
  })

  it('全てのダメージボタンが表示される', () => {
    render(<App />)
    
    const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    
    damageValues.forEach(damage => {
      expect(screen.getByText(`-${damage}`)).toBeInTheDocument()
    })
  })
})