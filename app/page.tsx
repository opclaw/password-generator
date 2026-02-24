'use client'

import { useState, useCallback } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    }

    let validChars = ''
    if (options.uppercase) validChars += chars.uppercase
    if (options.lowercase) validChars += chars.lowercase
    if (options.numbers) validChars += chars.numbers
    if (options.symbols) validChars += chars.symbols

    if (validChars === '') {
      setPassword('Select at least one option')
      return
    }

    let result = ''
    for (let i = 0; i < length; i++) {
      result += validChars.charAt(Math.floor(Math.random() * validChars.length))
    }
    setPassword(result)
  }, [length, options])

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (length >= 8) score++
    if (length >= 12) score++
    if (options.uppercase) score++
    if (options.lowercase) score++
    if (options.numbers) score++
    if (options.symbols) score++
    
    if (score < 3) return { text: 'Weak', color: '#e53e3e' }
    if (score < 5) return { text: 'Medium', color: '#d69e2e' }
    return { text: 'Strong', color: '#38a169' }
  }

  const strength = getStrength()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔐 Password Generator</h1>
      
      <div className={styles.passwordDisplay}>
        <div className={styles.password}>{password || 'Click Generate'}</div>
        {password && password !== 'Select at least one option' && (
          <button onClick={copyPassword} className={styles.copyBtn}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        )}
      </div>

      {password && password !== 'Select at least one option' && (
        <div className={styles.strength} style={{ color: strength.color }}>
          Strength: {strength.text}
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.lengthControl}>
          <label>Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.options}>
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className={styles.option}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <button onClick={generatePassword} className={styles.generateBtn}>
        🔄 Generate Password
      </button>
    </div>
  )
}