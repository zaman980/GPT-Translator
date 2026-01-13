// src/components/TranslatorTool.tsx
// This is a simplified, junior-friendly version (6-12 months experience)
// - Uses only basic React (useState, useEffect)
// - Native <select> instead of fancy libraries
// - Manual translate button (no auto-translate)
// - Basic voice input (optional, with fallback message)
// - Clear comments and simple structure
// - Exact design match to your screenshot (pills, layout, colors)

import { useState } from 'react'
import { Mic, ArrowRightLeft } from 'lucide-react'
import { OpenAI } from 'openai'  // ← Add this import



const apiKey = "sk-...ckEA"

// Safety check (shows error in console if key missing)
if (!apiKey) {
  console.error('⚠️ OpenAI API key not found! Make sure .env file has VITE_OPENAI_API_KEY=sk-... and you restarted the server.')
}

// Create OpenAI client
const openai = new OpenAI({
 baseURL: '/openai',
  apiKey: apiKey, // ← Uses your .env key
  dangerouslyAllowBrowser: true, // Remove this for production (use backend)
})

// Simple language list (add more if needed)
const languages = [
  { code: 'auto', name: 'Detect Language' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
]

export function TranslatorTool() {
  // Basic state for the translator
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [fromLang, setFromLang] = useState('auto')
  const [toLang, setToLang] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)

  // Simple speech recognition (browser API - works in Chrome/Edge)
  const startListening = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support voice input.')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = fromLang === 'auto' ? 'en-US' : fromLang // Simple fallback
    recognition.interimResults = true

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('')
      setInputText(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.start()
    setIsListening(true)
  }

  // Swap languages button
  const swapLanguages = () => {
    const tempLang = fromLang
    const tempText = inputText
    setFromLang(toLang === 'auto' ? 'en' : toLang)
    setToLang(tempLang)
    setInputText(outputText)
    setOutputText(tempText)
  }

  // Copy output text
  const copyText = () => {
    navigator.clipboard.writeText(outputText)
    alert('Copied!')
  }

  // Translate button - placeholder (you'll connect OpenAI later)
const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text!')
      return
    }

    setIsLoading(true)
    setOutputText('') // Clear previous result

    try {
      // Build smart prompt
      const fromName = fromLang === 'auto' ? '' : languages.find(l => l.code === fromLang)?.name + ' '
      const toName = languages.find(l => l.code === toLang)?.name

      const prompt = fromLang === 'auto'
        ? `Detect the language and translate this text naturally to ${toName}: "${inputText}"`
        : `Translate this text from ${fromName}to ${toName} naturally and accurately: "${inputText}"`

      // Call OpenAI
     const response = await fetch('/openai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt + '\n\nOnly reply with the translated text, no explanations.' }],
          temperature: 0.3,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      const result = data.choices[0]?.message?.content?.trim() || 'No translation.'
      setOutputText(result)
    } catch (error) {
      console.error('Translation error:', error)
      setOutputText('Translation failed. Check console.')
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Supported Formats Pills - Exact match */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['Text Translate', 'Docx', 'XLSX', 'PDF', 'PPTX', 'Subtitle File', 'XML', 'JSON', 'YAML', 'CSV', 'Txt File', 'HTML'].map((item, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                item === 'Text Translate'
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['Web-Page', 'Markdown', 'Email', 'Audio/Video', 'Handwritten Text'].map((item, index) => (
            <button
              key={index}
              className="px-6 py-3 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Advanced Options Row - Simplified (just model selector) */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="font-medium">GPT-4.1 mini</span>
          </div>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium">
            Select Domain
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium">
            Select Tone
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium">
            Writing Styles
          </button>
          <button className="px-6 py-3 bg-gray-200 rounded-lg font-medium">
            Custom Prompt
          </button>
        </div>

        {/* Main Translator Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Language Selectors */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="w-full md:w-auto px-8 py-4 border-2 border-gray-300 rounded-2xl text-lg font-medium focus:border-purple-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              onClick={swapLanguages}
              className="p-4 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <ArrowRightLeft className="w-8 h-8 text-purple-700" />
            </button>

            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="w-full md:w-auto px-8 py-4 border-2 border-gray-300 rounded-2xl text-lg font-medium focus:border-purple-500"
            >
              {languages.filter(l => l.code !== 'auto').map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Text Areas */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here"
                className="w-full h-80 p-6 border-2 border-gray-300 rounded-2xl resize-none text-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-2xl">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-700 border-t-transparent"></div>
                </div>
              )}
              <div className="w-full h-80 p-6 bg-gray-50 rounded-2xl text-lg overflow-y-auto whitespace-pre-wrap">
                {outputText || 'Translation will appear here...'}
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <button
              onClick={startListening}
              className={`flex items-center gap-4 px-8 py-4 rounded-full font-medium transition-all ${
                isListening ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mic className="w-6 h-6" />
              {isListening ? 'Listening...' : 'Tap to Speak'}
            </button>

            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="px-20 py-5 bg-purple-700 text-white text-xl font-bold rounded-full hover:bg-purple-800 disabled:opacity-50 shadow-xl"
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}