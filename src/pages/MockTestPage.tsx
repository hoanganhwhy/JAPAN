import React, { useState, useEffect, useRef } from 'react'
import { Clock, FileText, Headphones, BookOpen, Target, Check, X, RotateCcw, Trophy, Volume2, Play } from 'lucide-react'

const VOCAB_QUESTIONS = [
  { id: 1,  question: '「学生」の読み方は？',   options: ['がくせい','がくいし','がくさい','がくせえ'], correct: 0 },
  { id: 2,  question: '「先生」の読み方は？',   options: ['せんしょう','せんせい','さきせい','さんせい'], correct: 1 },
  { id: 3,  question: '「会社員」の意味は？',   options: ['sinh viên','giáo viên','nhân viên công ty','bác sĩ'], correct: 2 },
  { id: 4,  question: '「時計」の読み方は？',   options: ['じかん','とけい','じけい','とかん'], correct: 1 },
  { id: 5,  question: '「電車」の意味は？',     options: ['xe đạp','xe buýt','tàu điện','máy bay'], correct: 2 },
  { id: 6,  question: '「図書館」の読み方は？', options: ['としょかん','としょうかん','とうしょかん','どしょかん'], correct: 0 },
  { id: 7,  question: '「食べる」の意味は？',   options: ['uống','ăn','ngủ','đi'], correct: 1 },
  { id: 8,  question: '「大学」の読み方は？',   options: ['おおがく','たいがく','だいがく','おおかく'], correct: 2 },
  { id: 9,  question: '「新しい」の意味は？',   options: ['cũ','đẹp','mới','to'], correct: 2 },
  { id: 10, question: '「毎日」の読み方は？',   options: ['まいにち','まいひ','まいじつ','ごとにち'], correct: 0 },
  { id: 11, question: '「病院」の意味は？',     options: ['ngân hàng','bưu điện','bệnh viện','trường học'], correct: 2 },
  { id: 12, question: '「友達」の読み方は？',   options: ['ともたち','ゆうたつ','ともだち','ゆうだち'], correct: 2 },
  { id: 13, question: '「来年」の意味は？',     options: ['năm ngoái','năm nay','năm sau','mỗi năm'], correct: 2 },
  { id: 14, question: '「飲む」の意味は？',     options: ['ăn','uống','nói','nghe'], correct: 1 },
  { id: 15, question: '「右」の読み方は？',     options: ['ひだり','うえ','みぎ','した'], correct: 2 },
  { id: 16, question: '「天気」の意味は？',     options: ['thời tiết','bầu trời','khí hậu','gió'], correct: 0 },
  { id: 17, question: '「銀行」の読み方は？',   options: ['ぎんこう','ぎんこ','きんこう','きんこ'], correct: 0 },
  { id: 18, question: '「去年」の意味は？',     options: ['năm sau','năm nay','năm ngoái','mỗi năm'], correct: 2 },
  { id: 19, question: '「聞く」の意味は？',     options: ['nói','viết','nghe','đọc'], correct: 2 },
  { id: 20, question: '「安い」の読み方は？',   options: ['たかい','やすい','おおい','すくない'], correct: 1 },
  { id: 21, question: '「駅」の読み方は？',     options: ['えさ','えき','えち','えに'], correct: 1 },
  { id: 22, question: '「書く」の意味は？',     options: ['đọc','nghe','viết','nói'], correct: 2 },
  { id: 23, question: '「今月」の意味は？',     options: ['tháng trước','tháng này','tháng sau','mỗi tháng'], correct: 1 },
  { id: 24, question: '「出る」の意味は？',     options: ['vào','ra','đứng','ngồi'], correct: 1 },
  { id: 25, question: '「高い」の読み方は？',   options: ['やすい','たかい','おおきい','ちいさい'], correct: 1 },
]

