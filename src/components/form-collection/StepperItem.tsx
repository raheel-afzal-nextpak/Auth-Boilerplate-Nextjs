'use client'
import { formSteps } from '@/app/dashboard/constants'
import { cn } from '@/lib/utils'
import { Check, LucideIcon } from 'lucide-react'
import { FC } from 'react'

interface StepperItemProps {
    step: number
    onSelect: () => void
    selectedIndex: number
    isCompleted: boolean
    Icon: LucideIcon
    children: React.ReactNode
}
export const StepperItem: FC<StepperItemProps> = ({
    step,
    onSelect,
    selectedIndex,
    isCompleted,
    Icon,
    children,
}) => {
    return (
        <div>
            <div
                className={`flex items-center cursor-pointer px-2`}
                onClick={onSelect}
                role='button'
            >
                <div
                    className={cn(
                        `flex justify-center items-center font-semibold transition-all duration-300 bg-gray-400 h-8 w-8 rounded-full text-gray-800 mr-2`,
                        {
                            'bg-green-500 text-white': isCompleted,
                            'bg-blue-500 text-white  hover:bg-blue-600':
                                step === selectedIndex && !isCompleted,
                            'h-10 w-10 ': step === selectedIndex,
                        },
                    )}
                >
                    <div>
                        {isCompleted ? (
                            <Check size={18} />
                        ) : (
                            <Icon
                                size={step === selectedIndex ? 24 : 18}
                                className=''
                            />
                        )}
                    </div>
                </div>

                <div
                    className={cn('font-semibold mr-2 rounded px-2 py-1', {
                        'bg-blue-100 text-blue-500 border border-blue-300 ':
                            step === selectedIndex,
                        'bg-green-100 text-green-500 border border-green-300':
                            isCompleted,
                        'border-2 border-blue-300':
                            step === selectedIndex && isCompleted,
                    })}
                >
                    {children}
                </div>
            </div>
            {step !== formSteps.length - 1 && (
                <div
                    className={cn(
                        'hidden lg:block  w-0.5 ml-6 -mt-2 h-10 bg-gray-400',
                        {
                            'bg-blue-500 text-white': step === selectedIndex,
                            'bg-green-500 text-white': isCompleted,
                        },
                    )}
                ></div>
            )}
        </div>
    )
}
