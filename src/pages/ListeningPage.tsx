import React, { useState } from 'react'
import {Headphones, Play, Volume2} from 'lucide-react'

export default function ListeningPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  const lessons = [
    { id: 1, title: 'Bài 1: Chào hỏi', exercises: 5, level: 'Dễ' },
    { id: 2, title: 'Bài 2: Giới thiệu bản thân', exercises: 5, level: 'Dễ' },
    { id: 3, title: 'Bài 3: Gia đình', exercises: 6, level: 'Trung bình' },
    { id: 4, title: 'Bài 4: Hàng ngày', exercises: 6, level: 'Trung bình' },
    { id: 5, title: 'Bài 5: Mua sắm', exercises: 7, level: 'Trung bình' },
    { id: 6, title: 'Bài 6: Giao thông', exercises: 8, level: 'Khó' }
  ]

  const sampleExercise = {
    question: 'Hãy nghe và chọn đáp án đúng',
    options: [
      'A. 私は学生です。(Tôi là sinh viên)',
      'B. 私は先生です。(Tôi là giáo viên)',
      'C. 私は医者です。(Tôi là bác sĩ)',
      'D. 私は会社員です。(Tôi là nhân viên công ty)'
    ]
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Luyện Nghe
          </h1>
          <p className="text-lg text-gray-600">
            Cải thiện kỹ năng nghe hiểu tiếng Nhật
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#765534] mb-4">Danh Sách Bài Học</h2>
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedLesson === lesson.id
                        ? 'bg-[#FEC900] text-[#765534] shadow-md'
                        : 'bg-gray-50 hover:bg-[#FEE173] text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Headphones size={20} />
                      <span className="font-semibold">{lesson.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{lesson.exercises} bài tập</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lesson.level === 'Dễ' ? 'bg-green-100 text-green-700' :
                        lesson.level === 'Trung bình' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {lesson.level}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="space-y-6">
                {/* Audio Player */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-[#765534] mb-6 text-center">
                    Bài Nghe {selectedLesson}
                  </h3>

                  <div className="bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-xl p-12 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-6">
                        <Volume2 size={48} className="text-[#765534]" />
                      </div>
                      <button className="bg-[#765534] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5a4028] transition-colors flex items-center space-x-3 shadow-lg">
                        <Play size={24} />
                        <span>Phát Âm Thanh</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center text-gray-600 mb-6">
                    <p>Hãy nghe kỹ và chọn đáp án đúng bên dưới</p>
                  </div>
                </div>

                {/* Questions */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-bold text-[#765534] mb-6">
                    {sampleExercise.question}
                  </h3>

                  <div className="space-y-3">
                    {sampleExercise.options.map((option, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-[#FEE173] transition-colors border-2 border-transparent hover:border-[#FEC900]"
                      >
                        <span className="font-medium text-gray-800">{option}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                      Bài Trước
                    </button>
                    <button className="px-6 py-3 bg-[#FEC900] text-[#765534] rounded-full font-semibold hover:bg-[#FEE173] transition-colors">
                      Kiểm Tra Đáp Án
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                      Bài Tiếp
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Tiến độ</span>
                    <span className="text-sm font-bold text-[#765534]">1 / 5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-[#FEC900] h-3 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🎧</div>
                <h3 className="text-2xl font-bold text-[#765534] mb-4">
                  Chọn Bài Học
                </h3>
                <p className="text-gray-600">
                  Hãy chọn một bài học từ danh sách bên trái để bắt đầu luyện nghe
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
