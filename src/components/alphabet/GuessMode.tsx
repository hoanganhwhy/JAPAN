import React, { useState, useEffect, useMemo } from 'react'
import {ChevronLeft, Check, X} from 'lucide-react'

interface GuessModeProps {
  data: { char: string; romaji: string }[]
  alphabetType: 'hiragana' | 'katakana'
  onBack: () => void
}

export default function GuessMode({ data, alphabetType, onBack }: GuessModeProps) {
  // Shuffle data once when component mounts
  const shuffledData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    generateOptions()
  }, [currentIndex])

  const generateOptions = () => {
    const correct = shuffledData[currentIndex].romaji
    const allRomaji = shuffledData.map(d => d.romaji).filter(r => r !== correct)
    const shuffled = allRomaji.sort(() => Math.random() - 0.5)
    const wrongOptions = shuffled.slice(0, 3)
    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    if (answer === shuffledData[currentIndex].romaji) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < shuffledData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      alert(`Hoàn thành! Điểm của bạn: ${score + (selectedAnswer === shuffledData[currentIndex].romaji ? 1 : 0)}/${shuffledData.length}`)
      onBack()
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
              Đoán Chữ {alphabetType === 'hiragana' ? 'Hiragana' : 'Katakana'}
            </h2>
            <div className="text-lg font-semibold text-[#765534]">
              {currentIndex + 1}/{shuffledData.length} | Điểm: {score}
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="text-8xl font-bold text-[#765534] mb-6">
              {shuffledData[currentIndex].char}
            </div>
            <p className="text-xl text-gray-600">Chữ này đọc là gì?</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {options.map((option, index) => {
              const isCorrect = option === shuffledData[currentIndex].romaji
              const isSelected = option === selectedAnswer
              let buttonClass = 'p-6 rounded-xl text-xl font-semibold transition-all '

              if (showResult) {
                if (isSelected && isCorrect) {
                  buttonClass += 'bg-green-100 border-4 border-green-500 text-green-700'
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-100 border-4 border-red-500 text-red-700'
                } else if (isCorrect) {
                  buttonClass += 'bg-green-100 border-4 border-green-500 text-green-700'
                } else {
                  buttonClass += 'bg-gray-100 text-gray-400'
                }
              } else {
                buttonClass += 'bg-[#FEE173] hover:bg-[#FEC900] text-[#765534] hover:scale-105'
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showResult && isCorrect && <Check size={24} />}
                    {showResult && isSelected && !isCorrect && <X size={24} />}
                    {option}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-[#FEC900] text-[#765534] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FEE173] transition-colors"
              >
                {currentIndex < shuffledData.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
