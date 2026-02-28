import React from 'react'
import {Clock, FileText, Headphones, BookOpen, Target} from 'lucide-react'

export default function MockTestPage() {
  const testSections = [
    { icon: BookOpen, title: 'Chữ - Từ vựng', questions: 25, time: 25, color: 'bg-[#FEC900]' },
    { icon: FileText, title: 'Ngữ pháp', questions: 25, time: 30, color: 'bg-[#FEE173]' },
    { icon: Headphones, title: 'Nghe hiểu', questions: 30, time: 30, color: 'bg-[#FEC900]' }
  ]

  const previousTests = [
    { id: 1, date: '15/01/2024', score: 85, passed: true },
    { id: 2, date: '10/01/2024', score: 72, passed: true },
    { id: 3, date: '05/01/2024', score: 65, passed: false }
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Thi Thử JLPT N5
          </h1>
          <p className="text-lg text-gray-600">
            Đề thi thử theo chuẩn JLPT N5 chính thức
          </p>
        </div>

        {/* Test Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#765534]">Cấu Trúc Đề Thi</h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={20} />
              <span className="font-semibold">Tổng: 85 phút</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {testSections.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className={`${section.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={32} className="text-[#765534]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#765534] mb-3">{section.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Số câu hỏi:</span>
                      <span className="font-semibold">{section.questions} câu</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thời gian:</span>
                      <span className="font-semibold">{section.time} phút</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-br from-[#FEC900] to-[#FEE173] rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                <Target size={40} className="text-[#765534]" />
              </div>
              <h3 className="text-2xl font-bold text-[#765534] mb-2">
                Sẵn Sàng Làm Bài?
              </h3>
              <p className="text-gray-700">
                Hãy đảm bảo bạn có đủ 85 phút và môi trường yên tĩnh để làm bài
              </p>
            </div>
            <button className="bg-[#765534] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#5a4028] transition-colors shadow-lg">
              Bắt Đầu Làm Bài
            </button>
          </div>
        </div>

        {/* Previous Tests */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#765534] mb-6">Lịch Sử Thi Thử</h2>

          {previousTests.length > 0 ? (
            <div className="space-y-4">
              {previousTests.map((test) => (
                <div key={test.id} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-2xl font-bold text-[#765534]">#{test.id}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">Đề thi số {test.id}</div>
                      <div className="text-sm text-gray-600">Ngày thi: {test.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Điểm số</div>
                      <div className="text-2xl font-bold text-[#765534]">{test.score}/100</div>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full font-semibold ${
                        test.passed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {test.passed ? 'Đạt' : 'Chưa đạt'}
                      </span>
                    </div>
                    <button className="text-[#765534] hover:text-[#5a4028] font-semibold">
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600">Chưa có lịch sử thi thử</p>
            </div>
          )}
        </div>

        {/* Test Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#765534] mb-6">Lưu Ý Khi Làm Bài</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#FEC900] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#765534] font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Quản lý thời gian</h3>
                <p className="text-gray-600 text-sm">Phân bổ thời gian hợp lý cho từng phần thi</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#FEC900] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#765534] font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Đọc kỹ đề bài</h3>
                <p className="text-gray-600 text-sm">Hiểu rõ yêu cầu trước khi trả lời</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#FEC900] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#765534] font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Không bỏ qua câu hỏi</h3>
                <p className="text-gray-600 text-sm">Cố gắng trả lời tất cả các câu</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#FEC900] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#765534] font-bold">4</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Kiểm tra lại</h3>
                <p className="text-gray-600 text-sm">Dành thời gian rà soát đáp án</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
