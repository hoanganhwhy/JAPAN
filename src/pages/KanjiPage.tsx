import React, { useState } from 'react'
import {BookOpen, Brain, Shuffle, CreditCard, ChevronLeft, Star} from 'lucide-react'
import KanjiGuessMode from '@/components/kanji/KanjiGuessMode'
import KanjiQuizMode from '@/components/kanji/KanjiQuizMode'
import KanjiFlashcardMode from '@/components/kanji/KanjiFlashcardMode'

// Kanji N5 data (80 chữ Kanji cơ bản)
const KANJI_DATA = [
  { kanji: '一', onyomi: 'イチ、イツ', kunyomi: 'ひと(つ)', meaning: 'một', example: '一人 (ひとり) - một người' },
  { kanji: '二', onyomi: 'ニ', kunyomi: 'ふた(つ)', meaning: 'hai', example: '二人 (ふたり) - hai người' },
  { kanji: '三', onyomi: 'サン', kunyomi: 'みっ(つ)', meaning: 'ba', example: '三日 (みっか) - ba ngày' },
  { kanji: '四', onyomi: 'シ', kunyomi: 'よっ(つ)、よん', meaning: 'bốn', example: '四月 (しがつ) - tháng tư' },
  { kanji: '五', onyomi: 'ゴ', kunyomi: 'いつ(つ)', meaning: 'năm', example: '五日 (いつか) - năm ngày' },
  { kanji: '六', onyomi: 'ロク', kunyomi: 'むっ(つ)', meaning: 'sáu', example: '六月 (ろくがつ) - tháng sáu' },
  { kanji: '七', onyomi: 'シチ', kunyomi: 'なな(つ)', meaning: 'bảy', example: '七時 (しちじ) - bảy giờ' },
  { kanji: '八', onyomi: 'ハチ', kunyomi: 'やっ(つ)', meaning: 'tám', example: '八月 (はちがつ) - tháng tám' },
  { kanji: '九', onyomi: 'キュウ、ク', kunyomi: 'ここの(つ)', meaning: 'chín', example: '九時 (くじ) - chín giờ' },
  { kanji: '十', onyomi: 'ジュウ', kunyomi: 'とお', meaning: 'mười', example: '十日 (とおか) - mười ngày' },
  { kanji: '百', onyomi: 'ヒャク', kunyomi: '', meaning: 'trăm', example: '百円 (ひゃくえん) - một trăm yên' },
  { kanji: '千', onyomi: 'セン', kunyomi: '', meaning: 'nghìn', example: '千円 (せんえん) - một nghìn yên' },
  { kanji: '万', onyomi: 'マン', kunyomi: '', meaning: 'vạn', example: '一万円 (いちまんえん) - mười nghìn yên' },
  { kanji: '円', onyomi: 'エン', kunyomi: '', meaning: 'yên, tròn', example: '百円 (ひゃくえn) - một trăm yên' },
  { kanji: '時', onyomi: 'ジ', kunyomi: 'とき', meaning: 'giờ, thời gian', example: '時間 (じかん) - thời gian' },
  { kanji: '日', onyomi: 'ニチ、ジツ', kunyomi: 'ひ、か', meaning: 'ngày, mặt trời', example: '今日 (きょう) - hôm nay' },
  { kanji: '月', onyomi: 'ゲツ、ガツ', kunyomi: 'つき', meaning: 'tháng, mặt trăng', example: '一月 (いちがつ) - tháng một' },
  { kanji: '火', onyomi: 'カ', kunyomi: 'ひ', meaning: 'lửa, thứ ba', example: '火曜日 (かようび) - thứ ba' },
  { kanji: '水', onyomi: 'スイ', kunyomi: 'みず', meaning: 'nước, thứ tư', example: '水曜日 (すいようび) - thứ tư' },
  { kanji: '木', onyomi: 'モク、ボク', kunyomi: 'き', meaning: 'cây, thứ năm', example: '木曜日 (もくようび) - thứ năm' },
  { kanji: '金', onyomi: 'キン、コン', kunyomi: 'かね', meaning: 'vàng, tiền, thứ sáu', example: '金曜日 (きんようび) - thứ sáu' },
  { kanji: '土', onyomi: 'ド、ト', kunyomi: 'つち', meaning: 'đất, thứ bảy', example: '土曜日 (どようび) - thứ bảy' },
  { kanji: '年', onyomi: 'ネン', kunyomi: 'とし', meaning: 'năm', example: '今年 (ことし) - năm nay' },
  { kanji: '人', onyomi: 'ジン、ニン', kunyomi: 'ひと', meaning: 'người', example: '日本人 (にほんじん) - người Nhật' },
  { kanji: '本', onyomi: 'ホン', kunyomi: 'もと', meaning: 'sách, gốc', example: '本 (ほん) - sách' },
  { kanji: '学', onyomi: 'ガク', kunyomi: 'まな(ぶ)', meaning: 'học', example: '学校 (がっこう) - trường học' },
  { kanji: '校', onyomi: 'コウ', kunyomi: '', meaning: 'trường', example: '学校 (がっこう) - trường học' },
  { kanji: '生', onyomi: 'セイ', kunyomi: 'い(きる)、う(まれる)', meaning: 'sinh, sống', example: '学生 (がくせい) - sinh viên' },
  { kanji: '先', onyomi: 'セン', kunyomi: 'さき', meaning: 'trước', example: '先生 (せんせい) - giáo viên' },
  { kanji: '私', onyomi: 'シ', kunyomi: 'わたし', meaning: 'tôi', example: '私 (わたし) - tôi' },
  { kanji: '今', onyomi: 'コン、キン', kunyomi: 'いま', meaning: 'bây giờ', example: '今日 (きょう) - hôm nay' },
  { kanji: '何', onyomi: 'カ', kunyomi: 'なに、なん', meaning: 'cái gì', example: '何 (なに) - cái gì' },
  { kanji: '語', onyomi: 'ゴ', kunyomi: 'かた(る)', meaning: 'ngôn ngữ', example: '日本語 (にほんご) - tiếng Nhật' },
  { kanji: '国', onyomi: 'コク', kunyomi: 'くに', meaning: 'đất nước', example: '外国 (がいこく) - nước ngoài' },
  { kanji: '外', onyomi: 'ガイ、ゲ', kunyomi: 'そと', meaning: 'ngoài', example: '外国 (がいこく) - nước ngoài' },
  { kanji: '大', onyomi: 'ダイ、タイ', kunyomi: 'おお(きい)', meaning: 'to, lớn', example: '大学 (だいがく) - đại học' },
  { kanji: '小', onyomi: 'ショウ', kunyomi: 'ちい(さい)、こ', meaning: 'nhỏ', example: '小学校 (しょうがっこう) - tiểu học' },
  { kanji: '高', onyomi: 'コウ', kunyomi: 'たか(い)', meaning: 'cao', example: '高校 (こうこう) - trường cấp 3' },
  { kanji: '安', onyomi: 'アン', kunyomi: 'やす(い)', meaning: 'rẻ, yên ổn', example: '安い (やすい) - rẻ' },
  { kanji: '新', onyomi: 'シン', kunyomi: 'あたら(しい)', meaning: 'mới', example: '新しい (あたらしい) - mới' },
  { kanji: '古', onyomi: 'コ', kunyomi: 'ふる(い)', meaning: 'cũ', example: '古い (ふるい) - cũ' },
  { kanji: '長', onyomi: 'チョウ', kunyomi: 'なが(い)', meaning: 'dài', example: '長い (ながい) - dài' },
  { kanji: '短', onyomi: 'タン', kunyomi: 'みじか(い)', meaning: 'ngắn', example: '短い (みじかい) - ngắn' },
  { kanji: '元', onyomi: 'ゲン、ガン', kunyomi: 'もと', meaning: 'gốc, nguyên', example: '元気 (げんき) - khỏe mạnh' },
  { kanji: '気', onyomi: 'キ、ケ', kunyomi: '', meaning: 'khí, tâm trạng', example: '元気 (げんき) - khỏe mạnh' },
  { kanji: '天', onyomi: 'テン', kunyomi: 'あめ、あま', meaning: 'trời', example: '天気 (てんき) - thời tiết' },
  { kanji: '電', onyomi: 'デン', kunyomi: '', meaning: 'điện', example: '電車 (でんしゃ) - tàu điện' },
  { kanji: '車', onyomi: 'シャ', kunyomi: 'くるま', meaning: 'xe', example: '車 (くるま) - xe hơi' },
  { kanji: '駅', onyomi: 'エキ', kunyomi: '', meaning: 'ga', example: '駅 (えき) - ga' },
  { kanji: '店', onyomi: 'テン', kunyomi: 'みせ', meaning: 'cửa hàng', example: '店 (みせ) - cửa hàng' },
  { kanji: '買', onyomi: 'バイ', kunyomi: 'か(う)', meaning: 'mua', example: '買い物 (かいもの) - mua sắm' },
  { kanji: '売', onyomi: 'バイ', kunyomi: 'う(る)', meaning: 'bán', example: '売る (うる) - bán' },
  { kanji: '食', onyomi: 'ショク', kunyomi: 'た(べる)、く(う)', meaning: 'ăn', example: '食べる (たべる) - ăn' },
  { kanji: '飲', onyomi: 'イン', kunyomi: 'の(む)', meaning: 'uống', example: '飲む (のむ) - uống' },
  { kanji: '見', onyomi: 'ケン', kunyomi: 'み(る)', meaning: 'xem', example: '見る (みる) - xem' },
  { kanji: '聞', onyomi: 'ブン、モン', kunyomi: 'き(く)', meaning: 'nghe', example: '聞く (きく) - nghe' },
  { kanji: '読', onyomi: 'ドク、トク', kunyomi: 'よ(む)', meaning: 'đọc', example: '読む (よむ) - đọc' },
  { kanji: '書', onyomi: 'ショ', kunyomi: 'か(く)', meaning: 'viết', example: '書く (かく) - viết' },
  { kanji: '話', onyomi: 'ワ', kunyomi: 'はな(す)', meaning: 'nói', example: '話す (はなす) - nói' },
  { kanji: '行', onyomi: 'コウ、ギョウ', kunyomi: 'い(く)、ゆ(く)', meaning: 'đi', example: '行く (いく) - đi' },
  { kanji: '来', onyomi: 'ライ', kunyomi: 'く(る)', meaning: 'đến', example: '来る (くる) - đến' },
  { kanji: '出', onyomi: 'シュツ', kunyomi: 'で(る)、だ(す)', meaning: 'ra', example: '出る (でる) - ra' },
  { kanji: '入', onyomi: 'ニュウ', kunyomi: 'はい(る)、い(れる)', meaning: 'vào', example: '入る (はいる) - vào' },
  { kanji: '立', onyomi: 'リツ', kunyomi: 'た(つ)', meaning: 'đứng', example: '立つ (たつ) - đứng' },
  { kanji: '休', onyomi: 'キュウ', kunyomi: 'やす(む)', meaning: 'nghỉ', example: '休む (やすむ) - nghỉ' },
  { kanji: '上', onyomi: 'ジョウ', kunyomi: 'うえ、あ(がる)', meaning: 'trên', example: '上 (うえ) - trên' },
  { kanji: '下', onyomi: 'カ、ゲ', kunyomi: 'した、さ(がる)', meaning: 'dưới', example: '下 (した) - dưới' },
  { kanji: '中', onyomi: 'チュウ', kunyomi: 'なか', meaning: 'trong, giữa', example: '中 (なか) - trong' },
  { kanji: '左', onyomi: 'サ', kunyomi: 'ひだり', meaning: 'trái', example: '左 (ひだり) - trái' },
  { kanji: '右', onyomi: 'ウ、ユウ', kunyomi: 'みぎ', meaning: 'phải', example: '右 (みぎ) - phải' },
  { kanji: '前', onyomi: 'ゼン', kunyomi: 'まえ', meaning: 'trước', example: '前 (まえ) - trước' },
  { kanji: '後', onyomi: 'ゴ、コウ', kunyomi: 'うし(ろ)、あと', meaning: 'sau', example: '後ろ (うしろ) - sau' },
  { kanji: '名', onyomi: 'メイ、ミョウ', kunyomi: 'な', meaning: 'tên', example: '名前 (なまえ) - tên' },
  { kanji: '手', onyomi: 'シュ', kunyomi: 'て', meaning: 'tay', example: '手 (て) - tay' },
  { kanji: '足', onyomi: 'ソク', kunyomi: 'あし', meaning: 'chân', example: '足 (あし) - chân' },
  { kanji: '目', onyomi: 'モク', kunyomi: 'め', meaning: 'mắt', example: '目 (め) - mắt' },
  { kanji: '耳', onyomi: 'ジ', kunyomi: 'みみ', meaning: 'tai', example: '耳 (みみ) - tai' },
  { kanji: '口', onyomi: 'コウ、ク', kunyomi: 'くち', meaning: 'miệng', example: '口 (くち) - miệng' },
  { kanji: '山', onyomi: 'サン', kunyomi: 'やま', meaning: 'núi', example: '山 (やま) - núi' },
  { kanji: '川', onyomi: 'セン', kunyomi: 'かわ', meaning: 'sông', example: '川 (かわ) - sông' }
]

