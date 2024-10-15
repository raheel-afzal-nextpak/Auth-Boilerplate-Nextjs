import { useEffect, useState } from 'react'

export const useEmailCooldown = (cooldownPeriod: number = 60000) => {
    const [countdown, setCountdown] = useState<number>(0)

    useEffect(() => {
        const storedTime = localStorage.getItem('lastSentTime')
        if (storedTime) {
            const now = new Date()
            const lastSentTime = new Date(storedTime)
            const timeElapsed = now.getTime() - lastSentTime.getTime()
            if (timeElapsed < cooldownPeriod) {
                setCountdown(Math.ceil((cooldownPeriod - timeElapsed) / 1000))
            }
        }
    }, [cooldownPeriod])

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined
        if (countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [countdown])

    const resetCooldown = () => {
        const now = new Date()
        localStorage.setItem('lastSentTime', now.toISOString())
        setCountdown(cooldownPeriod / 1000)
    }

    return { countdown, resetCooldown }
}
