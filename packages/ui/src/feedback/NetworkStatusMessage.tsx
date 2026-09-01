'use client'

import { useEffect, useState } from 'react'
import { t } from '@repo/i18n'

const NetworkStatusMessage = () => {
        const [isOnline, setIsOnline] = useState(true)

        useEffect(() => {
                const updateStatus = () => setIsOnline(navigator.onLine)

                updateStatus()
                window.addEventListener('online', updateStatus)
                window.addEventListener('offline', updateStatus)

                return () => {
                        window.removeEventListener('online', updateStatus)
                        window.removeEventListener('offline', updateStatus)
                }
        }, [])

        return (
                <>
                        {!isOnline && (
                                <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
                                        {t('offlineMessage')}
                                </div>
                        )}
                </>
        )
}

export default NetworkStatusMessage
