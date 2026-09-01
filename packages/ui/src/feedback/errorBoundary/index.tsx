// components/ErrorBoundary.js
import { showError } from '../toast'
import React, { Component, ReactNode } from 'react'
import { t } from '@repo/i18n'
import { ClubAlert } from '../../alert/clubAlert'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ClubErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props) {

        super(props)

        this.state = { hasError: false }

    }


    static getDerivedStateFromError(error) {

        showError(t('erroer'));

        return { hasError: true }

    }


    // componentDidCatch(error, errorInfo) {

     

    //     showError(t('erroer'));


    // }


    render() {

        if (this.state.hasError as boolean) {

            // You can render any custom fallback UI

            return <ClubAlert message='خطایی رخ داده است' type='error' style={{ width: '100%', textAlign: 'center' }} closAble showIcon />

        }


        return this.props.children

    }

}


export default ClubErrorBoundary