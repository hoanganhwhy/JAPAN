import React, { useState, useEffect } from 'react'
import {ChevronLeft, ChevronRight, RotateCcw} from 'lucide-react'

interface KanjiItem {
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  example: string
}

interface Props {
  kanjiData: KanjiItem[]
  onBack: () => void
}

export default function KanjiFlashcardMode({ kanjiData, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledKanji, setShuffledKanji] = useState<KanjiItem[]>([])

  useEffect(() => {
    setShuffledKanji([...kanjiData].sort(() => Math.random() - 0.5))
  }, [kanjiData])

  const handleNext = () => {
    if (currentIndex < shuffledKanji.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleShuffle = () => {
    setShuffledKanji([...kanjiData].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  if (shuffledKanji.length === 0) {
    return <div className="text-center py-12">Đang tải...</div>
  }

  const currentKanji = shuffledKanji[currentIndex]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#765534] hover:text-[#FEC900] mb-6 font-semibold"
        >
          <ChevronLeft size={24} />
          Quay lại
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#765534]">Flashcard Kanji</h2>
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 text-[#765534] hover:text-[#FEC900] font-semibold"
            >
              <RotateCcw size={20} />
              Xáo Trộn
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="text-sm text-gray-600">
              Thẻ {currentIndex + 1}/{shuffledKanji.length}
            </div>
          </div>

          {/* Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full aspect-[3/2] mb-8 cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-8xl md:text-9xl font-bold text-[#765534] mb-6">
                  {currentKanji.kanji}
                </div>
                <div className="mt-6 text-sm text-gray-600">
                  Nhấp để xem chi tiết
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-[#765534] to-[#947454] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-5xl font-bold text-white mb-4">
                  {currentKanji.meaning}
                </div>
                
                <div className="w-full max-w-md space-y-3 mt-6">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-[#FEE173] text-sm mb-1">Âm Onyomi (音読み):</div>
                    <div className="text-white text-lg">{currentKanji.onyomi || 'Không có'}</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-[#FEE173] text-sm mb-1">Âm Kunyomi (訓読み):</div>
                    <div className="text-white text-lg">{currentKanji.kunyomi || 'Không có'}</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-[#FEE173] text-sm mb-1">Ví dụ:</div>
                    <div className="text-white text-base">{currentKanji.example}</div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-300">
                  Nhấp để quay lại
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEC900] text-[#765534] hover:bg-[#FEE173]'
              }`}
            >
              <ChevronLeft size={20} />
              Trước
            </button>

            <div className="text-sm text-gray-600">
              {currentIndex + 1} / {shuffledKanji.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledKanji.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                currentIndex === shuffledKanji.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEC900] text-[#765534] hover:bg-[#FEE173]'
              }`}
            >
              Sau
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
