import React, { useState } from 'react'
import {BookOpen, FileText, CheckCircle, Brain, Shuffle, CreditCard, Headphones, Star, Volume2} from 'lucide-react'
import VocabQuizMode from '@/components/minna/VocabQuizMode'
import VocabMatchMode from '@/components/minna/VocabMatchMode'
import VocabFlashcardMode from '@/components/minna/VocabFlashcardMode'
import RenshuuMode from '@/components/minna/RenshuuMode'

// Fixed lesson data với dữ liệu thật
const LESSONS_DATA = [
  {
    id: 1,
    title: 'Bài 1',
    completed: false,
    vocabularyCount: 18,
    grammarPoints: 3,
    vocabulary: [
      { japanese: 'わたし', hiragana: 'わたし', kanji: '私', meaning: 'tôi', romaji: 'watashi' },
      { japanese: 'あなた', hiragana: 'あなた', kanji: 'あなた', meaning: 'bạn', romaji: 'anata' },
      { japanese: 'がくせい', hiragana: 'がくせい', kanji: '学生', meaning: 'sinh viên', romaji: 'gakusei' },
      { japanese: 'せんせい', hiragana: 'せんせい', kanji: '先生', meaning: 'giáo viên', romaji: 'sensei' },
      { japanese: 'かいしゃいん', hiragana: 'かいしゃいん', kanji: '会社員', meaning: 'nhân viên công ty', romaji: 'kaishain' },
      { japanese: 'ぎんこういん', hiragana: 'ぎんこういん', kanji: '銀行員', meaning: 'nhân viên ngân hàng', romaji: 'ginkouin' },
      { japanese: 'いしゃ', hiragana: 'いしゃ', kanji: '医者', meaning: 'bác sĩ', romaji: 'isha' },
      { japanese: 'けんきゅうしゃ', hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: 'nhà nghiên cứu', romaji: 'kenkyuusha' },
      { japanese: 'エンジニア', hiragana: 'えんじにあ', kanji: 'エンジニア', meaning: 'kỹ sư', romaji: 'enjinia' },
      { japanese: 'だいがく', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học', romaji: 'daigaku' },
      { japanese: 'びょういん', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', romaji: 'byouin' },
      { japanese: 'でんき', hiragana: 'でんき', kanji: '電気', meaning: 'điện', romaji: 'denki' },
      { japanese: 'だれ', hiragana: 'だれ', kanji: '誰', meaning: 'ai', romaji: 'dare' },
      { japanese: 'どなた', hiragana: 'どなた', kanji: 'どなた', meaning: 'ai (lịch sự)', romaji: 'donata' },
      { japanese: 'さん', hiragana: 'さん', kanji: 'さん', meaning: 'anh/chị (tôn xưng)', romaji: 'san' },
      { japanese: 'ちゃん', hiragana: 'ちゃん', kanji: 'ちゃん', meaning: 'bé (thân mật)', romaji: 'chan' },
      { japanese: 'くん', hiragana: 'くん', kanji: 'くん', meaning: 'bạn (nam)', romaji: 'kun' },
      { japanese: 'じん', hiragana: 'じん', kanji: '人', meaning: 'người (quốc tịch)', romaji: 'jin' }
    ],
    grammar: [
      { 
        pattern: 'N は N です', 
        meaning: 'N là N', 
        example: '私は学生です。', 
        exampleMeaning: 'Tôi là sinh viên.',
        explanation: 'Dùng để giới thiệu bản thân hoặc người khác. は là trợ từ chỉ chủ đề.'
      },
      { 
        pattern: 'N は N じゃありません', 
        meaning: 'N không phải là N', 
        example: '私は先生じゃありません。', 
        exampleMeaning: 'Tôi không phải là giáo viên.',
        explanation: 'Dạng phủ định của câu khẳng định. じゃありません có thể thay bằng ではありません (trang trọng hơn).'
      },
      { 
        pattern: 'N は N ですか', 
        meaning: 'N có phải là N không?', 
        example: 'あなたは学生ですか。', 
        exampleMeaning: 'Bạn có phải là sinh viên không?',
        explanation: 'Câu hỏi yes/no. Thêm か vào cuối câu để tạo câu hỏi.'
      }
    ]
  },
  {
    id: 2,
    title: 'Bài 2',
    completed: false,
    vocabularyCount: 22,
    grammarPoints: 4,
    vocabulary: [
      { japanese: 'これ', hiragana: 'これ', kanji: 'これ', meaning: 'cái này', romaji: 'kore' },
      { japanese: 'それ', hiragana: 'それ', kanji: 'それ', meaning: 'cái đó', romaji: 'sore' },
      { japanese: 'あれ', hiragana: 'あれ', kanji: 'あれ', meaning: 'cái kia', romaji: 'are' },
      { japanese: 'この', hiragana: 'この', kanji: 'この', meaning: 'cái này (+ danh từ)', romaji: 'kono' },
      { japanese: 'その', hiragana: 'その', kanji: 'その', meaning: 'cái đó (+ danh từ)', romaji: 'sono' },
      { japanese: 'あの', hiragana: 'あの', kanji: 'あの', meaning: 'cái kia (+ danh từ)', romaji: 'ano' },
      { japanese: 'ほん', hiragana: 'ほん', kanji: '本', meaning: 'sách', romaji: 'hon' },
      { japanese: 'じしょ', hiragana: 'じしょ', kanji: '辞書', meaning: 'từ điển', romaji: 'jisho' },
      { japanese: 'ざっし', hiragana: 'ざっし', kanji: '雑誌', meaning: 'tạp chí', romaji: 'zasshi' },
      { japanese: 'しんぶん', hiragana: 'しんぶん', kanji: '新聞', meaning: 'báo', romaji: 'shinbun' },
      { japanese: 'ノート', hiragana: 'のーと', kanji: 'ノート', meaning: 'vở', romaji: 'nooto' },
      { japanese: 'えんぴつ', hiragana: 'えんぴつ', kanji: '鉛筆', meaning: 'bút chì', romaji: 'enpitsu' },
      { japanese: 'ボールペン', hiragana: 'ぼーるぺん', kanji: 'ボールペン', meaning: 'bút bi', romaji: 'boorupen' },
      { japanese: 'かばん', hiragana: 'かばん', kanji: 'かばん', meaning: 'cặp', romaji: 'kaban' },
      { japanese: 'とけい', hiragana: 'とけい', kanji: '時計', meaning: 'đồng hồ', romaji: 'tokei' },
      { japanese: 'つくえ', hiragana: 'つくえ', kanji: '机', meaning: 'bàn', romaji: 'tsukue' },
      { japanese: 'いす', hiragana: 'いす', kanji: '椅子', meaning: 'ghế', romaji: 'isu' },
      { japanese: 'チョコレート', hiragana: 'ちょこれーと', kanji: 'チョコレート', meaning: 'sô cô la', romaji: 'chokoreeto' },
      { japanese: 'コーヒー', hiragana: 'こーひー', kanji: 'コーヒー', meaning: 'cà phê', romaji: 'koohii' },
      { japanese: 'えいご', hiragana: 'えいご', kanji: '英語', meaning: 'tiếng Anh', romaji: 'eigo' },
      { japanese: 'にほんご', hiragana: 'にほんご', kanji: '日本語', meaning: 'tiếng Nhật', romaji: 'nihongo' },
      { japanese: 'なん', hiragana: 'なん', kanji: '何', meaning: 'cái gì', romaji: 'nan' }
    ],
    grammar: [
      { 
        pattern: 'これ/それ/あれ は N です', 
        meaning: 'Đây/Đó/Kia là N', 
        example: 'これは本です。', 
        exampleMeaning: 'Đây là sách.',
        explanation: 'これ (gần người nói), それ (gần người nghe), あれ (xa cả hai)'
      },
      { 
        pattern: 'この/その/あの N は N です', 
        meaning: 'Cái N này/đó/kia là N', 
        example: 'この本は私のです。', 
        exampleMeaning: 'Cuốn sách này là của tôi.',
        explanation: 'この/その/あの phải đi kèm với danh từ'
      },
      { 
        pattern: 'N の N', 
        meaning: 'N của N', 
        example: '私の本', 
        exampleMeaning: 'sách của tôi',
        explanation: 'の chỉ quan hệ sở hữu'
      },
      { 
        pattern: 'これは N ですか、N ですか', 
        meaning: 'Đây là N hay N?', 
        example: 'これは辞書ですか、本ですか。', 
        exampleMeaning: 'Đây là từ điển hay sách?',
        explanation: 'Câu hỏi lựa chọn'
      }
    ]
  },
  {
    id: 3,
    title: 'Bài 3',
    completed: false,
    vocabularyCount: 20,
    grammarPoints: 4,
    vocabulary: [
      { japanese: 'ここ', hiragana: 'ここ', kanji: 'ここ', meaning: 'đây', romaji: 'koko' },
      { japanese: 'そこ', hiragana: 'そこ', kanji: 'そこ', meaning: 'đó', romaji: 'soko' },
      { japanese: 'あそこ', hiragana: 'あそこ', kanji: 'あそこ', meaning: 'kia', romaji: 'asoko' },
      { japanese: 'どこ', hiragana: 'どこ', kanji: 'どこ', meaning: 'đâu', romaji: 'doko' },
      { japanese: 'きょうしつ', hiragana: 'きょうしつ', kanji: '教室', meaning: 'phòng học', romaji: 'kyoushitsu' },
      { japanese: 'しょくどう', hiragana: 'しょくどう', kanji: '食堂', meaning: 'nhà ăn', romaji: 'shokudou' },
      { japanese: 'としょかん', hiragana: 'としょかん', kanji: '図書館', meaning: 'thư viện', romaji: 'toshokan' },
      { japanese: 'ゆうびんきょく', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: 'bưu điện', romaji: 'yuubinkyoku' },
      { japanese: 'ぎんこう', hiragana: 'ぎんこう', kanji: '銀行', meaning: 'ngân hàng', romaji: 'ginkou' },
      { japanese: 'かいしゃ', hiragana: 'かいしゃ', kanji: '会社', meaning: 'công ty', romaji: 'kaisha' },
      { japanese: 'うち', hiragana: 'うち', kanji: '家', meaning: 'nhà', romaji: 'uchi' },
      { japanese: 'でんわ', hiragana: 'でんわ', kanji: '電話', meaning: 'điện thoại', romaji: 'denwa' },
      { japanese: 'くつ', hiragana: 'くつ', kanji: '靴', meaning: 'giày', romaji: 'kutsu' },
      { japanese: 'ネクタイ', hiragana: 'ねくたい', kanji: 'ネクタイ', meaning: 'cà vạt', romaji: 'nekutai' },
      { japanese: 'ワイン', hiragana: 'わいん', kanji: 'ワイン', meaning: 'rượu vang', romaji: 'wain' },
      { japanese: 'たばこ', hiragana: 'たばこ', kanji: 'たばこ', meaning: 'thuốc lá', romaji: 'tabako' },
      { japanese: 'くに', hiragana: 'くに', kanji: '国', meaning: 'đất nước', romaji: 'kuni' },
      { japanese: 'いくら', hiragana: 'いくら', kanji: 'いくら', meaning: 'bao nhiêu (tiền)', romaji: 'ikura' },
      { japanese: 'えん', hiragana: 'えん', kanji: '円', meaning: 'yên', romaji: 'en' },
      { japanese: 'せん', hiragana: 'せん', kanji: '千', meaning: 'nghìn', romaji: 'sen' }
    ],
    grammar: [
      { 
        pattern: 'ここ/そこ/あそこ は N です', 
        meaning: 'Đây/Đó/Kia là N', 
        example: 'ここは教室です。', 
        exampleMeaning: 'Đây là phòng học.',
        explanation: 'Chỉ địa điểm'
      },
      { 
        pattern: 'N は ここ/そこ/あそこ です', 
        meaning: 'N ở đây/đó/kia', 
        example: '図書館はあそこです。', 
        exampleMeaning: 'Thư viện ở kia.',
        explanation: 'Chỉ vị trí của địa điểm'
      },
      { 
        pattern: 'N はいくらですか', 
        meaning: 'N giá bao nhiêu?', 
        example: 'この本はいくらですか。', 
        exampleMeaning: 'Cuốn sách này giá bao nhiêu?',
        explanation: 'Hỏi giá cả'
      },
      { 
        pattern: 'どこの N ですか', 
        meaning: 'N của đâu?', 
        example: 'どこの会社ですか。', 
        exampleMeaning: 'Công ty nào?',
        explanation: 'Hỏi xuất xứ'
      }
    ]
  },
  {
    id: 4,
    title: 'Bài 4',
    completed: false,
    vocabularyCount: 19,
    grammarPoints: 5,
    vocabulary: [
      { japanese: 'おきます', hiragana: 'おきます', kanji: '起きます', meaning: 'thức dậy', romaji: 'okimasu' },
      { japanese: 'ねます', hiragana: 'ねます', kanji: '寝ます', meaning: 'ngủ', romaji: 'nemasu' },
      { japanese: 'はたらきます', hiragana: 'はたらきます', kanji: '働きます', meaning: 'làm việc', romaji: 'hatarakimasu' },
      { japanese: 'やすみます', hiragana: 'やすみます', kanji: '休みます', meaning: 'nghỉ', romaji: 'yasumimasu' },
      { japanese: 'べんきょうします', hiragana: 'べんきょうします', kanji: '勉強します', meaning: 'học', romaji: 'benkyoushimasu' },
      { japanese: 'おわります', hiragana: 'おわります', kanji: '終わります', meaning: 'kết thúc', romaji: 'owarimasu' },
      { japanese: 'いま', hiragana: 'いま', kanji: '今', meaning: 'bây giờ', romaji: 'ima' },
      { japanese: 'じ', hiragana: 'じ', kanji: '時', meaning: 'giờ', romaji: 'ji' },
      { japanese: 'ふん/ぷん', hiragana: 'ふん/ぷん', kanji: '分', meaning: 'phút', romaji: 'fun/pun' },
      { japanese: 'はん', hiragana: 'はん', kanji: '半', meaning: 'rưỡi', romaji: 'han' },
      { japanese: 'なんじ', hiragana: 'なんじ', kanji: '何時', meaning: 'mấy giờ', romaji: 'nanji' },
      { japanese: 'なんぷん', hiragana: 'なんぷん', kanji: '何分', meaning: 'mấy phút', romaji: 'nanpun' },
      { japanese: 'ごぜん', hiragana: 'ごぜん', kanji: '午前', meaning: 'buổi sáng (AM)', romaji: 'gozen' },
      { japanese: 'ごご', hiragana: 'ごご', kanji: '午後', meaning: 'buổi chiều (PM)', romaji: 'gogo' },
      { japanese: 'あさ', hiragana: 'あさ', kanji: '朝', meaning: 'sáng', romaji: 'asa' },
      { japanese: 'ひる', hiragana: 'ひる', kanji: '昼', meaning: 'trưa', romaji: 'hiru' },
      { japanese: 'ばん', hiragana: 'ばん', kanji: '晩', meaning: 'tối', romaji: 'ban' },
      { japanese: 'まいあさ', hiragana: 'まいあさ', kanji: '毎朝', meaning: 'mỗi sáng', romaji: 'maiasa' },
      { japanese: 'まいばん', hiragana: 'まいばん', kanji: '毎晩', meaning: 'mỗi tối', romaji: 'maiban' }
    ],
    grammar: [
      { 
        pattern: 'V ます', 
        meaning: 'Động từ dạng lịch sự', 
        example: '私は働きます。', 
        exampleMeaning: 'Tôi làm việc.',
        explanation: 'Dạng hiện tại, lịch sự của động từ'
      },
      { 
        pattern: 'N は V ます', 
        meaning: 'N làm V', 
        example: '私は勉強します。', 
        exampleMeaning: 'Tôi học.',
        explanation: 'Câu với động từ'
      },
      { 
        pattern: '時間 に V ます', 
        meaning: 'Làm V vào lúc (thời gian)', 
        example: '7時に起きます。', 
        exampleMeaning: 'Tôi thức dậy lúc 7 giờ.',
        explanation: 'に chỉ thời gian cụ thể'
      },
      { 
        pattern: '時間から 時間まで V ます', 
        meaning: 'Từ (giờ) đến (giờ) làm V', 
        example: '9時から5時まで働きます。', 
        exampleMeaning: 'Tôi làm việc từ 9 giờ đến 5 giờ.',
        explanation: 'から (từ), まで (đến)'
      },
      { 
        pattern: '何時に V ますか', 
        meaning: 'Mấy giờ làm V?', 
        example: '何時に寝ますか。', 
        exampleMeaning: 'Mấy giờ bạn ngủ?',
        explanation: 'Câu hỏi về thời gian'
      }
    ]
  },
  {
    id: 5,
    title: 'Bài 5',
    completed: false,
    vocabularyCount: 21,
    grammarPoints: 5,
    vocabulary: [
      { japanese: 'いきます', hiragana: 'いきます', kanji: '行きます', meaning: 'đi', romaji: 'ikimasu' },
      { japanese: 'きます', hiragana: 'きます', kanji: '来ます', meaning: 'đến', romaji: 'kimasu' },
      { japanese: 'かえります', hiragana: 'かえります', kanji: '帰ります', meaning: 've', romaji: 'kaerimasu' },
      { japanese: 'がっこう', hiragana: 'がっこう', kanji: '学校', meaning: 'trường học', romaji: 'gakkou' },
      { japanese: 'スーパー', hiragana: 'すーぱー', kanji: 'スーパー', meaning: 'siêu thị', romaji: 'suupaa' },
      { japanese: 'えき', hiragana: 'えき', kanji: '駅', meaning: 'ga', romaji: 'eki' },
      { japanese: 'ひこうき', hiragana: 'ひこうき', kanji: '飛行機', meaning: 'máy bay', romaji: 'hikouki' },
      { japanese: 'ふね', hiragana: 'ふね', kanji: '船', meaning: 'tàu thuyền', romaji: 'fune' },
      { japanese: 'でんしゃ', hiragana: 'でんしゃ', kanji: '電車', meaning: 'tàu điện', romaji: 'densha' },
      { japanese: 'ちかてつ', hiragana: 'ちかてつ', kanji: '地下鉄', meaning: 'tàu điện ngầm', romaji: 'chikatetsu' },
      { japanese: 'しんかんせん', hiragana: 'しんかんせん', kanji: '新幹線', meaning: 'tàu cao tốc', romaji: 'shinkansen' },
      { japanese: 'バス', hiragana: 'ばす', kanji: 'バス', meaning: 'xe buýt', romaji: 'basu' },
      { japanese: 'タクシー', hiragana: 'たくしー', kanji: 'タクシー', meaning: 'taxi', romaji: 'takushii' },
      { japanese: 'じてんしゃ', hiragana: 'じてんしゃ', kanji: '自転車', meaning: 'xe đạp', romaji: 'jitensha' },
      { japanese: 'あるいて', hiragana: 'あるいて', kanji: '歩いて', meaning: 'đi bộ', romaji: 'aruite' },
      { japanese: 'せんしゅう', hiragana: 'せんしゅう', kanji: '先週', meaning: 'tuần trước', romaji: 'senshuu' },
      { japanese: 'こんしゅう', hiragana: 'こんしゅう', kanji: '今週', meaning: 'tuần này', romaji: 'konshuu' },
      { japanese: 'らいしゅう', hiragana: 'らいしゅう', kanji: '来週', meaning: 'tuần sau', romaji: 'raishuu' },
      { japanese: 'きのう', hiragana: 'きのう', kanji: '昨日', meaning: 'hôm qua', romaji: 'kinou' },
      { japanese: 'きょう', hiragana: 'きょう', kanji: '今日', meaning: 'hôm nay', romaji: 'kyou' },
      { japanese: 'あした', hiragana: 'あした', kanji: '明日', meaning: 'ngày mai', romaji: 'ashita' }
    ],
    grammar: [
      { 
        pattern: 'N へ 行きます/来ます/帰ります', 
        meaning: 'Đi/đến/về N', 
        example: '学校へ行きます。', 
        exampleMeaning: 'Tôi đi đến trường.',
        explanation: 'へ chỉ hướng đi'
      },
      { 
        pattern: 'N で 行きます/来ます/帰ります', 
        meaning: 'Đi/đến/về bằng N', 
        example: '電車で行きます。', 
        exampleMeaning: 'Tôi đi bằng tàu điện.',
        explanation: 'で chỉ phương tiện'
      },
      { 
        pattern: 'N と 行きます/来ます/帰ります', 
        meaning: 'Đi/đến/về cùng N', 
        example: '友達と行きます。', 
        exampleMeaning: 'Tôi đi cùng bạn.',
        explanation: 'と chỉ đồng hành'
      },
      { 
        pattern: 'いつ V ますか', 
        meaning: 'Khi nào V?', 
        example: 'いつ日本へ行きますか。', 
        exampleMeaning: 'Khi nào bạn đi Nhật?',
        explanation: 'Hỏi thời gian (không cụ thể)'
      },
      { 
        pattern: 'どこへも 行きません', 
        meaning: 'Không đi đâu cả', 
        example: 'どこへも行きません。', 
        exampleMeaning: 'Tôi không đi đâu cả.',
        explanation: 'Dạng phủ định toàn bộ'
      }
    ]
  }
]

export default function MinnaPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<'vocabulary' | 'grammar' | 'renshuu'>('vocabulary')
  const [activeMode, setActiveMode] = useState<string | null>(null)

  const currentLesson = LESSONS_DATA.find(l => l.id === selectedLesson)

  const learningModes = [
    { id: 'quiz', icon: Brain, title: 'Trắc Nghiệm', desc: '4 đáp án' },
    { id: 'match', icon: Shuffle, title: 'Ghép Từ', desc: 'Kết nối từ' },
    { id: 'flashcard', icon: CreditCard, title: 'Flashcard', desc: 'Học và nhớ' }
  ]

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  if (activeMode === 'quiz' && currentLesson) {
    return <VocabQuizMode vocabulary={currentLesson.vocabulary} onBack={() => setActiveMode(null)} lessonTitle={currentLesson.title} />
  }

  if (activeMode === 'match' && currentLesson) {
    return <VocabMatchMode vocabulary={currentLesson.vocabulary} onBack={() => setActiveMode(null)} lessonTitle={currentLesson.title} />
  }

  if (activeMode === 'flashcard' && currentLesson) {
    return <VocabFlashcardMode vocabulary={currentLesson.vocabulary} onBack={() => setActiveMode(null)} lessonTitle={currentLesson.title} />
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#765534] mb-4">
            Minna No Nihongo
          </h1>
          <p className="text-lg text-gray-600">
            Học từ vựng và ngữ pháp qua 5 bài học cơ bản
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#765534] mb-4">Danh Sách Bài Học</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {LESSONS_DATA.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedLesson === lesson.id
                        ? 'bg-[#FEC900] text-[#765534] shadow-md'
                        : 'bg-gray-50 hover:bg-[#FEE173] text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {lesson.completed && <CheckCircle size={20} className="text-green-600" />}
                        <span className="font-semibold">{lesson.title}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {lesson.vocabularyCount} từ
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <div className="space-y-6">
                {/* Section Tabs */}
                <div className="bg-white rounded-2xl shadow-lg p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveSection('vocabulary')}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                        activeSection === 'vocabulary'
                          ? 'bg-[#FEC900] text-[#765534]'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Từ Vựng
                    </button>
                    <button
                      onClick={() => setActiveSection('grammar')}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                        activeSection === 'grammar'
                          ? 'bg-[#FEC900] text-[#765534]'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Ngữ Pháp
                    </button>
                    <button
                      onClick={() => setActiveSection('renshuu')}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                        activeSection === 'renshuu'
                          ? 'bg-[#FEC900] text-[#765534]'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Renshuu (練習)
                    </button>
                  </div>
                </div>

                {/* Learning Modes */}
                {activeSection === 'vocabulary' && (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      {learningModes.map((mode) => {
                        const Icon = mode.icon
                        return (
                          <button
                            key={mode.id}
                            onClick={() => setActiveMode(mode.id)}
                            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                          >
                            <div className="bg-[#FEE173] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
                              <Icon size={24} className="text-[#765534]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#765534] mb-1">{mode.title}</h3>
                            <p className="text-xs text-gray-600">{mode.desc}</p>
                          </button>
                        )
                      })}
                    </div>

                    {/* Vocabulary List */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-[#765534] mb-6">
                        Danh Sách Từ Vựng ({currentLesson.vocabulary.length} từ)
                      </h3>
                      <div className="space-y-4">
                        {currentLesson.vocabulary.map((vocab, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-[#FEE173] transition-colors cursor-pointer group">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-2xl font-bold text-[#765534]">{vocab.kanji}</span>
                                  <span className="text-gray-600">({vocab.hiragana})</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      speakWord(vocab.japanese)
                                    }}
                                    className="text-gray-400 hover:text-[#765534] transition-colors"
                                  >
                                    <Volume2 size={20} />
                                  </button>
                                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FEC900] hover:text-[#765534]">
                                    <Star size={20} />
                                  </button>
                                </div>
                                <div className="text-sm text-gray-500 mb-1">Romaji: {vocab.romaji}</div>
                                <div className="text-lg text-gray-700">Nghĩa: {vocab.meaning}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Grammar Section */}
                {activeSection === 'grammar' && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-[#765534] mb-6">
                      Ngữ Pháp ({currentLesson.grammar.length} mẫu câu)
                    </h3>
                    <div className="space-y-6">
                      {currentLesson.grammar.map((grammar, index) => (
                        <div key={index} className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#FEC900]">
                          <div className="bg-[#FEC900] inline-block px-4 py-2 rounded-lg mb-4">
                            <span className="font-bold text-[#765534] text-lg">{grammar.pattern}</span>
                          </div>
                          <div className="mb-3">
                            <span className="text-gray-700 font-medium">Ý nghĩa: </span>
                            <span className="text-gray-600">{grammar.meaning}</span>
                          </div>
                          <div className="bg-white p-4 rounded-lg mb-3">
                            <div className="text-lg text-[#765534] mb-2 font-medium">{grammar.example}</div>
                            <div className="text-gray-600">{grammar.exampleMeaning}</div>
                          </div>
                          <div className="text-sm text-gray-500 italic">
                            💡 {grammar.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Renshuu Section */}
                {activeSection === 'renshuu' && (
                  <RenshuuMode lessonId={currentLesson.id} lessonTitle={currentLesson.title} />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-[#765534] mb-4">
                  Chọn Bài Học
                </h3>
                <p className="text-gray-600">
                  Hãy chọn một bài học từ danh sách bên trái để bắt đầu
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
