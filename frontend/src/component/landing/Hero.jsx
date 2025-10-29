import { Link } from "react-router-dom"
import HERO_IMG from '../../assets/hero-img.png'
import { useAuth } from "../../context/AuthContext";
function Hero() {
    const {isAuthenticated} =useAuth();

    return (
      <section className="relative bg-[#100f0f] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]">
            
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                        AI_Powered <span className="text-red-600">ChatBot</span>
                    </h1>
                    <p className="text-base sm:text-xl text-white mb-8 leading-relaxed max-w-3xl mx-auto">
                        Let our AI create invoices from the simple text ,generate payment reminders,and provide smart insights to help you manage your finances better.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {isAuthenticated ? (
                            <Link to="/generate" className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-900 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform">
                            Start Chating
                            </Link>
                        ) : (
                            <Link to="/register" className="bg-gradient-to-r from-blue-950 to-blue-900 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-2xl transform">
                            Get Started for Free
                            </Link>
                        )}
                        <a href="#features" className="border-2 border-white text-white px-9 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-200 hover:scale-105">
                           Learn More
                        </a>
                    </div>

                </div>
                <div className="mt-12 relative max-w-5xl mx-auto flex justify-center">
                    <img src={HERO_IMG} alt="Chat app ScreenShot" className="rounded-3xl shadow-2xl shadow-gray-300 border-4 border-gray-200/20" />
            </div>
            </div>
      </section>
    )
}

export default Hero
