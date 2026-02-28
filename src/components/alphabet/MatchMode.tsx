import React, { useState, useMemo } from 'react'
import {ChevronLeft, Trophy} from 'lucide-react'

interface MatchModeProps {
  data: { char: string; romaji: string }[]
  alphabetType: 'hiragana' | 'katakana'
  onBack: () => void
}

export default function MatchMode({ data, alphabetType, onBack }: MatchModeProps) {
  // Generate stable shuffled data once
  const gameData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5).slice(0, 8)
  }, [])

  const charList = useMemo(() => {
    return gameData.map(item => item.char).sort(() => Math.random() - 0.5)
  }, [gameData])

  const romajiList = useMemo(() => {
    return gameData.map(item => item.romaji).sort(() => Math.random() - 0.5)
  }, [gameData])

  const [selectedChar, setSelectedChar] = useState<string | null>(null)
  const [selectedRomaji, setSelectedRomaji] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [score, setScore] = useState(0)

  const handleCharClick = (char: string) => {
    if (matched.includes(char)) return
    
    if (selectedChar === char) {
      setSelectedChar(null)
      return
    }
    
    setSelectedChar(char)
    
    if (selectedRomaji) {
      checkMatch(char, selectedRomaji)
    }
  }

  const handleRomajiClick = (romaji: string) => {
    if (matched.includes(romaji)) return
    
    if (selectedRomaji === romaji) {
      setSelectedRomaji(null)
      return
    }
    
    setSelectedRomaji(romaji)
    
    if (selectedChar) {
      checkMatch(selectedChar, romaji)
    }
  }

  const checkMatch = (char: string, romaji: string) => {
    const pair = gameData.find(item => item.char === char && item.romaji === romaji)
    
    if (pair) {
      setMatched([...matched, char, romaji])
      setScore(score + 1)
      setSelectedChar(null)
      setSelectedRomaji(null)
      
      if (matched.length + 2 === gameData.length * 2) {
        setTimeout(() => {
          alert(`Chúc mừng! Bạn đã hoàn thành với ${gameData.length} cặp đúng!`)
          onBack()
        }, 500)
      }
    } else {
      setTimeout(() => {
        setSelectedChar(null)
        setSelectedRomaji(null)
      }, 500)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#765534] hover:text-[#FEC900] mb-6 font-semibold"
        >
          <ChevronLeft size={24} />
          Quay lại
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#765534]">
              Ghép Từ {alphabetType === 'hiragana' ? 'Hiragana' : 'Katakana'}
            </h2>
            <div className="flex items-center gap-2 text-lg font-semibold text-[#765534]">
              <Trophy className="text-[#FEC900]" size={24} />
              {score}/{gameData.length}
            </div>
          </div>

          <p className="text-center text-gray-600 mb-8 text-lg">
            Kết nối ký tự với cách đọc đúng của nó
          </p>

          <div className="grid grid-cols-2 gap-8">
            {/* Characters Column */}
            <div className="space-y-3">
              <h3 className="text-center font-semibold text-[#765534] mb-4">Ký Tự</h3>
              {charList.map((char, index) => {
                const isMatched = matched.includes(char)
                const isSelected = selectedChar === char
                
                return (
                  <button
                    key={index}
                    onClick={() => handleCharClick(char)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-xl text-3xl font-bold transition-all ${
                      isMatched
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#FEC900] text-[#765534] scale-105 shadow-lg'
                        : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900] hover:scale-105'
                    }`}
                  >
                    {char}
                  </button>
                )
              })}
            </div>

            {/* Romaji Column */}
            <div className="space-y-3">
              <h3 className="text-center font-semibold text-[#765534] mb-4">Cách Đọc</h3>
              {romajiList.map((romaji, index) => {
                const isMatched = matched.includes(romaji)
                const isSelected = selectedRomaji === romaji
                
                return (
                  <button
                    key={index}
                    onClick={() => handleRomajiClick(romaji)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-xl text-2xl font-bold transition-all ${
                      isMatched
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#FEC900] text-[#765534] scale-105 shadow-lg'
                        : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900] hover:scale-105'
                    }`}
                  >
                    {romaji}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
