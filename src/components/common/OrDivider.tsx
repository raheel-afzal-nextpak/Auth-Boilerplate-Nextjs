interface OrDividerProps {
    text: string;
}

export default function OrDivider({ text }: OrDividerProps) {
    return (
        <div className='flex flex-col space-y-1.5'>
            <div className='flex items-center justify-center gap-3 mb-4'>
                <div className='flex-grow border-b border-gray-300'></div>{' '}
                <span className='text-gray-500'>{text}</span>{' '}
                <div className='flex-grow border-b border-gray-300'></div>{' '}
            </div>
        </div>
    );
}
