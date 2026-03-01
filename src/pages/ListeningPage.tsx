import React, { useState } from 'react'
import {Headphones, Play, Volume2, Check, X, ChevronRight, ChevronLeft} from 'lucide-react'

interface Exercise {
  id: number
  audio: string
  question: string
  options: string[]
  correct: number
}

interface Lesson {
  id: number
  title: string
  level: string
  exercises: Exercise[]
}

export default function ListeningPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const lessons: Lesson[] = [
    {
      id: 1,
      title: 'Bài 1: Chào hỏi',
      level: 'Dễ',
      exercises: [
        {
          id: 1,
          audio: 'こんにちは',
          question: 'Bạn vừa nghe được gì?',
          options: [
            'A. こんばんは (konbanwa - Chào buổi tối)',
            'B. こんにちは (konnichiwa - Xin chào)',
            'C. おはよう (ohayou - Chào buổi sáng)',
            'D. さようなら (sayounara - Tạm biệt)'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: 'おはようございます',
          question: 'Câu chào này được dùng vào thời gian nào?',
          options: [
            'A. Buổi chiều',
            'B. Buổi tối',
            'C. Buổi sáng',
            'D. Bất cứ lúc nào'
          ],
          correct: 2
        },
        {
          id: 3,
          audio: 'ありがとうございます',
          question: 'Câu này có nghĩa là gì?',
          options: [
            'A. Xin lỗi',
            'B. Cảm ơn',
            'C. Tạm biệt',
            'D. Xin chào'
          ],
          correct: 1
        },
        {
          id: 4,
          audio: 'すみません',
          question: 'Từ này thường được dùng để làm gì?',
          options: [
            'A. Cảm ơn ai đó',
            'B. Chào hỏi',
            'C. Xin lỗi hoặc gọi người khác',
            'D. Tạm biệt'
          ],
          correct: 2
        },
        {
          id: 5,
          audio: 'お元気ですか',
          question: 'Câu hỏi này có nghĩa là gì?',
          options: [
            'A. Tên bạn là gì?',
            'B. Bạn bao nhiêu tuổi?',
            'C. Bạn khỏe không?',
            'D. Bạn ở đâu?'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: 'Bài 2: Giới thiệu bản thân',
      level: 'Dễ',
      exercises: [
        {
          id: 1,
          audio: '私は学生です',
          question: 'Người nói là ai?',
          options: [
            'A. Giáo viên',
            'B. Sinh viên',
            'C. Bác sĩ',
            'D. Nhân viên công ty'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: '私の名前はたなかです',
          question: 'Tên của người nói là gì?',
          options: [
            'A. Yamada',
            'B. Satou',
            'C. Tanaka',
            'D. Suzuki'
          ],
          correct: 2
        },
        {
          id: 3,
          audio: '私はベトナム人です',
          question: 'Người nói đến từ đâu?',
          options: [
            'A. Nhật Bản',
            'B. Việt Nam',
            'C. Trung Quốc',
            'D. Hàn Quốc'
          ],
          correct: 1
        },
        {
          id: 4,
          audio: '私は二十歳です',
          question: 'Người nói bao nhiêu tuổi?',
          options: [
            'A. 18 tuổi',
            'B. 20 tuổi',
            'C. 22 tuổi',
            'D. 25 tuổi'
          ],
          correct: 1
        },
        {
          id: 5,
          audio: 'どうぞよろしくお願いします',
          question: 'Câu này được dùng khi nào?',
          options: [
            'A. Khi giới thiệu bản thân',
            'B. Khi chia tay',
            'C. Khi cảm ơn',
            'D. Khi xin lỗi'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 3,
      title: 'Bài 3: Gia đình',
      level: 'Trung bình',
      exercises: [
        {
          id: 1,
          audio: '私の家族は四人です',
          question: 'Gia đình người nói có bao nhiêu người?',
          options: [
            'A. 3 người',
            'B. 4 người',
            'C. 5 người',
            'D. 6 người'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: '父は会社員です',
          question: 'Bố người nói làm nghề gì?',
          options: [
            'A. Giáo viên',
            'B. Bác sĩ',
            'C. Nhân viên công ty',
            'D. Kỹ sư'
          ],
          correct: 2
        },
        {
          id: 3,
          audio: '母は料理が上手です',
          question: 'Mẹ người nói giỏi về điều gì?',
          options: [
            'A. Nấu ăn',
            'B. Vẽ tranh',
            'C. Hát',
            'D. Khiêu vũ'
          ],
          correct: 0
        },
        {
          id: 4,
          audio: '兄は大学生です',
          question: 'Anh trai người nói đang làm gì?',
          options: [
            'A. Làm việc',
            'B. Học đại học',
            'C. Học trung học',
            'D. Du học'
          ],
          correct: 1
        },
        {
          id: 5,
          audio: '妹は高校生です',
          question: 'Em gái người nói học lớp mấy?',
          options: [
            'A. Tiểu học',
            'B. Trung học cơ sở',
            'C. Trung học phổ thông',
            'D. Đại học'
          ],
          correct: 2
        },
        {
          id: 6,
          audio: '祖父は七十歳です',
          question: 'Ông người nói bao nhiêu tuổi?',
          options: [
            'A. 60 tuổi',
            'B. 70 tuổi',
            'C. 80 tuổi',
            'D. 90 tuổi'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 4,
      title: 'Bài 4: Hàng ngày',
      level: 'Trung bình',
      exercises: [
        {
          id: 1,
          audio: '毎日七時に起きます',
          question: 'Người nói thức dậy lúc mấy giờ?',
          options: [
            'A. 6 giờ',
            'B. 7 giờ',
            'C. 8 giờ',
            'D. 9 giờ'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: '朝ごはんを食べます',
          question: 'Người nói đang làm gì?',
          options: [
            'A. Ăn sáng',
            'B. Ăn trưa',
            'C. Ăn tối',
            'D. Ăn xế'
          ],
          correct: 0
        },
        {
          id: 3,
          audio: '電車で学校へ行きます',
          question: 'Người nói đi học bằng gì?',
          options: [
            'A. Xe buýt',
            'B. Tàu điện',
            'C. Xe đạp',
            'D. Đi bộ'
          ],
          correct: 1
        },
        {
          id: 4,
          audio: '図書館で勉強します',
          question: 'Người nói học ở đâu?',
          options: [
            'A. Nhà',
            'B. Lớp học',
            'C. Thư viện',
            'D. Quán cà phê'
          ],
          correct: 2
        },
        {
          id: 5,
          audio: '夜、テレビを見ます',
          question: 'Người nói làm gì vào buổi tối?',
          options: [
            'A. Đọc sách',
            'B. Xem TV',
            'C. Nghe nhạc',
            'D. Chơi game'
          ],
          correct: 1
        },
        {
          id: 6,
          audio: '十一時に寝ます',
          question: 'Người nói đi ngủ lúc mấy giờ?',
          options: [
            'A. 10 giờ',
            'B. 11 giờ',
            'C. 12 giờ',
            'D. 1 giờ sáng'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 5,
      title: 'Bài 5: Mua sắm',
      level: 'Trung bình',
      exercises: [
        {
          id: 1,
          audio: 'これはいくらですか',
          question: 'Người nói đang hỏi gì?',
          options: [
            'A. Cái này là gì?',
            'B. Cái này giá bao nhiêu?',
            'C. Cái này của ai?',
            'D. Cái này ở đâu?'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: '千円です',
          question: 'Giá của món đồ là bao nhiêu?',
          options: [
            'A. 100 yên',
            'B. 500 yên',
            'C. 1000 yên',
            'D. 5000 yên'
          ],
          correct: 2
        },
        {
          id: 3,
          audio: 'りんごを三つください',
          question: 'Người nói muốn mua gì?',
          options: [
            'A. 2 quả táo',
            'B. 3 quả táo',
            'C. 4 quả táo',
            'D. 5 quả táo'
          ],
          correct: 1
        },
        {
          id: 4,
          audio: 'もっと安いのはありますか',
          question: 'Người nói đang tìm kiếm gì?',
          options: [
            'A. Đồ đẹp hơn',
            'B. Đồ rẻ hơn',
            'C. Đồ lớn hơn',
            'D. Đồ mới hơn'
          ],
          correct: 1
        },
        {
          id: 5,
          audio: 'これをください',
          question: 'Câu này có nghĩa là gì?',
          options: [
            'A. Tôi muốn xem cái này',
            'B. Cho tôi cái này',
            'C. Cái này đẹp quá',
            'D. Cái này không tốt'
          ],
          correct: 1
        },
        {
          id: 6,
          audio: 'カードで払います',
          question: 'Người nói thanh toán bằng gì?',
          options: [
            'A. Tiền mặt',
            'B. Thẻ',
            'C. Chuyển khoản',
            'D. Tiền xu'
          ],
          correct: 1
        },
        {
          id: 7,
          audio: 'レシートをください',
          question: 'Người nói muốn nhận gì?',
          options: [
            'A. Tiền thối',
            'B. Hóa đơn',
            'C. Túi',
            'D. Quà tặng'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 6,
      title: 'Bài 6: Giao thông',
      level: 'Khó',
      exercises: [
        {
          id: 1,
          audio: '駅はどこですか',
          question: 'Người nói đang hỏi đường đến đâu?',
          options: [
            'A. Bưu điện',
            'B. Nhà ga',
            'C. Bệnh viện',
            'D. Ngân hàng'
          ],
          correct: 1
        },
        {
          id: 2,
          audio: 'まっすぐ行ってください',
          question: 'Người nói đang chỉ đường như thế nào?',
          options: [
            'A. Rẽ trái',
            'B. Rẽ phải',
            'C. Đi thẳng',
            'D. Quay lại'
          ],
          correct: 2
        },
        {
          id: 3,
          audio: '次の角を右に曲がってください',
          question: 'Tại ngã tư tiếp theo, người ta phải làm gì?',
          options: [
            'A. Rẽ trái',
            'B. Rẽ phải',
            'C. Đi thẳng',
            'D. Dừng lại'
          ],
          correct: 1
        },
        {
          id: 4,
          audio: 'バスで行きます',
          question: 'Người nói đi bằng phương tiện gì?',
          options: [
            'A. Tàu điện',
            'B. Xe buýt',
            'C. Taxi',
            'D. Xe đạp'
          ],
          correct: 1
        },
        {
          id: 5,
          audio: '何番のバスですか',
          question: 'Người nói đang hỏi về điều gì?',
          options: [
            'A. Giá vé',
            'B. Thời gian',
            'C. Số xe buýt',
            'D. Điểm dừng'
          ],
          correct: 2
        },
        {
          id: 6,
          audio: 'ここで降ります',
          question: 'Người nói muốn làm gì?',
          options: [
            'A. Lên xe',
            'B. Xuống xe',
            'C. Đợi xe',
            'D. Mua vé'
          ],
          correct: 1
        },
        {
          id: 7,
          audio: '駅まで十分かかります',
          question: 'Đến ga mất bao lâu?',
          options: [
            'A. 5 phút',
            'B. 10 phút',
            'C. 15 phút',
            'D. 20 phút'
          ],
          correct: 1
        },
        {
          id: 8,
          audio: 'タクシーに乗ります',
          question: 'Người nói sẽ làm gì?',
          options: [
            'A. Đi bộ',
            'B. Đi xe buýt',
            'C. Đi taxi',
            'D. Đi tàu'
          ],
          correct: 2
        }
      ]
    }
  ]

  const currentLesson = lessons.find(l => l.id === selectedLesson)
  const currentEx = currentLesson?.exercises[currentExercise]

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP'
      utterance.rate = 0.8
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === currentEx?.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentLesson && currentExercise < currentLesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrev = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetLesson = () => {
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
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
                    onClick={() => {
                      setSelectedLesson(lesson.id)
                      resetLesson()
                    }}
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
                      <span className="text-gray-600">{lesson.exercises.length} bài tập</span>
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
            {currentLesson && currentEx ? (
              <div className="space-y-6">
                {/* Audio Player */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-[#765534] mb-6 text-center">
                    {currentLesson.title} - Câu {currentExercise + 1}/{currentLesson.exercises.length}
                  </h3>

                  <div className="bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-xl p-12 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-6">
                        <Volume2 size={48} className="text-[#765534]" />
                      </div>
                      <button 
                        onClick={() => playAudio(currentEx.audio)}
                        className="bg-[#765534] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5a4028] transition-colors flex items-center space-x-3 shadow-lg"
                      >
                        <Play size={24} />
                        <span>Phát Âm Thanh</span>
                      </button>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Văn bản: <span className="font-bold text-[#765534]">{currentEx.audio}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-600 mb-6">
                    <p>Hãy nghe kỹ và chọn đáp án đúng bên dưới</p>
                  </div>
                </div>

                {/* Questions */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-bold text-[#765534] mb-6">
                    {currentEx.question}
                  </h3>

                  <div className="space-y-3">
                    {currentEx.options.map((option, index) => {
                      const isSelected = selectedAnswer === index
                      const isCorrect = index === currentEx.correct
                      const showCorrectAnswer = showResult && isCorrect
                      const showWrongAnswer = showResult && isSelected && !isCorrect

                      return (
                        <button
                          key={index}
                          onClick={() => !showResult && handleAnswer(index)}
                          disabled={showResult}
                          className={`w-full text-left p-4 rounded-xl transition-all border-2 flex items-center justify-between ${
                            showCorrectAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : showWrongAnswer
                              ? 'bg-red-100 border-red-500 text-red-800'
                              : isSelected
                              ? 'bg-[#FEE173] border-[#FEC900]'
                              : 'bg-gray-50 border-transparent hover:bg-[#FEE173] hover:border-[#FEC900]'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <span className="font-medium">{option}</span>
                          {showCorrectAnswer && <Check size={24} className="text-green-600" />}
                          {showWrongAnswer && <X size={24} className="text-red-600" />}
                        </button>
                      )
                    })}
                  </div>

                  {showResult && (
                    <div className={`mt-6 p-4 rounded-xl ${
                      selectedAnswer === currentEx.correct
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <p className="font-semibold text-center">
                        {selectedAnswer === currentEx.correct
                          ? '🎉 Chính xác! Bạn đã trả lời đúng!'
                          : `❌ Sai rồi! Đáp án đúng là: ${currentEx.options[currentEx.correct]}`
                        }
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <button 
                      onClick={handlePrev}
                      disabled={currentExercise === 0}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <ChevronLeft size={20} />
                      <span>Bài Trước</span>
                    </button>
                    
                    <button 
                      onClick={() => playAudio(currentEx.audio)}
                      className="px-6 py-3 bg-[#765534] text-white rounded-full font-semibold hover:bg-[#5a4028] transition-colors flex items-center space-x-2"
                    >
                      <Volume2 size={20} />
                      <span>Nghe Lại</span>
                    </button>

                    <button 
                      onClick={handleNext}
                      disabled={currentExercise === currentLesson.exercises.length - 1}
                      className="px-6 py-3 bg-[#FEC900] text-[#765534] rounded-full font-semibold hover:bg-[#FEE173] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <span>Bài Tiếp</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Progress & Score */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Tiến độ</span>
                    <span className="text-sm font-bold text-[#765534]">
                      {currentExercise + 1} / {currentLesson.exercises.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-[#FEC900] h-3 rounded-full transition-all" 
                      style={{ width: `${((currentExercise + 1) / currentLesson.exercises.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Điểm số</span>
                    <span className="text-lg font-bold text-[#765534]">
                      {score} / {currentExercise + 1}
                    </span>
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
