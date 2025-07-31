import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import App from './App'

describe('App', () => {
  // プレイヤーのライフポイントを取得するヘルパー関数
  const getPlayerLifePoints = (playerName: string): string => {
    const lifePointsElement = screen.getByTestId(`life-points-${playerName}`)
    return lifePointsElement.textContent || ''
  }
  it('両プレイヤーの初期ライフポイントが8000で表示される', () => {
    render(<App />)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
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
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7900')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
  })

  it('プレイヤー2のダメージボタンをクリックするとプレイヤー2のライフポイントのみ減少する', () => {
    render(<App />)
    
    const damage100Buttons = screen.getAllByText('-100')
    fireEvent.click(damage100Buttons[1]) // プレイヤー2のボタン
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('7900')
  })

  it('複数回ダメージを与えると累積してライフポイントが減少する', () => {
    render(<App />)
    
    const damage500Buttons = screen.getAllByText('-500')
    const damage300Buttons = screen.getAllByText('-300')
    
    fireEvent.click(damage500Buttons[0]) // プレイヤー1に500ダメージ
    fireEvent.click(damage300Buttons[0]) // プレイヤー1に300ダメージ
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7200')
  })

  it('ライフポイントが0未満にならない', () => {
    render(<App />)
    
    const damage1000Buttons = screen.getAllByText('-1000')
    
    // プレイヤー1に9回1000ダメージを与える
    for (let i = 0; i < 9; i++) {
      fireEvent.click(damage1000Buttons[0])
    }
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('0')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
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
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('7000')
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
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
  })

  it('全てのダメージボタンが両プレイヤー分表示される', () => {
    render(<App />)
    
    const damageValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    
    damageValues.forEach(damage => {
      const buttons = screen.getAllByText(`-${damage}`)
      expect(buttons).toHaveLength(2) // 各ダメージ値のボタンが2つずつ
    })
  })

  it('カスタムダメージボタンが両プレイヤー分表示される', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    expect(customDamageButtons).toHaveLength(2)
  })

  it('カスタムダメージボタンをクリックするとモーダルが表示される', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0]) // プレイヤー1のボタン
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    expect(within(modal).getByText('プレイヤー1へのダメージ')).toBeInTheDocument()
    expect(within(modal).getByText('C')).toBeInTheDocument()
    expect(within(modal).getByText('00')).toBeInTheDocument()
    expect(within(modal).getByText('決定')).toBeInTheDocument()
    expect(within(modal).getByText('キャンセル')).toBeInTheDocument()
  })

  it('モーダルで数値を入力して決定するとダメージが適用される', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0])
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    
    // 2500を入力
    fireEvent.click(within(modal).getByText('2'))
    fireEvent.click(within(modal).getByText('5'))
    fireEvent.click(within(modal).getByText('00'))
    
    fireEvent.click(within(modal).getByText('決定'))
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('5500')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
  })

  it('モーダルでキャンセルするとダメージが適用されない', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0])
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    
    fireEvent.click(within(modal).getByText('1'))
    fireEvent.click(within(modal).getByText('0'))
    fireEvent.click(within(modal).getByText('0'))
    fireEvent.click(within(modal).getByText('0'))
    
    fireEvent.click(within(modal).getByText('キャンセル'))
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
  })

  it('モーダルでCボタンをクリックすると入力がクリアされる', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0])
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    const display = screen.getByTestId('damage-input-display-プレイヤー1')
    
    fireEvent.click(within(modal).getByText('1'))
    fireEvent.click(within(modal).getByText('2'))
    fireEvent.click(within(modal).getByText('3'))
    
    // 表示が123になることを確認
    expect(display.textContent).toBe('123')
    
    fireEvent.click(within(modal).getByText('C'))
    
    // 表示が0に戻ることを確認
    expect(display.textContent).toBe('0')
  })

  it('5桁を超える入力はできない', () => {
    render(<App />)
    
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0])
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    const display = screen.getByTestId('damage-input-display-プレイヤー1')
    
    // 5桁入力
    fireEvent.click(within(modal).getByText('1'))
    fireEvent.click(within(modal).getByText('2'))
    fireEvent.click(within(modal).getByText('3'))
    fireEvent.click(within(modal).getByText('4'))
    fireEvent.click(within(modal).getByText('5'))
    
    expect(display.textContent).toBe('12345')
    
    // 6桁目は入力されない
    fireEvent.click(within(modal).getByText('6'))
    expect(display.textContent).toBe('12345')
  })

  it('戻るボタンが表示される', () => {
    render(<App />)
    
    const undoButton = screen.getByText('戻る')
    expect(undoButton).toBeInTheDocument()
  })

  it('初期状態では戻るボタンが無効化されている', () => {
    render(<App />)
    
    const undoButton = screen.getByText('戻る')
    expect(undoButton).toBeDisabled()
  })

  it('ダメージを与えた後、戻るボタンで元に戻せる', () => {
    render(<App />)
    
    // プレイヤー1に500ダメージ
    const damage500Buttons = screen.getAllByText('-500')
    fireEvent.click(damage500Buttons[0])
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7500')
    
    // 戻るボタンをクリック
    const undoButton = screen.getByText('戻る')
    expect(undoButton).not.toBeDisabled()
    fireEvent.click(undoButton)
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
  })

  it('複数回の操作を順番に戻せる', () => {
    render(<App />)
    
    // プレイヤー1に300ダメージ
    const damage300Buttons = screen.getAllByText('-300')
    fireEvent.click(damage300Buttons[0])
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7700')
    
    // プレイヤー2に500ダメージ
    const damage500Buttons = screen.getAllByText('-500')
    fireEvent.click(damage500Buttons[1])
    expect(getPlayerLifePoints('プレイヤー2')).toBe('7500')
    
    // プレイヤー1に200ダメージ
    const damage200Buttons = screen.getAllByText('-200')
    fireEvent.click(damage200Buttons[0])
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7500')
    
    const undoButton = screen.getByText('戻る')
    
    // 1回目の戻る：プレイヤー1の200ダメージを取り消し
    fireEvent.click(undoButton)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7700')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('7500')
    
    // 2回目の戻る：プレイヤー2の500ダメージを取り消し
    fireEvent.click(undoButton)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7700')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
    
    // 3回目の戻る：プレイヤー1の300ダメージを取り消し
    fireEvent.click(undoButton)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
    
    // 履歴がなくなったので戻るボタンは無効化される
    expect(undoButton).toBeDisabled()
  })

  it('リセット操作も戻せる', () => {
    render(<App />)
    
    // プレイヤー1に1000ダメージ
    const damage1000Buttons = screen.getAllByText('-1000')
    fireEvent.click(damage1000Buttons[0])
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7000')
    
    // プレイヤー1をリセット
    const resetButtons = screen.getAllByText('リセット')
    fireEvent.click(resetButtons[0])
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    
    // 戻るボタンでリセット前の状態に戻る
    const undoButton = screen.getByText('戻る')
    fireEvent.click(undoButton)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('7000')
  })

  it('両プレイヤーをリセットすると履歴がクリアされる', () => {
    render(<App />)
    
    // 両プレイヤーにダメージを与える
    const damage500Buttons = screen.getAllByText('-500')
    fireEvent.click(damage500Buttons[0])
    fireEvent.click(damage500Buttons[1])
    
    const undoButton = screen.getByText('戻る')
    expect(undoButton).not.toBeDisabled()
    
    // 両プレイヤーをリセット
    const resetAllButton = screen.getByText('両プレイヤーをリセット')
    fireEvent.click(resetAllButton)
    
    // 履歴がクリアされて戻るボタンが無効化される
    expect(undoButton).toBeDisabled()
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
    expect(getPlayerLifePoints('プレイヤー2')).toBe('8000')
  })

  it('カスタムダメージも戻せる', () => {
    render(<App />)
    
    // プレイヤー1にカスタムダメージ2500
    const customDamageButtons = screen.getAllByText('-')
    fireEvent.click(customDamageButtons[0])
    
    const modal = screen.getByTestId('damage-modal-プレイヤー1')
    fireEvent.click(within(modal).getByText('2'))
    fireEvent.click(within(modal).getByText('5'))
    fireEvent.click(within(modal).getByText('00'))
    fireEvent.click(within(modal).getByText('決定'))
    
    expect(getPlayerLifePoints('プレイヤー1')).toBe('5500')
    
    // 戻るボタンで元に戻す
    const undoButton = screen.getByText('戻る')
    fireEvent.click(undoButton)
    expect(getPlayerLifePoints('プレイヤー1')).toBe('8000')
  })
})