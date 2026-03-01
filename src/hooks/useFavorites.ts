import { useState, useEffect, useCallback } from 'react'

export interface FavoriteVocab {
  id: string        // unique key: e.g. "minna_bài1_がくせい"
  japanese: string
  hiragana: string
  kanji: string
  meaning: string
  romaji: string
  category: string  // e.g. "Minna Bài 1"
}

export interface FavoriteKanji {
  id: string        // unique key: e.g. "kanji_本"
  kanji: string
  onyomi: string
  kunyomi: string
  meaning: string
  example: string
}

const VOCAB_KEY  = 'fav_vocab'
const KANJI_KEY  = 'fav_kanji'
const EVENT_NAME = 'favorites_updated'

function loadVocab(): FavoriteVocab[] {
  try { return JSON.parse(localStorage.getItem(VOCAB_KEY) || '[]') } catch { return [] }
}
function loadKanji(): FavoriteKanji[] {
  try { return JSON.parse(localStorage.getItem(KANJI_KEY) || '[]') } catch { return [] }
}

// Default seed data — shown on first load
const DEFAULT_VOCAB: FavoriteVocab[] = [
  { id: 'minna_bài1_がくせい', japanese: 'がくせい', hiragana: 'がくせい', kanji: '学生', meaning: 'sinh viên',  romaji: 'gakusei', category: 'Minna Bài 1' },
  { id: 'minna_bài1_せんせい', japanese: 'せんせい', hiragana: 'せんせい', kanji: '先生', meaning: 'giáo viên',  romaji: 'sensei',  category: 'Minna Bài 1' },
  { id: 'minna_bài2_ほん',     japanese: 'ほん',     hiragana: 'ほん',     kanji: '本',   meaning: 'sách',       romaji: 'hon',     category: 'Minna Bài 2' },
  { id: 'minna_bài2_えんぴつ', japanese: 'えんぴつ', hiragana: 'えんぴつ', kanji: '鉛筆', meaning: 'bút chì',    romaji: 'enpitsu', category: 'Minna Bài 2' },
]
const DEFAULT_KANJI: FavoriteKanji[] = [
  { id: 'kanji_日', kanji: '日', onyomi: 'ニチ、ジツ', kunyomi: 'ひ、か',   meaning: 'ngày, mặt trời', example: '今日 (きょう) - hôm nay' },
  { id: 'kanji_本', kanji: '本', onyomi: 'ホン',       kunyomi: 'もと',     meaning: 'sách, gốc',     example: '本 (ほん) - sách' },
  { id: 'kanji_人', kanji: '人', onyomi: 'ジン、ニン', kunyomi: 'ひと',     meaning: 'người',         example: '人 (ひと) - người' },
]

function initStorage() {
  if (localStorage.getItem(VOCAB_KEY) === null)
    localStorage.setItem(VOCAB_KEY, JSON.stringify(DEFAULT_VOCAB))
  if (localStorage.getItem(KANJI_KEY) === null)
    localStorage.setItem(KANJI_KEY, JSON.stringify(DEFAULT_KANJI))
}

// ── hook ─────────────────────────────────────────────────────────────────────
export function useFavorites() {
  initStorage()
  const [favVocab, setFavVocab] = useState<FavoriteVocab[]>(loadVocab)
  const [favKanji, setFavKanji] = useState<FavoriteKanji[]>(loadKanji)

  // Sync across components (same tab) via storage event + custom event
  useEffect(() => {
    const sync = () => {
      setFavVocab(loadVocab())
      setFavKanji(loadKanji())
    }
    window.addEventListener('storage', sync)
    window.addEventListener(EVENT_NAME, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(EVENT_NAME, sync)
    }
  }, [])

  const notify = () => window.dispatchEvent(new Event(EVENT_NAME))

  // ── vocab ──────────────────────────────────────────────────────────────────
  const isVocabFav = useCallback((id: string) =>
    loadVocab().some(v => v.id === id), [favVocab])

  const toggleVocab = useCallback((vocab: FavoriteVocab) => {
    const cur = loadVocab()
    const exists = cur.some(v => v.id === vocab.id)
    const next = exists ? cur.filter(v => v.id !== vocab.id) : [...cur, vocab]
    localStorage.setItem(VOCAB_KEY, JSON.stringify(next))
    setFavVocab(next)
    notify()
  }, [])

  const removeVocab = useCallback((id: string) => {
    const next = loadVocab().filter(v => v.id !== id)
    localStorage.setItem(VOCAB_KEY, JSON.stringify(next))
    setFavVocab(next)
    notify()
  }, [])

  // ── kanji ──────────────────────────────────────────────────────────────────
  const isKanjiFav = useCallback((id: string) =>
    loadKanji().some(k => k.id === id), [favKanji])

  const toggleKanji = useCallback((kanji: FavoriteKanji) => {
    const cur = loadKanji()
    const exists = cur.some(k => k.id === kanji.id)
    const next = exists ? cur.filter(k => k.id !== kanji.id) : [...cur, kanji]
    localStorage.setItem(KANJI_KEY, JSON.stringify(next))
    setFavKanji(next)
    notify()
  }, [])

  const removeKanji = useCallback((id: string) => {
    const next = loadKanji().filter(k => k.id !== id)
    localStorage.setItem(KANJI_KEY, JSON.stringify(next))
    setFavKanji(next)
    notify()
  }, [])

  return { favVocab, favKanji, isVocabFav, toggleVocab, removeVocab, isKanjiFav, toggleKanji, removeKanji }
}