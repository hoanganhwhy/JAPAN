import React from 'react'
import { Link } from 'react-router-dom'
import {BookOpen, FileText, Edit, Headphones, Target, Star, ArrowRight} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Bảng Chữ Cái',
      description: 'Học Hiragana và Katakana với các bài tập đoán chữ, trắc nghiệm, ghép từ và flashcard',
      link: '/alphabet',
      color: 'bg-[#FEC900]'
    },
    {
      icon: FileText,
      title: 'Minna No Nihongo',
      description: 'Học từ vựng và ngữ pháp qua các bài học Minna với bài tập Renshuu',
      link: '/minna',
      color: 'bg-[#FEE173]'
    },
    {
      icon: Edit,
      title: 'Kanji N5',
      description: 'Học 100 chữ Kanji cơ bản với các phương pháp học đa dạng',
      link: '/kanji',
      color: 'bg-[#FEC900]'
    },
    {
      icon: Headphones,
      title: 'Luyện Nghe',
      description: 'Cải thiện kỹ năng nghe với các bài tập nghe và chọn đáp án',
      link: '/listening',
      color: 'bg-[#FEE173]'
    },
    {
      icon: Target,
      title: 'Thi Thử N5',
      description: 'Làm đề thi thử JLPT N5 để đánh giá trình độ của bạn',
      link: '/mock-test',
      color: 'bg-[#FEC900]'
    },
    {
      icon: Star,
      title: 'Từ Yêu Thích',
      description: 'Lưu và ôn tập các từ vựng, Kanji yêu thích của bạn',
      link: '/favorites',
      color: 'bg-[#FEE173]'
    }
  ]

  const stats = [
    { number: '100+', label: 'Bài Học' },
    { number: '1000+', label: 'Từ Vựng' },
    { number: '100', label: 'Chữ Kanji' },
    { number: '200+', label: 'Bài Tập' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FEC900] via-[#FEE173] to-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-6xl">🎌</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#765534] mb-6">
            Học Tiếng Nhật N5
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Website học từ vựng và ngữ pháp tiếng Nhật trình độ N5 một cách dễ hiểu, trực quan và thú vị
          </p>
          <Link
            to="/alphabet"
            className="inline-flex items-center space-x-2 bg-[#765534] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#5a4028] transition-colors shadow-lg"
          >
            <span>Bắt Đầu Học Ngay</span>
            <ArrowRight size={24} />
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-3xl md:text-4xl font-bold text-[#765534] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#765534] mb-4">
            Các Chức Năng Học Tập
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Khám phá các phương pháp học đa dạng và hiệu quả để thành thạo tiếng Nhật N5
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FEC900]"
                >
                  <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-[#765534]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#765534] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-[#765534] font-semibold mt-4 group-hover:translate-x-2 transition-transform">
                    <span>Bắt đầu học</span>
                    <ArrowRight size={20} className="ml-2" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#765534] mb-12">
            Lộ Trình Học Tập
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                { step: '01', title: 'Học Bảng Chữ Cái', desc: 'Bắt đầu với Hiragana và Katakana' },
                { step: '02', title: 'Học Từ Vựng & Ngữ Pháp', desc: 'Theo chương trình Minna No Nihongo' },
                { step: '03', title: 'Học Kanji', desc: '100 chữ Kanji cơ bản cho N5' },
                { step: '04', title: 'Luyện Nghe', desc: 'Cải thiện kỹ năng nghe hiểu' },
                { step: '05', title: 'Thi Thử N5', desc: 'Kiểm tra trình độ của bạn' }
              ].map((item, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-6 shadow-md">
                  <div className="bg-[#FEC900] text-[#765534] font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-[#765534] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#765534] mb-6">
            Sẵn Sàng Bắt Đầu Học?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tham gia cùng hàng ngàn học viên đã thành công với phương pháp học của chúng tôi
          </p>
          <Link
            to="/alphabet"
            className="inline-flex items-center space-x-2 bg-[#FEC900] text-[#765534] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#FEE173] transition-colors shadow-lg"
          >
            <span>Khám Phá Ngay</span>
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#765534] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-2xl">🇯🇵</span>
            <p className="text-xl font-bold mt-2">N5 Japanese Learning</p>
          </div>
          <p className="text-gray-300">
            Website học tiếng Nhật N5 - Dễ hiểu, trực quan và thú vị
          </p>
          <p className="text-gray-400 mt-4 text-sm">
            © 2024 N5 Japanese. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
