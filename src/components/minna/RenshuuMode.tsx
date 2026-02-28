import React, { useState } from 'react'
import {Eye, EyeOff, CheckCircle} from 'lucide-react'

interface Exercise {
  question: string
  answer: string
  type: 'fill' | 'translate' | 'choice'
  hint?: string
}

interface RenshuuModeProps {
  lessonId: number
  lessonTitle: string
}

const RENSHUU_DATA: Record<number, Exercise[]> = {
  1: [
    {
      question: '私は学生_____。',
      answer: 'です',
      type: 'fill',
      hint: 'Dùng です để khẳng định'
    },
    {
      question: 'あなたは先生_____。',
      answer: 'ですか',
      type: 'fill',
      hint: 'Câu hỏi yes/no thêm か'
    },
    {
      question: '私は医者_____ありません。',
      answer: 'じゃ',
      type: 'fill',
      hint: 'Dạng phủ định'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Tôi là sinh viên."',
      answer: '私は学生です。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Bạn có phải là giáo viên không?"',
      answer: 'あなたは先生ですか。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Việt: "私は会社員じゃありません。"',
      answer: 'Tôi không phải là nhân viên công ty.',
      type: 'translate'
    },
    {
      question: '田中さんは_____ですか。',
      answer: '学生 / 先生 / 会社員 (hoặc nghề nghiệp khác)',
      type: 'fill',
      hint: 'Điền nghề nghiệp'
    },
    {
      question: 'マリーさんは_____人ですか。',
      answer: 'フランス / アメリカ (hoặc quốc gia khác)',
      type: 'fill',
      hint: 'Điền quốc tịch'
    }
  ],
  2: [
    {
      question: 'これ_____本です。',
      answer: 'は',
      type: 'fill',
      hint: 'Trợ từ chủ đề'
    },
    {
      question: 'それは_____ですか。',
      answer: '何',
      type: 'fill',
      hint: 'Hỏi "cái gì"'
    },
    {
      question: 'この本は私_____です。',
      answer: 'の',
      type: 'fill',
      hint: 'Chỉ sở hữu'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Đây là sách."',
      answer: 'これは本です。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Cuốn sách này là của tôi."',
      answer: 'この本は私のです。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Việt: "それは辞書ですか、本ですか。"',
      answer: 'Cái đó là từ điển hay sách?',
      type: 'translate'
    },
    {
      question: 'あれ_____時計です。',
      answer: 'は',
      type: 'fill'
    },
    {
      question: '_____本は日本語の本です。',
      answer: 'あの / その / この',
      type: 'fill',
      hint: 'Chọn từ chỉ định'
    }
  ],
  3: [
    {
      question: '教室は_____ですか。',
      answer: 'どこ',
      type: 'fill',
      hint: 'Hỏi "ở đâu"'
    },
    {
      question: '図書館は_____です。',
      answer: 'あそこ / ここ / そこ',
      type: 'fill',
      hint: 'Chỉ vị trí'
    },
    {
      question: 'この本は_____ですか。',
      answer: 'いくら',
      type: 'fill',
      hint: 'Hỏi giá cả'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Đây là phòng học."',
      answer: 'ここは教室です。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Thư viện ở kia."',
      answer: '図書館はあそこです。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Việt: "この時計はいくらですか。"',
      answer: 'Chiếc đồng hồ này giá bao nhiêu?',
      type: 'translate'
    },
    {
      question: '_____の会社ですか。',
      answer: 'どこ',
      type: 'fill',
      hint: 'Hỏi xuất xứ'
    },
    {
      question: '郵便局は_____ですか。',
      answer: 'どこ',
      type: 'fill'
    }
  ],
  4: [
    {
      question: '私は毎朝6時_____起きます。',
      answer: 'に',
      type: 'fill',
      hint: 'Trợ từ chỉ thời gian'
    },
    {
      question: '9時_____5時_____働きます。',
      answer: 'から、まで',
      type: 'fill',
      hint: 'Từ...đến...'
    },
    {
      question: '_____時に寝ますか。',
      answer: '何',
      type: 'fill',
      hint: 'Hỏi mấy giờ'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Tôi thức dậy lúc 7 giờ."',
      answer: '私は7時に起きます。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Tôi làm việc từ 9 giờ đến 5 giờ."',
      answer: '私は9時から5時まで働きます。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Việt: "何時に勉強しますか。"',
      answer: 'Mấy giờ bạn học?',
      type: 'translate'
    },
    {
      question: '私は毎晩11時_____寝ます。',
      answer: 'に',
      type: 'fill'
    },
    {
      question: '土曜日に_____。',
      answer: '休みます',
      type: 'fill',
      hint: 'Động từ "nghỉ"'
    }
  ],
  5: [
    {
      question: '私は学校_____行きます。',
      answer: 'へ / に',
      type: 'fill',
      hint: 'Trợ từ chỉ hướng đi'
    },
    {
      question: '電車_____来ます。',
      answer: 'で',
      type: 'fill',
      hint: 'Trợ từ chỉ phương tiện'
    },
    {
      question: '友達_____帰ります。',
      answer: 'と',
      type: 'fill',
      hint: 'Trợ từ chỉ đồng hành'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Tôi đi đến trường."',
      answer: '私は学校へ行きます。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Nhật: "Tôi đi bằng tàu điện."',
      answer: '私は電車で行きます。',
      type: 'translate'
    },
    {
      question: 'Dịch sang tiếng Việt: "いつ日本へ行きますか。"',
      answer: 'Khi nào bạn đi Nhật?',
      type: 'translate'
    },
    {
      question: 'どこ_____も行きません。',
      answer: 'へ',
      type: 'fill',
      hint: 'Dạng phủ định toàn bộ'
    },
    {
      question: '_____に大阪へ行きますか。',
      answer: 'いつ',
      type: 'fill',
      hint: 'Hỏi "khi nào"'
    }
  ]
}

