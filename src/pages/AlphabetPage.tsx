import React, { useState } from 'react'
import {BookOpen, Brain, Shuffle, CreditCard, ChevronLeft} from 'lucide-react'
import GuessMode from '@/components/alphabet/GuessMode'
import QuizMode from '@/components/alphabet/QuizMode'
import MatchMode from '@/components/alphabet/MatchMode'
import FlashcardMode from '@/components/alphabet/FlashcardMode'

export default function AlphabetPage() {
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana')
  const [selectedMode, setSelectedMode] = useState<string>('')

  const modes = [
    { id: 'guess', icon: Brain, title: 'Đoán Chữ', desc: '4 đáp án Romaji', color: 'bg-[#FEC900]' },
    { id: 'quiz', icon: BookOpen, title: 'Trắc Nghiệm', desc: 'Kiểm tra kiến thức', color: 'bg-[#FEE173]' },
    { id: 'match', icon: Shuffle, title: 'Ghép Từ', desc: 'Kết nối chữ cái', color: 'bg-[#FEC900]' },
    { id: 'flashcard', icon: CreditCard, title: 'Flashcard', desc: 'Học và ghi nhớ', color: 'bg-[#FEE173]' }
  ]

  const hiraganaData = [
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' },
    { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' },
    { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' },
    { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' },
    { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' },
    { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' },
    { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' },
    { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
    { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' },
    { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
    { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' }
  ]

  const katakanaData = [
    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' },
    { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' },
    { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' },
    { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' },
    { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' },
    { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' },
    { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' },
    { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
    { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' },
    { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
    { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' }
  ]

  const currentData = activeTab === 'hiragana' ? hiraganaData : katakanaData

  const renderModeContent = () => {
    if (!selectedMode) return null

    switch (selectedMode) {
      case 'guess':
        return <GuessMode data={currentData} alphabetType={activeTab} onBack={() => setSelectedMode('')} />
      case 'quiz':
        return <QuizMode data={currentData} alphabetType={activeTab} onBack={() => setSelectedMode('')} />
      case 'match':
        return <MatchMode data={currentData} alphabetType={activeTab} onBack={() => setSelectedMode('')} />
      case 'flashcard':
        return <FlashcardMode data={currentData} alphabetType={activeTab} onBack={() => setSelectedMode('')} />
      default:
        return null
    }
  }

  if (selectedMode) {
    return renderModeContent()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Bảng Chữ Cái Tiếng Nhật
          </h1>
          <p className="text-lg text-gray-600">
            Học Hiragana và Katakana với nhiều phương pháp thú vị
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('hiragana')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'hiragana'
                  ? 'bg-[#FEC900] text-[#765534]'
                  : 'text-gray-600 hover:text-[#765534]'
              }`}
            >
              Hiragana (ひらがな)
            </button>
            <button
              onClick={() => setActiveTab('katakana')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'katakana'
                  ? 'bg-[#FEC900] text-[#765534]'
                  : 'text-gray-600 hover:text-[#765534]'
              }`}
            >
              Katakana (カタカナ)
            </button>
          </div>
        </div>

        {/* Learning Modes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#765534] mb-6 text-center">
            Chọn Phương Pháp Học
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modes.map((mode) => {
              const Icon = mode.icon
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className="p-6 rounded-2xl shadow-md hover:shadow-xl transition-all bg-white hover:scale-105"
                >
                  <div className={`${mode.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={32} className="text-[#765534]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#765534] mb-2">{mode.title}</h3>
                  <p className="text-sm text-gray-600">{mode.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Alphabet Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#765534] mb-6 text-center">
            Bảng Chữ Cái {activeTab === 'hiragana' ? 'Hiragana' : 'Katakana'}
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {currentData.map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-[#FEE173] to-white rounded-xl flex flex-col items-center justify-center p-2 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#FEC900]"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#765534] mb-1">
                  {item.char}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {item.romaji}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              ✨ Bảng chữ cái đầy đủ 46 ký tự cơ bản
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
