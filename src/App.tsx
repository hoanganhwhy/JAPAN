import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import {Home, BookOpen, FileText, Headphones, Edit, Star, Menu, X} from 'lucide-react'
import HomePage from './pages/HomePage'
import AlphabetPage from './pages/AlphabetPage'
import MinnaPage from './pages/MinnaPage'
import KanjiPage from './pages/KanjiPage'
import ListeningPage from './pages/ListeningPage'
import MockTestPage from './pages/MockTestPage'
import FavoritesPage from './pages/FavoritesPage'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Trang Chủ', icon: Home },
    { path: '/alphabet', label: 'Bảng Chữ Cái', icon: BookOpen },
    { path: '/minna', label: 'Minna', icon: FileText },
    { path: '/kanji', label: 'Kanji', icon: Edit },
    { path: '/listening', label: 'Nghe', icon: Headphones },
    { path: '/mock-test', label: 'Thi Thử N5', icon: Edit },
    { path: '/favorites', label: 'Yêu Thích', icon: Star },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#FEC900] rounded-full flex items-center justify-center">
              <span className="text-2xl">🇯🇵</span>
            </div>
            <span className="text-xl font-bold text-[#765534]">N5 Japanese</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FEC900] text-[#765534]'
                      : 'text-gray-700 hover:bg-[#FEE173]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FEC900] text-[#765534]'
                      : 'text-gray-700 hover:bg-[#FEE173]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/minna" element={<MinnaPage />} />
          <Route path="/kanji" element={<KanjiPage />} />
          <Route path="/listening" element={<ListeningPage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
