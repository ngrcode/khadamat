import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { QueryClient } from '@tanstack/query-core'
import { axiosInstance } from './axiosInterceptors'

// Initialize QueryClient
export const getQueryClient = new QueryClient()

interface AxiosGetParams {
  url: string
  params?: any
}


interface AxiosPostParams {
  url: string
  body: Record<string, unknown>
  isAdmin?: boolean
  headers?: AxiosRequestConfig['headers']
}

// Interface for DELETE parameters
interface AxiosDeleteParams {
  url: string
  isAdmin?: boolean
}

export const axiosGet = async ({
  url,
  params,
}: AxiosGetParams): Promise<AxiosResponse<unknown>> => {
  debugger
  const { data } = await axiosInstance.get(url, { params })

  return data
}
export const axiosPost = async ({
  url,
  body,
  headers,
  // isAdmin = true,
}: AxiosPostParams): Promise<AxiosResponse<unknown>> => {
  const res = await axiosInstance?.post(url, body, { headers },
  )
  return res?.data
}

// Define the axiosDelete function
export const axiosDelete = async ({
  url,
  isAdmin = false,
}: AxiosDeleteParams): Promise<AxiosResponse<unknown>> => {

  const fullUrl = isAdmin ? `admin${url}` : url
  const res = await axiosInstance?.delete(fullUrl)
  return res?.data
}


export const axiosPut = async ({
  url,
  params,
}: any): Promise<AxiosResponse<unknown>> => {
  const queryString = Object.keys(params)
    .map((key) => {
      if (typeof params[key] === 'object') {
        return Object.entries(params[key])
          .map(([curKey, curValue]) => {
            return `${key}[${curKey}]=${encodeURIComponent(curValue as string)}`
          })
          .join('&')
      }
      return `${key}=${encodeURIComponent(params[key] as string)}`
    })
    .join('&')
  const res = await axiosInstance.put(
    `${url}?${queryString}`,
  )
  return res?.data
}

export const axiosPutBodyQuery = async ({
  url,
  body,
}: {
  url: string
  body: Record<string, any>
}): Promise<AxiosResponse<unknown>> => {

  const query = Object.entries(body)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // encodeURIComponent to handle special characters
    .join('&')

  const res = await axiosInstance?.put(`${url}?${query}`)
  return res
}
export const axiosPutBody = async ({
  url,
  body,
}: {
  url: string
  body: Record<string, any>
}): Promise<AxiosResponse<unknown>> => {

  const res = await axiosInstance?.put(`${url}`, body)
  return res
}
