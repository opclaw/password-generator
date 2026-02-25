'use client'

import { useState, useCallback, useEffect } from 'react'

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

  useEffect(() => {
    generatePassword()
  }, [])

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [password])

  const getStrength = () => {
    let score = 0
    if (length >= 8) score++
    if (length >= 12) score++
    if (options.uppercase) score++
    if (options.lowercase) score++
    if (options.numbers) score++
    if (options.symbols) score++
    
    if (score < 3) return { text: 'Weak', color: '#ef4444', bg: '#fef2f2' }
    if (score < 5) return { text: 'Medium', color: '#f59e0b', bg: '#fffbeb' }
    return { text: 'Strong', color: '#10b981', bg: '#ecfdf5' }
  }

  const strength = getStrength()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-2xl shadow-lg">🔐</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Password Generator</h1>
                <p className="text-sm text-slate-500">Secure passwords</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 text-3xl shadow-xl mb-6">🔐</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Password Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Generate secure random passwords with custom length and character options.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          {/* Password Display */}
          <div className="bg-slate-900 rounded-xl p-6 mb-6">
            <div className="font-mono text-2xl text-white text-center break-all min-h-[48px] flex items-center justify-center">
              {password || 'Click Generate'}
            </div>
          </div>

          {password && password !== 'Select at least one option' && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <div 
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: strength.bg, color: strength.color }}
              >
                Strength: {strength.text}
              </div>
              <button onClick={copyPassword} className="btn-ghost">
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          )}

          {/* Length Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password Length: <span className="text-indigo-600 font-bold">{length}</span>
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(options).map(([key, value]) => (
              <label key={key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-slate-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>

          <button onClick={generatePassword} className="w-full btn-primary bg-red-600 hover:bg-red-700 py-4 text-lg">
            🔄 Generate Password
          </button>
        </div>
      </main>

      <section className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Secure', desc: 'Generated locally in your browser. Never sent to any server.' },
              { icon: '⚡', title: 'Fast', desc: 'Instant password generation with a single click.' },
              { icon: '🎯', title: 'Customizable', desc: 'Choose length and character types for your needs.' },
            ].map((f, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
