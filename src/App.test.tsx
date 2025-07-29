import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('両プレイヤーの初期ライフポイントが8000で表示される', () => {
    render(<App />)
    const lifePoints = screen.getAllByText('8000')
    expect(lifePoints).toHaveLength(2)
  })

  it('タイトルが正しく表示される', () => {
    render(<App />)
    expect(screen.getByText('遊戯王 ライフポイント計算機')).toBeInTheDocument()
  })

  it('両プレイヤーの名前が表示される', () => {
    render(<App />)
    expect(screen.getByText('プレイヤー1')).toBeInTheDocument()
    expect(screen.getByText('プレイヤー2')).toBeInTheDocument()
  })

  it('プレイヤー1のダメージボタンをクリックするとプレイヤー1のライフポイントのみ減少する', () => {
    render(<App />)
    
    const damage100Buttons = screen.getAllByText('-100')
    fireEvent.click(damage100Buttons[0]) // プレイヤー1のボタン
    
    const lifePoints = screen.getAllByText('8000')
    expect(lifePoints).toHaveLength(1) // プレイヤー2のみ8000
    expect(screen.getByText('7900')).toBeInTheDocument() // プレイヤー1は7900
  })

  it('プレイヤー2のダメージボタンをクリックするとプレイヤー2のライフポイントのみ減少する', () => {
    render(<App />)
    
    const damage100Buttons = screen.getAllByText('-100')
    fireEvent.click(damage100Buttons[1]) // プレイヤー2のボタン
    
    const lifePoints = screen.getAllByText('8000')
    expect(lifePoints).toHaveLength(1) // プレイヤー1のみ8000
    expect(screen.getByText('7900')).toBeInTheDocument() // プレイヤー2は7900
  })

  it('複数回ダメージを与えると累積してライフポイントが減少する', () => {
    render(<App />)
    
    const damage500Buttons = screen.getAllByText('-500')
    const damage300Buttons = screen.getAllByText('-300')
    
    fireEvent.click(damage500Buttons[0]) // プレイヤー1に500ダメージ
    fireEvent.click(damage300Buttons[0]) // プレイヤー1に300ダメージ
    
    expect(screen.getByText('7200')).toBeInTheDocument()
  })

  it('ライフポイントが0未満にならない', () => {
    render(<App />)
    
    const damage1000Buttons = screen.getAllByText('-1000')
    
    // プレイヤー1に9回1000ダメージを与える
    for (let i = 0; i < 9; i++) {
      fireEvent.click(damage1000Buttons[0])
    }
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('個別リセットボタンをクリックすると対象プレイヤーのライフポイントのみ8000に戻る', () => {
    render(<App />)
    
    const damage1000Buttons = screen.getAllByText('-1000')
    const resetButtons = screen.getAllByText('リセット')
    
    // 両プレイヤーにダメージを与える
    fireEvent.click(damage1000Buttons[0]) // プレイヤー1
    fireEvent.click(damage1000Buttons[1]) // プレイヤー2
    
    // プレイヤー1のみリセット
    fireEvent.click(resetButtons[0])
    
    const lifePoints = screen.getAllByText('8000')
    expect(lifePoints).toHaveLength(1) // プレイヤー1のみ8000
    expect(screen.getByText('7000')).toBeInTheDocument() // プレイヤー2は7000のまま
  })

  it('両プレイヤーをリセットボタンで両方のライフポイントが8000に戻る', () => {
    render(<App />)
    
    const damage1000Buttons = screen.getAllByText('-1000')
    const resetAllButton = screen.getByText('両プレイヤーをリセット')
    
    // 両プレイヤーにダメージを与える
    fireEvent.click(damage1000Buttons[0])
    fireEvent.click(damage1000Buttons[1])
    
    // 両プレイヤーをリセット
    fireEvent.click(resetAllButton)
    
    const lifePoints = screen.getAllByText('8000')
    expect(lifePoints).toHaveLength(2)
  })

  it('全てのダメージボタンが両プレイヤー分表示される', () => {
    render(<App />)
    
    const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    
    damageValues.forEach(damage => {
      const buttons = screen.getAllByText(`-${damage}`)
      expect(buttons).toHaveLength(2) // 各ダメージ値のボタンが2つずつ
    })
  })
})