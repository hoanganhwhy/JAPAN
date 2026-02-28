import React, { useState, useEffect, useMemo } from 'react'
import {ChevronLeft, Trophy, RotateCcw} from 'lucide-react'

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

export default function VocabMatchMode({ vocabulary, onBack, lessonTitle }: Props) {
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null)
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [wrongPair, setWrongPair] = useState<string[]>([])

  const gameData = useMemo(() => {
    return [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 8)
  }, [])

  const kanjiList = useMemo(() => {
    return gameData.map(item => item.kanji || item.japanese).sort(() => Math.random() - 0.5)
  }, [gameData])

  const meaningList = useMemo(() => {
    return gameData.map(item => item.meaning).sort(() => Math.random() - 0.5)
  }, [gameData])

  const handleKanjiClick = (kanji: string) => {
    if (matched.includes(kanji) || wrongPair.includes(kanji)) return
    if (selectedKanji === kanji) { setSelectedKanji(null); return }
    setSelectedKanji(kanji)
    if (selectedMeaning) checkMatch(kanji, selectedMeaning)
  }

  const handleMeaningClick = (meaning: string) => {
    if (matched.includes(meaning) || wrongPair.includes(meaning)) return
    if (selectedMeaning === meaning) { setSelectedMeaning(null); return }
    setSelectedMeaning(meaning)
    if (selectedKanji) checkMatch(selectedKanji, meaning)
  }

  const checkMatch = (kanji: string, meaning: string) => {
    const pair = gameData.find(item => (item.kanji || item.japanese) === kanji && item.meaning === meaning)
    if (pair) {
      const newMatched = [...matched, kanji, meaning]
      setMatched(newMatched)
      setScore(score + 1)
      setSelectedKanji(null)
      setSelectedMeaning(null)
      if (newMatched.length === gameData.length * 2) {
        setTimeout(() => alert(`Chúc mừng! Bạn đã hoàn thành với ${gameData.length} cặp đúng!`), 300)
      }
    } else {
      setWrongPair([kanji, meaning])
      setTimeout(() => {
        setWrongPair([])
        setSelectedKanji(null)
        setSelectedMeaning(null)
      }, 600)
    }
  }

  const isComplete = score === gameData.length

  if (isComplete) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-[#765534] mb-4">Hoàn Thành!</h2>
            <div className="text-5xl font-bold text-[#FEC900] mb-6">{score}/{gameData.length}</div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#FEC900] text-[#765534] px-6 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} /> Chơi Lại
              </button>
              <button
                onClick={onBack}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Quay Lại
              </button>
            </div>
          </div>
        </div>
      </div>
    )
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
            <h2 className="text-2xl font-bold text-[#765534]">Ghép Từ - {lessonTitle}</h2>
            <div className="flex items-center gap-2 text-lg font-semibold text-[#765534]">
              <Trophy className="text-[#FEC900]" size={24} />
              {score}/{gameData.length}
            </div>
          </div>

          <p className="text-center text-gray-600 mb-8 text-lg">
            Kết nối từ với nghĩa đúng của nó
          </p>

          <div className="grid grid-cols-2 gap-8">
            {/* Kanji Column */}
            <div className="space-y-3">
              <h3 className="text-center font-semibold text-[#765534] mb-4">Từ Vựng</h3>
              {kanjiList.map((kanji, index) => {
                const isMatched = matched.includes(kanji)
                const isSelected = selectedKanji === kanji
                const isWrong = wrongPair.includes(kanji)

                return (
                  <button
                    key={index}
                    onClick={() => handleKanjiClick(kanji)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-xl text-2xl font-bold transition-all ${
                      isMatched
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : isWrong
                        ? 'bg-red-100 text-red-500 border-2 border-red-400'
                        : isSelected
                        ? 'bg-[#FEC900] text-[#765534] scale-105 shadow-lg'
                        : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900] hover:scale-105'
                    }`}
                  >
                    {kanji}
                  </button>
                )
              })}
            </div>

            {/* Meaning Column */}
            <div className="space-y-3">
              <h3 className="text-center font-semibold text-[#765534] mb-4">Nghĩa</h3>
              {meaningList.map((meaning, index) => {
                const isMatched = matched.includes(meaning)
                const isSelected = selectedMeaning === meaning
                const isWrong = wrongPair.includes(meaning)

                return (
                  <button
                    key={index}
                    onClick={() => handleMeaningClick(meaning)}
                    disabled={isMatched}
                    className={`w-full p-4 rounded-xl text-lg font-bold transition-all ${
                      isMatched
                        ? 'bg-green-100 text-green-600 cursor-not-allowed'
                        : isWrong
                        ? 'bg-red-100 text-red-500 border-2 border-red-400'
                        : isSelected
                        ? 'bg-[#FEC900] text-[#765534] scale-105 shadow-lg'
                        : 'bg-[#FEE173] text-[#765534] hover:bg-[#FEC900] hover:scale-105'
                    }`}
                  >
                    {meaning}
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