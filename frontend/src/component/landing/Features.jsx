import { ArrowRight } from "lucide-react"
import { FEATURES } from "../../utils/data"

function Features() {
    return (
       <section id="features" className="py-20 lg:py-28 bg-[#100f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4"> Powerful Features to  Run Your Thoughts</h2>
                <p className="text-xl text-white max-w-3xl mx-auto"> Everything you need to manage your questions</p>

            </div>
            <div className="grid grid-col md:grid-cols-2 lg:grid-cols-4 gap-8">
                {FEATURES.map((features, index) => (
                    <div key={index} className="bg-black rounded-2xl p-8 shadow-sm shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-900 ">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                            <features.icon className="w-8 h-8 text-blue-900" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{features.title}</h3>
                        <p className="text-white leading-relaxed">{features.description}</p>
                        <a href="#" className="inline-flexitems-center text-blue-800 font-medium mt-4 hover:text-blue-700 transition-colors duration-300">
                            Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
       </section>
    )
}

export default Features
