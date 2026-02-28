import React, { useState } from 'react'
import {Star, Trash2, BookOpen, Edit, Headphones} from 'lucide-react'

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'kanji'>('vocabulary')

  const favoriteVocabulary = [
    { japanese: 'がくせい', hiragana: 'がくせい', kanji: '学生', meaning: 'sinh viên', romaji: 'gakusei', category: 'Minna Bài 1' },
    { japanese: 'せんせい', hiragana: 'せんせい', kanji: '先生', meaning: 'giáo viên', romaji: 'sensei', category: 'Minna Bài 1' },
    { japanese: 'ほん', hiragana: 'ほん', kanji: '本', meaning: 'sách', romaji: 'hon', category: 'Minna Bài 2' },
    { japanese: 'えんぴつ', hiragana: 'えんぴつ', kanji: '鉛筆', meaning: 'bút chì', romaji: 'enpitsu', category: 'Minna Bài 2' }
  ]

  const favoriteKanji = [
    { kanji: '日', reading: 'ニチ、ジツ、ひ', meaning: 'Mặt trời, ngày', example: '日本 (にほん)' },
    { kanji: '本', reading: 'ホン、もと', meaning: 'Sách, gốc', example: '本 (ほん)' },
    { kanji: '人', reading: 'ジン、ニン、ひと', meaning: 'Người', example: '人 (ひと)' }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Từ Yêu Thích
          </h1>
          <p className="text-lg text-gray-600">
            Lưu và ôn tập các từ vựng, Kanji quan trọng
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-md inline-flex">
            <button
              onClick={() => setActiveTab('vocabulary')}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'vocabulary'
                  ? 'bg-[#FEC900] text-[#765534]'
                  : 'text-gray-600 hover:text-[#765534]'
              }`}
            >
              <BookOpen size={20} />
              <span>Từ Vựng ({favoriteVocabulary.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('kanji')}
              className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'kanji'
                  ? 'bg-[#FEC900] text-[#765534]'
                  : 'text-gray-600 hover:text-[#765534]'
              }`}
            >
              <Edit size={20} />
              <span>Kanji ({favoriteKanji.length})</span>
            </button>
          </div>
        </div>

        {/* Vocabulary Tab */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-6">
            {favoriteVocabulary.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#765534]">Danh Sách Từ Vựng</h2>
                  <button className="bg-[#FEC900] text-[#765534] px-6 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors">
                    Ôn Tập Tất Cả
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteVocabulary.map((vocab, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-2xl font-bold text-[#765534]">{vocab.kanji}</span>
                            <span className="text-gray-600">({vocab.hiragana})</span>
                            <button className="text-gray-400 hover:text-[#765534]">
                              <Headphones size={20} />
                            </button>
                          </div>
                          <div className="text-sm text-gray-500 mb-1">Romaji: {vocab.romaji}</div>
                          <div className="text-lg text-gray-700 mb-3">Nghĩa: {vocab.meaning}</div>
                          <div className="inline-block bg-[#FEE173] px-3 py-1 rounded-full text-xs font-medium text-[#765534]">
                            {vocab.category}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="text-yellow-500 hover:text-yellow-600">
                            <Star size={24} fill="currentColor" />
                          </button>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-[#765534] mb-4">
                  Chưa Có Từ Yêu Thích
                </h3>
                <p className="text-gray-600 mb-6">
                  Hãy bắt đầu thêm các từ vựng quan trọng vào danh sách yêu thích
                </p>
                <button className="bg-[#FEC900] text-[#765534] px-8 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors">
                  Khám Phá Từ Vựng
                </button>
              </div>
            )}
          </div>
        )}

        {/* Kanji Tab */}
        {activeTab === 'kanji' && (
          <div className="space-y-6">
            {favoriteKanji.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#765534]">Danh Sách Kanji</h2>
                  <button className="bg-[#FEC900] text-[#765534] px-6 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors">
                    Ôn Tập Tất Cả
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteKanji.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#FEE173] to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-white w-20 h-20 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-5xl text-[#765534]">{item.kanji}</span>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button className="text-yellow-500 hover:text-yellow-600">
                            <Star size={24} fill="currentColor" />
                          </button>
                          <button className="text-red-500 hover:text-red-600">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-600 font-medium">Âm đọc: </span>
                          <span className="text-gray-800">{item.reading}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 font-medium">Nghĩa: </span>
                          <span className="text-gray-800">{item.meaning}</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-sm text-gray-600 font-medium">Ví dụ: </span>
                          <span className="text-[#765534] font-medium">{item.example}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-[#765534] mb-4">
                  Chưa Có Kanji Yêu Thích
                </h3>
                <p className="text-gray-600 mb-6">
                  Hãy bắt đầu thêm các chữ Kanji quan trọng vào danh sách yêu thích
                </p>
                <button className="bg-[#FEC900] text-[#765534] px-8 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors">
                  Khám Phá Kanji
                </button>
              </div>
            )}
          </div>
        )}

        {/* Study Statistics */}
        {(activeTab === 'vocabulary' && favoriteVocabulary.length > 0) || 
         (activeTab === 'kanji' && favoriteKanji.length > 0) ? (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#765534] mb-6">Thống Kê Học Tập</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#765534] mb-2">
                  {activeTab === 'vocabulary' ? favoriteVocabulary.length : favoriteKanji.length}
                </div>
                <div className="text-gray-700 font-medium">Tổng số mục</div>
              </div>
              <div className="bg-gradient-to-br from-[#FEE173] to-white rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#765534] mb-2">75%</div>
                <div className="text-gray-700 font-medium">Đã thuộc</div>
              </div>
              <div className="bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#765534] mb-2">5</div>
                <div className="text-gray-700 font-medium">Cần ôn lại</div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