const GRAMMAR_QUESTIONS = [
  { id: 1,  question: '私は学生＿＿＿。',                               options: ['が','は','です','を'], correct: 2 },
  { id: 2,  question: '９時＿＿＿５時まで働きます。',                   options: ['に','で','から','へ'], correct: 2 },
  { id: 3,  question: '私は学校＿＿＿行きます。',                       options: ['で','に','が','を'], correct: 1 },
  { id: 4,  question: 'これは私＿＿＿本です。',                         options: ['に','が','の','を'], correct: 2 },
  { id: 5,  question: '電車＿＿＿来ます。',                             options: ['を','に','で','が'], correct: 2 },
  { id: 6,  question: '友達＿＿＿帰ります。',                           options: ['が','と','に','を'], correct: 1 },
  { id: 7,  question: '毎朝６時＿＿＿起きます。',                       options: ['に','で','が','を'], correct: 0 },
  { id: 8,  question: '私は医者＿＿＿ありません。',                     options: ['は','じゃ','が','で'], correct: 1 },
  { id: 9,  question: 'あなたは先生＿＿＿か。',                         options: ['が','に','は','です'], correct: 3 },
  { id: 10, question: 'この本は＿＿＿ですか。\n(giá bao nhiêu)',        options: ['どこ','だれ','いくら','なに'], correct: 2 },
  { id: 11, question: '図書館は＿＿＿です。\n(ở kia)',                  options: ['ここ','そこ','あそこ','どこ'], correct: 2 },
  { id: 12, question: '＿＿＿時に寝ますか。\n(Hỏi mấy giờ)',           options: ['どこ','なに','だれ','何'], correct: 3 },
  { id: 13, question: 'いつ日本＿＿＿行きますか。',                     options: ['に','が','へ','で'], correct: 2 },
  { id: 14, question: '「の」の意味は？\n(この本は私のです)',            options: ['của','ở','là','và'], correct: 0 },
  { id: 15, question: 'どこ＿＿＿も行きません。',                       options: ['に','が','へ','で'], correct: 2 },
  { id: 16, question: '＿＿＿は本です。\n(Đây là sách)',                options: ['それ','あれ','これ','どれ'], correct: 2 },
  { id: 17, question: '＿＿＿本は私のです。\n(Cuốn sách này)',          options: ['その','あの','どの','この'], correct: 3 },
  { id: 18, question: '田中さんは会社員＿＿＿。\n(khẳng định)',         options: ['ではありません','じゃない','です','ですか'], correct: 2 },
  { id: 19, question: '＿＿＿の会社ですか。\n(Công ty nước nào)',       options: ['なに','どこ','だれ','いつ'], correct: 1 },
  { id: 20, question: '9時から5時＿＿＿働きます。',                     options: ['から','まで','に','で'], correct: 1 },
  { id: 21, question: '私は毎晩11時＿＿＿寝ます。',                     options: ['に','で','が','を'], correct: 0 },
  { id: 22, question: 'これ＿＿＿辞書ですか、本ですか。',               options: ['が','は','を','に'], correct: 1 },
  { id: 23, question: '＿＿＿は教室です。\n(Đây là phòng học)',         options: ['そこ','あそこ','どこ','ここ'], correct: 3 },
  { id: 24, question: 'バス＿＿＿学校へ行きます。\n(bằng xe buýt)',     options: ['に','が','で','を'], correct: 2 },
  { id: 25, question: '私は先生＿＿＿ありません。',                     options: ['が','じゃ','に','で'], correct: 1 },
]

const LISTENING_QUESTIONS = [
  { id: 1,  audio: '私は学生です',               question: 'Người nói là ai?',                           options: ['Giáo viên','Sinh viên','Bác sĩ','Kỹ sư'], correct: 1 },
  { id: 2,  audio: '毎朝七時に起きます',          question: 'Thức dậy lúc mấy giờ?',                     options: ['6 giờ','7 giờ','8 giờ','9 giờ'], correct: 1 },
  { id: 3,  audio: '電車で学校へ行きます',        question: 'Đi học bằng gì?',                           options: ['Xe buýt','Tàu điện','Xe đạp','Đi bộ'], correct: 1 },
  { id: 4,  audio: 'これはいくらですか',          question: 'Đang hỏi gì?',                              options: ['Đây là gì?','Giá bao nhiêu?','Ở đâu?','Của ai?'], correct: 1 },
  { id: 5,  audio: '友達と帰ります',              question: 'Về nhà cùng ai?',                           options: ['Một mình','Bạn bè','Gia đình','Giáo viên'], correct: 1 },
  { id: 6,  audio: '図書館で勉強します',          question: 'Học ở đâu?',                                options: ['Nhà','Lớp học','Thư viện','Quán cà phê'], correct: 2 },
  { id: 7,  audio: '今日は学校へ行きません',      question: 'Hôm nay người nói làm gì?',                 options: ['Đi học','Không đi học','Đi làm','Đi mua sắm'], correct: 1 },
  { id: 8,  audio: '九時から五時まで働きます',    question: 'Làm việc từ - đến mấy giờ?',                options: ['8h-4h','9h-5h','8h-5h','9h-6h'], correct: 1 },
  { id: 9,  audio: '千円です',                    question: 'Giá là bao nhiêu?',                         options: ['100 yên','500 yên','1000 yên','5000 yên'], correct: 2 },
  { id: 10, audio: 'この本は私のです',            question: 'Cuốn sách này là của ai?',                  options: ['Bạn bè','Giáo viên','Người nói','Không ai'], correct: 2 },
  { id: 11, audio: 'ここは教室です',              question: 'Đây là đâu?',                               options: ['Thư viện','Nhà ăn','Phòng học','Văn phòng'], correct: 2 },
  { id: 12, audio: '駅はあそこです',              question: 'Ga ở đâu?',                                 options: ['Đây','Đó','Kia','Không biết'], correct: 2 },
  { id: 13, audio: '私はベトナム人です',          question: 'Người nói đến từ đâu?',                     options: ['Nhật Bản','Việt Nam','Trung Quốc','Hàn Quốc'], correct: 1 },
  { id: 14, audio: '毎晩十一時に寝ます',          question: 'Ngủ lúc mấy giờ?',                         options: ['10 giờ','11 giờ','12 giờ','1 giờ sáng'], correct: 1 },
  { id: 15, audio: 'あれは何ですか',              question: 'Đang hỏi về điều gì?',                      options: ['Cái kia là gì','Cái này là gì','Cái đó là gì','Cái nào là gì'], correct: 0 },
  { id: 16, audio: 'タクシーで来ました',          question: 'Người nói đến bằng gì?',                    options: ['Xe buýt','Tàu điện','Taxi','Đi bộ'], correct: 2 },
  { id: 17, audio: '来週日本へ行きます',          question: 'Đi Nhật khi nào?',                          options: ['Tuần này','Tuần sau','Tháng sau','Năm sau'], correct: 1 },
  { id: 18, audio: 'この時計は高いです',          question: 'Đồng hồ này thế nào?',                      options: ['Rẻ','Đắt','Đẹp','Cũ'], correct: 1 },
  { id: 19, audio: '朝ごはんを食べます',          question: 'Đang làm gì?',                              options: ['Ăn sáng','Ăn trưa','Ăn tối','Uống cà phê'], correct: 0 },
  { id: 20, audio: 'どこへも行きません',          question: 'Người nói sẽ đi đâu?',                      options: ['Đi học','Đi chơi','Không đi đâu','Đi làm'], correct: 2 },
  { id: 21, audio: 'これは私の本ではありません',  question: 'Cuốn sách này là của ai?',                   options: ['Người nói','Không phải người nói','Của bạn','Của giáo viên'], correct: 1 },
  { id: 22, audio: 'まっすぐ行ってください',      question: 'Đang chỉ đường thế nào?',                   options: ['Rẽ trái','Rẽ phải','Đi thẳng','Quay lại'], correct: 2 },
  { id: 23, audio: '今日は暑いですね',            question: 'Hôm nay thời tiết thế nào?',                options: ['Lạnh','Mát','Nóng','Mưa'], correct: 2 },
  { id: 24, audio: 'お元気ですか',                question: 'Câu này có nghĩa là gì?',                   options: ['Bạn tên gì?','Bạn khỏe không?','Bạn ở đâu?','Bạn bao nhiêu tuổi?'], correct: 1 },
  { id: 25, audio: 'ありがとうございます',        question: 'Câu này dùng khi nào?',                     options: ['Chào hỏi','Xin lỗi','Cảm ơn','Tạm biệt'], correct: 2 },
  { id: 26, audio: 'すみません、駅はどこですか',  question: 'Đang hỏi gì?',                              options: ['Xin lỗi','Hỏi đường đến ga','Hỏi giá vé','Chào hỏi'], correct: 1 },
  { id: 27, audio: '次の角を右に曲がってください',question: 'Tại ngã tư tiếp theo phải làm gì?',         options: ['Rẽ trái','Rẽ phải','Đi thẳng','Dừng lại'], correct: 1 },
  { id: 28, audio: '私の家族は四人です',          question: 'Gia đình có bao nhiêu người?',              options: ['3 người','4 người','5 người','6 người'], correct: 1 },
  { id: 29, audio: '父は会社員です',              question: 'Bố làm nghề gì?',                           options: ['Giáo viên','Bác sĩ','Nhân viên công ty','Kỹ sư'], correct: 2 },
  { id: 30, audio: 'どうぞよろしくお願いします',  question: 'Câu này dùng khi nào?',                     options: ['Khi chia tay','Khi giới thiệu bản thân','Khi cảm ơn','Khi xin lỗi'], correct: 1 },
]