export default function KanjiPage() {
  const [selectedMode, setSelectedMode] = useState<string>('')
  const [selectedKanji, setSelectedKanji] = useState<typeof KANJI_DATA[0] | null>(null)

  if (selectedMode === 'guess') {
    return <KanjiGuessMode kanjiData={KANJI_DATA} onBack={() => setSelectedMode('')} />
  }

  if (selectedMode === 'quiz') {
    return <KanjiQuizMode kanjiData={KANJI_DATA} onBack={() => setSelectedMode('')} />
  }

  if (selectedMode === 'flashcard') {
    return <KanjiFlashcardMode kanjiData={KANJI_DATA} onBack={() => setSelectedMode('')} />
  }

  const modes = [
    { id: 'learn', icon: BookOpen, title: 'Học Kanji', desc: 'Xem và học', color: 'bg-[#FEC900]' },
    { id: 'guess', icon: Brain, title: 'Đoán Chữ', desc: '4 đáp án', color: 'bg-[#FEE173]' },
    { id: 'quiz', icon: Shuffle, title: 'Trắc Nghiệm', desc: 'Kiểm tra', color: 'bg-[#FEC900]' },
    { id: 'flashcard', icon: CreditCard, title: 'Flashcard', desc: 'Ghi nhớ', color: 'bg-[#FEE173]' }
  ]

  if (selectedMode === 'learn') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedMode('')}
            className="flex items-center text-[#765534] hover:text-[#FEC900] mb-6 font-semibold"
          >
            <ChevronLeft size={24} />
            Quay lại
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#765534] mb-6 text-center">
              80 Chữ Kanji N5
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {KANJI_DATA.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedKanji(item)}
                  className="p-6 bg-gradient-to-br from-[#FEE173] to-white rounded-xl hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-[#FEC900]"
                >
                  <div className="text-5xl font-bold text-[#765534] mb-2">
                    {item.kanji}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.meaning}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Kanji Detail Modal */}
          {selectedKanji && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedKanji(null)}>
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                  <div className="text-8xl font-bold text-[#765534]">
                    {selectedKanji.kanji}
                  </div>
                  <button
                    onClick={() => setSelectedKanji(null)}
                    className="text-gray-400 hover:text-[#765534] text-3xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#FEE173] p-4 rounded-xl">
                    <div className="font-semibold text-[#765534] mb-2">Nghĩa:</div>
                    <div className="text-gray-700 text-lg">{selectedKanji.meaning}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="font-semibold text-[#765534] mb-2">Âm Onyomi (音読み):</div>
                    <div className="text-gray-700 text-lg">{selectedKanji.onyomi || 'Không có'}</div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="font-semibold text-[#765534] mb-2">Âm Kunyomi (訓読み):</div>
                    <div className="text-gray-700 text-lg">{selectedKanji.kunyomi || 'Không có'}</div>
                  </div>

                  <div className="bg-[#FEC900] p-4 rounded-xl">
                    <div className="font-semibold text-[#765534] mb-2">Ví dụ:</div>
                    <div className="text-gray-700 text-lg">{selectedKanji.example}</div>
                  </div>

                  <button className="w-full bg-[#FEC900] text-[#765534] py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors flex items-center justify-center gap-2">
                    <Star size={20} />
                    Thêm vào yêu thích
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Kanji N5
          </h1>
          <p className="text-lg text-gray-600">
            Học 80 chữ Kanji cơ bản cho kỳ thi JLPT N5
          </p>
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

        {/* Kanji Chart Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#765534] mb-6 text-center">
            Bảng Kanji N5 (80 chữ)
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
            {KANJI_DATA.slice(0, 48).map((item, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-[#FEE173] to-white rounded-xl flex items-center justify-center p-2 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#FEC900]"
                title={item.meaning}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#765534]">
                  {item.kanji}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm mb-4">
              ✨ Hiển thị 48/{KANJI_DATA.length} chữ Kanji
            </p>
            <button
              onClick={() => setSelectedMode('learn')}
              className="bg-[#FEC900] text-[#765534] px-8 py-3 rounded-full font-semibold hover:bg-[#FEE173] transition-colors"
            >
              Xem Tất Cả Kanji
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
