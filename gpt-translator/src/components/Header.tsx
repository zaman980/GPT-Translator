import { ChevronDown, ArrowRight } from 'lucide-react'

export function Header() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex flex-col">
      {/* Navbar - Clean, professional, fully responsive */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Modern logo - subtle gradient, professional feel */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              GT
            </div>
            <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl blur-xl opacity-30 -z-10"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GPT Translator
          </span>
        </div>

        {/* Desktop Menu - Clean hover effects */}
        <div className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
          <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
            Our Products <ChevronDown className="w-4 h-4" />
          </button>
          <span className="hover:text-indigo-600 transition-colors">Developer API</span>
          <span className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">NEW</span>
            <span className="hover:text-indigo-600 transition-colors">API Keys</span>
          </span>
          <span className="hover:text-indigo-600 transition-colors">Translation History</span>
          <span className="hover:text-indigo-600 transition-colors">Chrome Extension</span>
          <span className="hover:text-indigo-600 transition-colors">Affiliate Program</span>
          <span className="hover:text-indigo-600 transition-colors">Pricing</span>
        </div>

        {/* Login Button - Premium feel */}
        <button className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            Login
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </nav>

      {/* Hero Section - No images, pure typography & spacing focus */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Pure visual hierarchy with subtle decorative elements */}
        <div className="order-2 lg:order-1 space-y-8">
          {/* Decorative abstract elements instead of photos */}
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-3xl blur-3xl opacity-40 absolute -top-20 -left-20"></div>
            <div className="w-48 h-48 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-3xl blur-3xl opacity-30 absolute bottom-0 right-0"></div>
          </div>

          {/* Stats badges - Clean cards instead of floating on images */}
          <div className="flex flex-wrap gap-6">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">91.2k+</div>
              <div className="text-sm opacity-90">Total Subscriptions</div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold">200k+</div>
              <div className="text-sm opacity-90">Active Users</div>
            </div>
          </div>
        </div>

        {/* Right: Text content - Maximum readability & professionalism */}
        <div className="order-1 lg:order-2 text-center lg:text-left space-y-8">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              GPT Translator
            </span>
            <br />
            <span className="text-gray-800">AI-Powered Translation</span>
            <br />
            <span className="text-gray-700">for Text, Docs & Websites</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Break language barriers with cutting-edge AI. Translate text, documents, websites, emails, and conversations instantly across 95+ languages with human-like accuracy and context awareness.
          </p>

          <div className="space-y-6">
            <p className="text-lg text-gray-600 font-medium">
              Ready to experience seamless translation?
            </p>
            <button className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Translate Now</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}