const SECTIONS = [
  { key: 'vocab',     label: 'Chữ - Từ vựng', short: 'Từ vựng',  questions: VOCAB_QUESTIONS     },
  { key: 'grammar',   label: 'Ngữ pháp',       short: 'Ngữ pháp', questions: GRAMMAR_QUESTIONS   },
  { key: 'listening', label: 'Nghe hiểu',      short: 'Nghe',     questions: LISTENING_QUESTIONS },
]

// ── HELPERS ───────────────────────────────────────────────────────────────────
const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'; u.rate = 0.8
    window.speechSynthesis.speak(u)
  }
}

// ── CONFIRM DIALOG ────────────────────────────────────────────────────────────
function ConfirmDialog({ answered, total, onConfirm, onCancel }) {
  const unanswered = total - answered
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
      <div style={{ background:'white', borderRadius:'20px', padding:'32px', maxWidth:'400px', width:'100%', textAlign:'center', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ width:64, height:64, background:'#FEE173', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
          <FileText size={32} color="#765534" />
        </div>
        <h3 style={{ fontSize:'20px', fontWeight:700, color:'#765534', marginBottom:'12px' }}>Xác nhận nộp bài?</h3>
        {unanswered > 0
          ? <p style={{ color:'#6b7280', marginBottom:'8px', fontSize:'14px' }}>Bạn còn <span style={{ fontWeight:700, color:'#ef4444' }}>{unanswered} câu chưa trả lời</span>.</p>
          : <p style={{ color:'#6b7280', marginBottom:'8px', fontSize:'14px' }}>Bạn đã trả lời đủ <span style={{ fontWeight:700, color:'#22c55e' }}>{total} câu</span>.</p>
        }
        <p style={{ color:'#9ca3af', marginBottom:'24px', fontSize:'13px' }}>Sau khi nộp bài sẽ không thể sửa đáp án.</p>
        <div style={{ display:'flex', gap:'12px' }}>
          <button onClick={onCancel} style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#f3f4f6', color:'#374151', fontWeight:600, cursor:'pointer', fontSize:'14px' }}>
            Làm tiếp
          </button>
          <button onClick={onConfirm} style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#FEC900', color:'#765534', fontWeight:700, cursor:'pointer', fontSize:'14px' }}>
            Nộp Bài ✓
          </button>
        </div>
      </div>
    </div>
  )
}

// ── AUDIO BLOCK (styled like ListeningPage) ───────────────────────────────────
function AudioBlock({ text }) {
  return (
    <div style={{ display:'flex', justifyContent:'center', marginBottom:'20px' }}>
      <div style={{ background:'linear-gradient(135deg,#FEC900,#FEE173)', borderRadius:'16px', padding:'20px 40px', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }}>
        <div style={{ background:'white', width:'56px', height:'56px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}>
          <Volume2 size={28} color="#765534" />
        </div>
        <button onClick={() => playAudio(text)} style={{ background:'#765534', color:'white', border:'none', padding:'10px 24px', borderRadius:'50px', fontWeight:600, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', boxShadow:'0 4px 12px rgba(118,85,52,0.3)' }}>
          <Play size={16} />
          Phát Âm Thanh
        </button>
      </div>
    </div>
  )
}

// ── QUESTION PANEL (side) ─────────────────────────────────────────────────────
function QuestionPanel({ answers, sectionIdx, qIdx, onGoTo, onSubmitRequest, reviewMode, allAnswers }) {
  const totalAnswered = SECTIONS.reduce((acc, s) =>
    acc + s.questions.filter((_, i) => answers[`${s.key}_${i}`] !== undefined).length, 0)
  const totalQs = SECTIONS.reduce((a, s) => a + s.questions.length, 0)

  return (
    <div style={{ width:'210px', minWidth:'210px', background:'white', borderRadius:'16px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'16px', display:'flex', flexDirection:'column', gap:'14px', height:'fit-content', position:'sticky', top:'72px' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontWeight:700, color:'#765534', fontSize:'13px', marginBottom:'6px' }}>
          {reviewMode ? 'Kết Quả' : 'Danh sách câu hỏi'}
        </div>
        {!reviewMode && (
          <div style={{ background:'#FEE173', borderRadius:'20px', padding:'3px 10px', fontSize:'12px', fontWeight:600, color:'#765534', display:'inline-block' }}>
            {totalAnswered}/{totalQs} đã trả lời
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', flexDirection:'column', gap:'5px', fontSize:'11px', color:'#666' }}>
        <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ width:12, height:12, borderRadius:3, background:'#FEF9C3', border:'2px solid #FEC900', display:'inline-block', flexShrink:0 }} />
          <span style={{ color:'#B45309', fontWeight:600 }}>Đang xem</span>
        </span>
        {reviewMode ? (
          <>
            <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:12, height:12, borderRadius:3, background:'#dcfce7', border:'2px solid #22c55e', display:'inline-block', flexShrink:0 }} />
              <span style={{ color:'#16a34a', fontWeight:600 }}>Đúng</span>
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:12, height:12, borderRadius:3, background:'#fee2e2', border:'2px solid #ef4444', display:'inline-block', flexShrink:0 }} />
              <span style={{ color:'#dc2626', fontWeight:600 }}>Sai</span>
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:12, height:12, borderRadius:3, background:'#f9fafb', border:'2px solid #e5e7eb', display:'inline-block', flexShrink:0 }} />Bỏ qua
            </span>
          </>
        ) : (
          <>
            <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:12, height:12, borderRadius:3, background:'#dcfce7', border:'2px solid #22c55e', display:'inline-block', flexShrink:0 }} />
              <span style={{ color:'#16a34a', fontWeight:600 }}>Đã trả lời</span>
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:12, height:12, borderRadius:3, background:'#f9fafb', border:'2px solid #e5e7eb', display:'inline-block', flexShrink:0 }} />Chưa làm
            </span>
          </>
        )}
      </div>

      {SECTIONS.map((s, si) => {
        const done = s.questions.filter((_, qi) => answers[`${s.key}_${qi}`] !== undefined).length
        return (
          <div key={s.key}>
            <div style={{ fontSize:'11px', fontWeight:700, color:'#765534', marginBottom:'6px', display:'flex', justifyContent:'space-between' }}>
              <span>{s.short}</span>
              <span style={{ fontWeight:400, color:'#9ca3af', fontSize:'10px' }}>{done}/{s.questions.length}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:'4px' }}>
              {s.questions.map((q, qi) => {
                const isActive  = si === sectionIdx && qi === qIdx
                const userAns   = answers[`${s.key}_${qi}`]
                const answered  = userAns !== undefined
                let bg, color, border, shadow
                if (isActive) {
                  // Câu đang xem: vàng nhạt + viền vàng + số cam
                  bg='#FEF9C3'; color='#B45309'; border='2px solid #FEC900'; shadow='0 2px 8px rgba(254,201,0,0.35)'
                } else if (reviewMode) {
                  if (!answered)                { bg='#f9fafb'; color='#c4c4c4'; border='2px solid #e5e7eb'; shadow='none' }
                  else if (userAns===q.correct)  { bg='#dcfce7'; color='#16a34a'; border='2px solid #22c55e'; shadow='0 1px 6px rgba(34,197,94,0.25)' }
                  else                           { bg='#fee2e2'; color='#dc2626'; border='2px solid #ef4444'; shadow='0 1px 6px rgba(239,68,68,0.25)' }
                } else {
                  if (answered) {
                    // Đã chọn khi đang thi: xanh lá nhạt + viền xanh + số xanh
                    bg='#dcfce7'; color='#16a34a'; border='2px solid #22c55e'; shadow='0 1px 6px rgba(34,197,94,0.25)'
                  } else {
                    bg='#f9fafb'; color='#c4c4c4'; border='2px solid #e5e7eb'; shadow='none'
                  }
                }
                return (
                  <button key={qi} onClick={() => onGoTo(si, qi)}
                    style={{ background:bg, color, border, borderRadius:'6px', width:'100%', aspectRatio:'1', fontSize:'11px', fontWeight:700, cursor:'pointer', transition:'all 0.15s', boxShadow:shadow, transform:isActive?'scale(1.1)':'none', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {qi + 1}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {!reviewMode && (
        <button onClick={onSubmitRequest} style={{ background:'#FEC900', color:'#765534', border:'none', borderRadius:'20px', padding:'10px', fontWeight:700, fontSize:'13px', cursor:'pointer', marginTop:'4px' }}>
          Nộp Bài ✓
        </button>
      )}
    </div>
  )
}

// ── EXAM ─────────────────────────────────────────────────────────────────────
function ExamScreen({ onFinish }) {
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx]             = useState(0)
  const [answers, setAnswers]       = useState({})
  const [timeLeft, setTimeLeft]     = useState(85 * 60)
  const [showConfirm, setShowConfirm] = useState(false)
  const timerRef = useRef(null)

  const curSection    = SECTIONS[sectionIdx]
  const curQ          = curSection.questions[qIdx]
  const answerKey     = `${curSection.key}_${qIdx}`
  const selectedAnswer = answers[answerKey] ?? null

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); doSubmit(); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  const calcScore  = (sec) => {
    const qs = SECTIONS.find(s => s.key === sec).questions
    return qs.reduce((acc, _, i) => acc + (answers[`${sec}_${i}`] === qs[i].correct ? 1 : 0), 0)
  }
  const doSubmit = () => { clearInterval(timerRef.current); onFinish(calcScore('vocab'), calcScore('grammar'), calcScore('listening'), answers) }

  const goTo   = (si, qi) => { setSectionIdx(si); setQIdx(qi) }
  const goNext = () => { if (qIdx < curSection.questions.length-1) { setQIdx(q=>q+1) } else if (sectionIdx < SECTIONS.length-1) { setSectionIdx(s=>s+1); setQIdx(0) } }
  const goPrev = () => { if (qIdx > 0) { setQIdx(q=>q-1) } else if (sectionIdx > 0) { setSectionIdx(s=>s-1); setQIdx(SECTIONS[sectionIdx-1].questions.length-1) } }

  const totalAnswered = SECTIONS.reduce((acc,s) => acc + s.questions.filter((_,i) => answers[`${s.key}_${i}`]!==undefined).length, 0)
  const totalQs = SECTIONS.reduce((a,s)=>a+s.questions.length,0)
  const isFirst = sectionIdx===0 && qIdx===0

  return (
    <div style={{ minHeight:'100vh', background:'#f9fafb' }}>
      {showConfirm && <ConfirmDialog answered={totalAnswered} total={totalQs} onConfirm={doSubmit} onCancel={() => setShowConfirm(false)} />}

      {/* Top bar */}
      <div style={{ background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.08)', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ fontWeight:700, color:'#765534', fontSize:'16px' }}>Thi Thử N5</div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', fontWeight:700, fontSize:'16px', color:timeLeft<300?'#ef4444':'#765534' }}>
          <Clock size={16} /> {formatTime(timeLeft)}
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          {SECTIONS.map((s,i) => (
            <button key={s.key} onClick={() => { setSectionIdx(i); setQIdx(0) }}
              style={{ padding:'4px 12px', borderRadius:'20px', border:'none', fontWeight:600, fontSize:'12px', cursor:'pointer', background:i===sectionIdx?'#FEC900':'#f3f4f6', color:i===sectionIdx?'#765534':'#6b7280' }}>
              {s.short}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'20px 16px', display:'flex', gap:'20px', alignItems:'flex-start' }}>
        {/* Question card */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
              <h2 style={{ fontWeight:700, color:'#765534', fontSize:'18px', margin:0 }}>{curSection.label}</h2>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#765534', background:'#FEE173', padding:'4px 12px', borderRadius:'20px' }}>
                {qIdx+1} / {curSection.questions.length}
              </div>
            </div>

            {curSection.key === 'listening' && curQ.audio && <AudioBlock text={curQ.audio} />}

            <div style={{ textAlign:'center', marginBottom:'24px' }}>
              <div style={{ fontSize:'32px', fontWeight:700, color:'#765534', whiteSpace:'pre-line', lineHeight:1.4, marginBottom:'8px' }}>{curQ.question}</div>
              <p style={{ color:'#9ca3af', fontSize:'14px', margin:0 }}>Chọn đáp án đúng:</p>
            </div>

            {/* Options — no reveal */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px' }}>
              {curQ.options.map((opt, i) => {
                const isSel = selectedAnswer === i
                return (
                  <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [answerKey]: i }))}
                    style={{ padding:'16px', borderRadius:'14px', fontSize:'15px', fontWeight:600, cursor:'pointer', transition:'all 0.15s', background:isSel?'#FEC900':'#FEE173', border:isSel?'2px solid #e6b100':'2px solid transparent', color:'#765534', boxShadow:isSel?'0 4px 12px rgba(254,201,0,0.4)':'none', transform:isSel?'scale(1.02)':'none' }}
                    onMouseEnter={e => { if (!isSel) { e.currentTarget.style.background='#FEC900'; e.currentTarget.style.transform='scale(1.02)' } }}
                    onMouseLeave={e => { if (!isSel) { e.currentTarget.style.background='#FEE173'; e.currentTarget.style.transform='scale(1)' } }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={goPrev} disabled={isFirst} style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#f3f4f6', color:'#4b5563', fontWeight:600, fontSize:'14px', cursor:isFirst?'not-allowed':'pointer', opacity:isFirst?0.4:1 }}>← Câu trước</button>
              <button onClick={goNext} style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#FEC900', color:'#765534', fontWeight:600, fontSize:'14px', cursor:'pointer' }}>Câu tiếp →</button>
            </div>
          </div>
        </div>

        <QuestionPanel answers={answers} sectionIdx={sectionIdx} qIdx={qIdx} onGoTo={goTo} onSubmitRequest={() => setShowConfirm(true)} reviewMode={false} />
      </div>
    </div>
  )
}

// ── REVIEW ────────────────────────────────────────────────────────────────────
function ReviewScreen({ answers, onRetry, onHome }) {
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx]             = useState(0)

  const curSection  = SECTIONS[sectionIdx]
  const curQ        = curSection.questions[qIdx]
  const answerKey   = `${curSection.key}_${qIdx}`
  const userAnswer  = answers[answerKey] ?? null
  const isCorrect   = userAnswer === curQ.correct
  const isFirst     = sectionIdx===0 && qIdx===0
  const isLast      = sectionIdx===SECTIONS.length-1 && qIdx===curSection.questions.length-1

  const goTo   = (si, qi) => { setSectionIdx(si); setQIdx(qi) }
  const goNext = () => { if (qIdx < curSection.questions.length-1) { setQIdx(q=>q+1) } else if (sectionIdx < SECTIONS.length-1) { setSectionIdx(s=>s+1); setQIdx(0) } }
  const goPrev = () => { if (qIdx > 0) { setQIdx(q=>q-1) } else if (sectionIdx > 0) { setSectionIdx(s=>s-1); setQIdx(SECTIONS[sectionIdx-1].questions.length-1) } }

  return (
    <div style={{ minHeight:'100vh', background:'#f9fafb' }}>
      <div style={{ background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.08)', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:20 }}>
        <div style={{ fontWeight:700, color:'#765534', fontSize:'16px' }}>Xem Đáp Án</div>
        <div style={{ display:'flex', gap:'6px' }}>
          {SECTIONS.map((s,i) => (
            <button key={s.key} onClick={() => { setSectionIdx(i); setQIdx(0) }}
              style={{ padding:'4px 12px', borderRadius:'20px', border:'none', fontWeight:600, fontSize:'12px', cursor:'pointer', background:i===sectionIdx?'#FEC900':'#f3f4f6', color:i===sectionIdx?'#765534':'#6b7280' }}>
              {s.short}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <button onClick={onRetry} style={{ padding:'6px 14px', borderRadius:'20px', border:'none', background:'#FEC900', color:'#765534', fontWeight:600, fontSize:'12px', cursor:'pointer' }}>Thi Lại</button>
          <button onClick={onHome}  style={{ padding:'6px 14px', borderRadius:'20px', border:'none', background:'#f3f4f6', color:'#374151', fontWeight:600, fontSize:'12px', cursor:'pointer' }}>Trang Chính</button>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'20px 16px', display:'flex', gap:'20px', alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
              <h2 style={{ fontWeight:700, color:'#765534', fontSize:'18px', margin:0 }}>{curSection.label}</h2>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#765534', background:'#FEE173', padding:'4px 12px', borderRadius:'20px' }}>
                {qIdx+1} / {curSection.questions.length}
              </div>
            </div>

            {curSection.key === 'listening' && curQ.audio && <AudioBlock text={curQ.audio} />}

            <div style={{ textAlign:'center', marginBottom:'24px' }}>
              <div style={{ fontSize:'32px', fontWeight:700, color:'#765534', whiteSpace:'pre-line', lineHeight:1.4 }}>{curQ.question}</div>
            </div>

            {/* Options with revealed answers */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'16px' }}>
              {curQ.options.map((opt, i) => {
                const isUserPick   = userAnswer === i
                const isCorrectOpt = i === curQ.correct
                let bg, border, color
                if (isCorrectOpt)                   { bg='#dcfce7'; border='2px solid #22c55e'; color='#15803d' }
                else if (isUserPick && !isCorrectOpt) { bg='#fee2e2'; border='2px solid #ef4444'; color='#b91c1c' }
                else                                { bg='#f9fafb'; border='2px solid #e5e7eb'; color='#9ca3af' }
                return (
                  <div key={i} style={{ padding:'14px 16px', borderRadius:'14px', background:bg, border, color, fontSize:'15px', fontWeight:600, display:'flex', alignItems:'center', gap:'8px' }}>
                    {isCorrectOpt && <Check size={18} />}
                    {isUserPick && !isCorrectOpt && <X size={18} />}
                    {opt}
                  </div>
                )
              })}
            </div>

            {/* Verdict */}
            <div style={{ padding:'12px 20px', borderRadius:'12px', textAlign:'center', marginBottom:'20px', background:isCorrect?'#dcfce7':userAnswer===null?'#fef9c3':'#fee2e2', color:isCorrect?'#15803d':userAnswer===null?'#92400e':'#b91c1c', fontWeight:600, fontSize:'14px' }}>
              {isCorrect ? '✓ Chính xác!' : userAnswer===null ? '— Câu này bạn chưa trả lời' : `✗ Sai — Đáp án đúng: ${curQ.options[curQ.correct]}`}
            </div>

            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={goPrev} disabled={isFirst} style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#f3f4f6', color:'#4b5563', fontWeight:600, fontSize:'14px', cursor:isFirst?'not-allowed':'pointer', opacity:isFirst?0.4:1 }}>← Câu trước</button>
              <button onClick={goNext} disabled={isLast}  style={{ flex:1, padding:'12px', borderRadius:'50px', border:'none', background:'#FEC900', color:'#765534', fontWeight:600, fontSize:'14px', cursor:isLast?'not-allowed':'pointer', opacity:isLast?0.4:1 }}>Câu tiếp →</button>
            </div>
          </div>
        </div>

        <QuestionPanel answers={answers} sectionIdx={sectionIdx} qIdx={qIdx} onGoTo={goTo} reviewMode={true} />
      </div>
    </div>
  )
}

// ── RESULT ────────────────────────────────────────────────────────────────────
function ResultScreen({ result, onRetry, onHome, onReview }) {
  return (
    <div style={{ minHeight:'100vh', padding:'32px 16px' }}>
      <div style={{ maxWidth:'700px', margin:'0 auto' }}>
        <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'40px', textAlign:'center' }}>
          <div style={{ fontSize:'64px', marginBottom:'16px' }}>{result.passed ? '🎉' : '💪'}</div>
          <h2 style={{ fontSize:'28px', fontWeight:700, color:'#765534', marginBottom:'8px' }}>Kết Quả Thi Thử</h2>
          <div style={{ fontSize:'64px', fontWeight:700, color:'#FEC900', marginBottom:'16px' }}>
            {result.total}<span style={{ fontSize:'22px', color:'#9ca3af' }}>/100</span>
          </div>
          <span style={{ display:'inline-block', padding:'8px 24px', borderRadius:'50px', fontWeight:700, fontSize:'16px', marginBottom:'32px', background:result.passed?'#dcfce7':'#fee2e2', color:result.passed?'#15803d':'#b91c1c' }}>
            {result.passed ? '✅ Đạt' : '❌ Chưa đạt'} (cần ≥ 80 điểm)
          </span>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'32px' }}>
            {[
              { label:'Chữ - Từ vựng', score:result.vocabScore,     total:25 },
              { label:'Ngữ pháp',       score:result.grammarScore,   total:25 },
              { label:'Nghe hiểu',      score:result.listeningScore, total:30 },
            ].map((s,i) => (
              <div key={i} style={{ background:'#FEE173', borderRadius:'14px', padding:'16px' }}>
                <div style={{ fontSize:'12px', color:'#6b7280', marginBottom:'4px' }}>{s.label}</div>
                <div style={{ fontSize:'24px', fontWeight:700, color:'#765534' }}>{s.score}/{s.total}</div>
                <div style={{ fontSize:'13px', color:'#6b7280' }}>{Math.round(s.score/s.total*100)}%</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={onReview} style={{ background:'#765534', color:'white', padding:'12px 28px', borderRadius:'50px', fontWeight:600, border:'none', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', gap:'8px' }}>
              <Check size={18} /> Xem Đáp Án
            </button>
            <button onClick={onRetry} style={{ background:'#FEC900', color:'#765534', padding:'12px 28px', borderRadius:'50px', fontWeight:600, border:'none', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', gap:'8px' }}>
              <RotateCcw size={18} /> Thi Lại
            </button>
            <button onClick={onHome} style={{ background:'#f3f4f6', color:'#374151', padding:'12px 28px', borderRadius:'50px', fontWeight:600, border:'none', cursor:'pointer', fontSize:'14px' }}>
              Trang Chính
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function MockTestPage() {
  const [phase, setPhase]         = useState('overview')
  const [lastResult, setLastResult] = useState(null)
  const [lastAnswers, setLastAnswers] = useState({})
  const [history, setHistory]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('mockTestHistory') || '[]') } catch { return [] }
  })

  const handleFinish = (v, g, l, answers) => {
    const total = Math.round(((v/25)*0.3 + (g/25)*0.4 + (l/30)*0.3) * 100)
    const result = { id:history.length+1, date:new Date().toLocaleDateString('vi-VN'), vocabScore:v, grammarScore:g, listeningScore:l, total, passed:total>=80 }
    const newHistory = [result, ...history]
    setHistory(newHistory); setLastResult(result); setLastAnswers(answers)
    try { localStorage.setItem('mockTestHistory', JSON.stringify(newHistory)) } catch {}
    setPhase('result')
  }

  if (phase === 'exam')
    return <ExamScreen onFinish={handleFinish} />
  if (phase === 'result' && lastResult)
    return <ResultScreen result={lastResult} onRetry={() => setPhase('exam')} onHome={() => setPhase('overview')} onReview={() => setPhase('review')} />
  if (phase === 'review')
    return <ReviewScreen answers={lastAnswers} onRetry={() => setPhase('exam')} onHome={() => setPhase('overview')} />

  const testSections = [
    { icon:BookOpen,   title:'Chữ - Từ vựng', questions:25, time:25, color:'#FEC900' },
    { icon:FileText,   title:'Ngữ pháp',       questions:25, time:30, color:'#FEE173' },
    { icon:Headphones, title:'Nghe hiểu',       questions:30, time:30, color:'#FEC900' },
  ]

  return (
    <div style={{ minHeight:'100vh', padding:'32px 16px' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <h1 style={{ fontSize:'40px', fontWeight:700, color:'#765534', marginBottom:'12px' }}>Thi Thử JLPT N5</h1>
          <p style={{ fontSize:'16px', color:'#6b7280' }}>Đề thi thử theo chuẩn JLPT N5 chính thức</p>
        </div>

        <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'32px', marginBottom:'24px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'22px', fontWeight:700, color:'#765534', margin:0 }}>Cấu Trúc Đề Thi</h2>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', color:'#6b7280' }}>
              <Clock size={18} /><span style={{ fontWeight:600 }}>Tổng: 85 phút</span>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'28px' }}>
            {testSections.map((s,i) => {
              const Icon = s.icon
              return (
                <div key={i} style={{ background:'#f9fafb', borderRadius:'14px', padding:'20px' }}>
                  <div style={{ background:s.color, width:56, height:56, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                    <Icon size={28} color="#765534" />
                  </div>
                  <h3 style={{ fontWeight:700, color:'#765534', marginBottom:10, fontSize:15 }}>{s.title}</h3>
                  <div style={{ fontSize:13, color:'#6b7280', display:'flex', flexDirection:'column', gap:4 }}>
                    <div style={{ display:'flex', justifyContent:'space-between' }}><span>Số câu:</span><span style={{ fontWeight:600 }}>{s.questions} câu</span></div>
                    <div style={{ display:'flex', justifyContent:'space-between' }}><span>Thời gian:</span><span style={{ fontWeight:600 }}>{s.time} phút</span></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ background:'linear-gradient(135deg,#FEC900,#FEE173)', borderRadius:'16px', padding:'32px', textAlign:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:72, height:72, background:'white', borderRadius:'50%', marginBottom:16 }}>
              <Target size={36} color="#765534" />
            </div>
            <h3 style={{ fontSize:22, fontWeight:700, color:'#765534', marginBottom:8 }}>Sẵn Sàng Làm Bài?</h3>
            <p style={{ color:'#6b7280', marginBottom:20 }}>Hãy đảm bảo bạn có đủ 85 phút và môi trường yên tĩnh</p>
            <button onClick={() => setPhase('exam')} style={{ background:'#765534', color:'white', padding:'14px 48px', borderRadius:'50px', fontSize:16, fontWeight:700, border:'none', cursor:'pointer', boxShadow:'0 4px 16px rgba(118,85,52,0.3)' }}>
              Bắt Đầu Làm Bài
            </button>
          </div>
        </div>

        <div style={{ background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', padding:'32px' }}>
          <h2 style={{ fontSize:'22px', fontWeight:700, color:'#765534', marginBottom:'24px', display:'flex', alignItems:'center', gap:'10px' }}>
            <Trophy size={22} color="#FEC900" /> Lịch Sử Thi Thử
          </h2>
          {history.length > 0 ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {history.map(test => (
                <div key={test.id} style={{ background:'#f9fafb', borderRadius:'14px', padding:'20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
                    <div style={{ background:'white', width:56, height:56, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                      <span style={{ fontWeight:700, color:'#765534', fontSize:18 }}>#{test.id}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight:600, color:'#1f2937', marginBottom:4 }}>Đề thi số {test.id}</div>
                      <div style={{ fontSize:13, color:'#6b7280' }}>Ngày thi: {test.date}</div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>Từ vựng: {test.vocabScore}/25 · Ngữ pháp: {test.grammarScore}/25 · Nghe: {test.listeningScore}/30</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:12, color:'#6b7280', marginBottom:2 }}>Điểm số</div>
                      <div style={{ fontSize:24, fontWeight:700, color:'#765534' }}>{test.total}/100</div>
                    </div>
                    <span style={{ padding:'6px 16px', borderRadius:'50px', fontWeight:600, fontSize:14, background:test.passed?'#dcfce7':'#fee2e2', color:test.passed?'#15803d':'#b91c1c' }}>
                      {test.passed ? 'Đạt' : 'Chưa đạt'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'40px 0' }}>
              <div style={{ fontSize:56, marginBottom:12 }}>📝</div>
              <p style={{ color:'#6b7280' }}>Chưa có lịch sử thi thử</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}