import { dashboard_constant } from '@/app/dashboard/constants'
import { Check } from 'lucide-react'

const ThanksMessage = () => {
    const { thanks_message } = dashboard_constant
    return (
        <div className='flex items-center justify-center '>
            <div className='py-10 px-16 max-w-sm rounded-lg shadow-lg bg-white text-center bg-gradient-to-r from-cyan-500 to-blue-500'>
                <Check
                    size={100}
                    className='mx-auto text-white'
                />
                <h1 className='text-4xl font-semibold text-white'>
                    {thanks_message.title}
                </h1>
                <p className='mt-7 text-2xl text-white'>
                    {thanks_message.desc}
                </p>
            </div>
        </div>
    )
}

export default ThanksMessage
