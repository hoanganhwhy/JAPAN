import React, { useState, useMemo } from 'react'
import {ChevronLeft, ChevronRight, RotateCcw} from 'lucide-react'

interface FlashcardModeProps {
  data: { char: string; romaji: string }[]
  alphabetType: 'hiragana' | 'katakana'
  onBack: () => void
}

export default function FlashcardMode({ data, alphabetType, onBack }: FlashcardModeProps) {
  // Shuffle data once when component mounts to keep it stable
  const shuffledData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5)
  }, [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learned, setLearned] = useState<number[]>([])

  const handleNext = () => {
    if (currentIndex < shuffledData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!learned.includes(currentIndex)) {
      setLearned([...learned, currentIndex])
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setLearned([])
  }

  const progress = ((learned.length / shuffledData.length) * 100).toFixed(0)

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
              Flashcard {alphabetType === 'hiragana' ? 'Hiragana' : 'Katakana'}
            </h2>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-[#765534] hover:text-[#FEC900] font-semibold"
            >
              <RotateCcw size={20} />
              Bắt đầu lại
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ: {learned.length}/{shuffledData.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#FEC900] h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div className="mb-8">
            <div className="text-center mb-4 text-gray-600">
              Thẻ {currentIndex + 1}/{shuffledData.length}
            </div>
            
            <div
              onClick={handleFlip}
              className="relative h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Side */}
                <div 
                  className="absolute w-full h-full"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#FEE173] to-[#FEC900] rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-9xl font-bold text-[#765534] mb-4">
                        {shuffledData[currentIndex].char}
                      </div>
                      <p className="text-gray-600 text-lg">Nhấn để xem cách đọc</p>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold text-[#765534] mb-6">
                        {shuffledData[currentIndex].romaji}
                      </div>
                      <div className="text-5xl text-gray-700 mb-4">
                        {shuffledData[currentIndex].char}
                      </div>
                      <p className="text-gray-600 text-lg">Nhấn để lật lại</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900]'
              }`}
            >
              <ChevronLeft size={20} />
              Thẻ trước
            </button>

            <div className="flex gap-2">
              {shuffledData.slice(Math.max(0, currentIndex - 2), Math.min(shuffledData.length, currentIndex + 3)).map((_, idx) => {
                const realIndex = Math.max(0, currentIndex - 2) + idx
                return (
                  <div
                    key={realIndex}
                    className={`w-3 h-3 rounded-full transition-all ${
                      realIndex === currentIndex
                        ? 'bg-[#FEC900] w-8'
                        : learned.includes(realIndex)
                        ? 'bg-green-400'
                        : 'bg-gray-300'
                    }`}
                  />
                )
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledData.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentIndex === shuffledData.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900]'
              }`}
            >
              Thẻ sau
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
