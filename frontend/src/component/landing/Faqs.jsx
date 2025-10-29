import React,{useState} from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../../utils/data'


const FaqItem=({faq,isOpen,onClick})=>(
    <div className='border border-gray-600 rounded-xl overflow-hidden '>
        <button onClick={onClick} className='w-full flex items-center jsutify-between p-6 bg-black hover:bg-gary-50 cursor-pointer transition-colors duration-200'>
            <span className='text-lg font-medium text-white pr-4 text-left'>
                {faq.question}
            </span>
            <ChevronDown className={`w-6 h-6 text-white transition-transform duration-300 ${isOpen? 'transform rotate-180':""}`} />
        </button>
        {isOpen &&(
            <div className='px-6 pt-6 bg-black  pb-6 text-white leading-relaxed border-t border-gray-600'>
            {faq.answer}
            </div>
        )}
    </div>
);

function Faqs() {
    const [openIndex,setOpenIndex]=useState(null);
    const handleClick=(index)=>{
        setOpenIndex(openIndex===index?null:index);
    };
    return (
    <section  id='faq' className='py-20 lg:py-20 bg-[#100f0f]'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
                <h2 className='text-3xl sm:text-4xl font-extrabold text-blue-800 mb-4'>
                    Frequetly Asked Questions
                </h2>
                <p className='text-xl text-white  max-w-3xl mx-auto'>
                    Everything you need to know about the product and billing
                </p>
            </div>
            <div className='space-y-4'>
                {FAQS.map((faq,index)=>(
                    <FaqItem
                    key={index}
                    faq={faq}
                    isOpen={openIndex===index}
                    onClick={()=>handleClick(index)}
                    />
                ))}
            </div>
        </div>
    </section>
    )
}

export default Faqs
