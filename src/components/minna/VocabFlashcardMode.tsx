import React, { useState, useEffect } from 'react'
import {ChevronLeft, ChevronRight, RotateCcw, Volume2} from 'lucide-react'

interface Vocabulary {
  japanese: string
  hiragana: string
  kanji: string
  meaning: string
  romaji: string
}

interface Props {
  vocabulary: Vocabulary[]
  onBack: () => void
  lessonTitle: string
}

export default function VocabFlashcardMode({ vocabulary, onBack, lessonTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [shuffledVocab, setShuffledVocab] = useState<Vocabulary[]>([])

  useEffect(() => {
    setShuffledVocab([...vocabulary].sort(() => Math.random() - 0.5))
  }, [vocabulary])

  const handleNext = () => {
    if (currentIndex < shuffledVocab.length - 1) {
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
    setShuffledVocab([...vocabulary].sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  if (shuffledVocab.length === 0) {
    return <div className="text-center py-12">Đang tải...</div>
  }

  const currentWord = shuffledVocab[currentIndex]

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
            <h2 className="text-2xl font-bold text-[#765534]">Flashcard - {lessonTitle}</h2>
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
              Thẻ {currentIndex + 1}/{shuffledVocab.length}
            </div>
          </div>

          {/* Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full aspect-[3/2] mb-8 cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-[#FEE173] to-[#FEC900] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-6xl md:text-7xl font-bold text-[#765534] mb-4">
                  {currentWord.kanji}
                </div>
                <div className="text-2xl text-gray-700 mb-4">
                  {currentWord.hiragana}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    speakWord(currentWord.japanese)
                  }}
                  className="bg-white text-[#765534] p-3 rounded-full hover:bg-[#FEE173] transition-colors"
                >
                  <Volume2 size={24} />
                </button>
                <p className="mt-6 text-sm text-gray-600">Nhấn để xem nghĩa</p>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-5xl font-bold text-[#765534] mb-4">
                  {currentWord.meaning}
                </div>
                <div className="text-xl text-gray-700 mb-2">
                  Romaji: {currentWord.romaji}
                </div>
                <div className="text-3xl font-bold text-gray-600 mt-4">
                  {currentWord.kanji}
                </div>
                <p className="mt-6 text-sm text-gray-600">Nhấn để lật lại</p>
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
                  : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900]'
              }`}
            >
              <ChevronLeft size={20} />
              Trước
            </button>

            <div className="text-sm text-gray-600">
              {currentIndex + 1} / {shuffledVocab.length}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === shuffledVocab.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                currentIndex === shuffledVocab.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900]'
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