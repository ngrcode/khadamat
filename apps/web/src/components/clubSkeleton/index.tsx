import { Skeleton } from 'antd'
import React, { Suspense } from 'react'
import ErrorBoundary from '../errorBoundary'

export const ClubSkeleton: React.FC<{ children: React.JSX.Element }> =
    ({ children }: { children: React.JSX.Element }) =>
        <ErrorBoundary> <Suspense fallback={<Skeleton />} >{children}</Suspense></ErrorBoundary>