export default function RenshuuMode({ lessonId, lessonTitle }: RenshuuModeProps) {
  const exercises = RENSHUU_DATA[lessonId] || []
  const [revealedAnswers, setRevealedAnswers] = useState<Set<number>>(new Set())

  const toggleAnswer = (index: number) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const revealAll = () => {
    setRevealedAnswers(new Set(exercises.map((_, i) => i)))
  }

  const hideAll = () => {
    setRevealedAnswers(new Set())
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#765534] mb-2">
            練習 Renshuu - {lessonTitle}
          </h3>
          <p className="text-gray-600">
            Bài tập luyện tập ({exercises.length} câu)
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={revealAll}
            className="px-4 py-2 bg-[#FEC900] text-[#765534] rounded-lg font-semibold hover:bg-[#FEE173] transition-colors flex items-center space-x-2"
          >
            <Eye size={18} />
            <span>Xem Tất Cả</span>
          </button>
          <button
            onClick={hideAll}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
          >
            <EyeOff size={18} />
            <span>Ẩn Tất Cả</span>
          </button>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        {exercises.map((exercise, index) => {
          const isRevealed = revealedAnswers.has(index)
          
          return (
            <div
              key={index}
              className="p-5 bg-gray-50 rounded-xl border-l-4 border-[#FEC900] hover:shadow-md transition-shadow"
            >
              {/* Question Number */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="bg-[#765534] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 font-medium">{exercise.question}</p>
                    {exercise.hint && (
                      <p className="text-sm text-gray-500 mt-1">
                        💡 Gợi ý: {exercise.hint}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              <div className="mt-4 pl-11">
                <button
                  onClick={() => toggleAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isRevealed
                      ? 'bg-[#FEE173] border-2 border-[#FEC900]'
                      : 'bg-white border-2 border-gray-300 hover:border-[#FEC900]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {isRevealed ? (
                        <div className="flex items-start space-x-2">
                          <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600 font-medium mb-1">Đáp án:</p>
                            <p className="text-lg text-[#765534] font-bold">{exercise.answer}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Eye size={18} />
                          <span className="text-sm font-medium">Bấm để xem đáp án</span>
                        </div>
                      )}
                    </div>
                    <div className="text-gray-400">
                      {isRevealed ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 p-5 bg-gradient-to-r from-[#FEE173] to-[#FEC900] rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#765534] font-semibold text-lg">
              Hoàn thành {revealedAnswers.size}/{exercises.length} câu
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {revealedAnswers.size === exercises.length
                ? '🎉 Bạn đã xem tất cả đáp án!'
                : 'Hãy thử sức với các câu hỏi!'}
            </p>
          </div>
          <div className="text-5xl">
            {revealedAnswers.size === exercises.length ? '✅' : '📝'}
          </div>
        </div>
      </div>
    </div>
  )
}
