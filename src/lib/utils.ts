import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// tailwind merger
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// FallBack Url Helper
export const constructFallBackUrl = (searchParams: URLSearchParams): string => {
    if (!searchParams) {
        throw new Error('searchParams cannot be null or undefined')
    }

    const [firstKey, firstValue] = searchParams.entries().next().value ?? []
    const remainingParams = new URLSearchParams(searchParams)

    if (firstKey === undefined || firstValue === undefined) {
        return ''
    }

    remainingParams.delete(firstKey)

    const queryParams = remainingParams.toString()
        ? `?${remainingParams.toString()}`
        : ''

    return `${firstValue}${queryParams}`
}
