import React, { useState, useEffect } from 'react'
import {CheckCircle, XCircle, ChevronLeft, RotateCcw} from 'lucide-react'

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

export default function VocabQuizMode({ vocabulary, onBack, lessonTitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Array<{ word: Vocabulary, options: string[] }>>([])

  useEffect(() => {
    generateQuestions()
  }, [])

  const generateQuestions = () => {
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5)
    const newQuestions = shuffled.map(word => ({
      word,
      options: generateOptions(word, vocabulary)
    }))
    setQuestions(newQuestions)
    setCurrentIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  const generateOptions = (correctWord: Vocabulary, allWords: Vocabulary[]): string[] => {
    const options = [correctWord.meaning]
    const otherWords = allWords.filter(w => w.meaning !== correctWord.meaning)
    
    while (options.length < 4 && otherWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherWords.length)
      const option = otherWords[randomIndex].meaning
      if (!options.includes(option)) {
        options.push(option)
      }
      otherWords.splice(randomIndex, 1)
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    setAnswered(true)
    if (answer === questions[currentIndex].word.meaning) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    }
  }

  const isCorrect = selectedAnswer === questions[currentIndex]?.word.meaning

  if (questions.length === 0) {
    return <div className="text-center py-12">Đang tải...</div>
  }

  if (currentIndex >= questions.length) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">
              {score >= questions.length * 0.8 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-bold text-[#765534] mb-4">Hoàn Thành!</h2>
            <div className="text-5xl font-bold text-[#FEC900] mb-6">
              {score}/{questions.length}
            </div>
            <p className="text-gray-600 mb-8">
              Tỷ lệ đúng: {Math.round((score / questions.length) * 100)}%
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={generateQuestions}
                className="bg-[#FEC900] text-[#765534] px-6 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors flex items-center gap-2"
              >
                <RotateCcw size={20} />
                Làm Lại
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

  const currentQuestion = questions[currentIndex]

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
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#765534]">Trắc Nghiệm {lessonTitle}</h2>
            <div className="text-lg font-semibold text-[#765534]">
              {currentIndex + 1}/{questions.length} | Điểm: {score}
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-12">
            <div className="text-7xl font-bold text-[#765534] mb-4">
              {currentQuestion.word.kanji || currentQuestion.word.japanese}
            </div>
            <div className="text-2xl text-gray-500 mb-2">
              {currentQuestion.word.hiragana}
            </div>
            <p className="text-xl text-gray-600">
              Romaji: {currentQuestion.word.romaji}
            </p>
          </div>

          {/* Options - 2x2 grid like QuizMode */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrectAnswer = option === currentQuestion.word.meaning

              let buttonClass = 'p-6 rounded-xl text-xl font-semibold transition-all '

              if (answered) {
                if (isSelected && isCorrect) {
                  buttonClass += 'bg-green-100 border-4 border-green-500 text-green-700'
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'bg-red-100 border-4 border-red-500 text-red-700'
                } else if (isCorrectAnswer) {
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
                  onClick={() => !answered && handleAnswer(option)}
                  disabled={answered}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-center gap-2">
                    {answered && isCorrectAnswer && <CheckCircle size={24} />}
                    {answered && isSelected && !isCorrect && <XCircle size={24} />}
                    {option}
                  </div>
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="text-center">
              <div className="mb-4 text-lg text-gray-600">
                Đáp án đúng: <span className="font-bold text-[#765534]">{currentQuestion.word.meaning}</span>
              </div>
              <button
                onClick={handleNext}
                className="bg-[#FEC900] text-[#765534] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FEE173] transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}