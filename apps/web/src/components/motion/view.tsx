'use client'

import React from 'react'
import ReactPlayer from 'react-player'
import { useFixBaseUrl } from '@/hook/useFixBaseUrl/useConcatUrl'
import { t } from '@/configs/language'
import { cn } from '@/lib/talwindeMergeCn'

const Motion = ({ data }) => {
  const PreviewURL = useFixBaseUrl(data?.PreviewFileURL)
  const FileURL = useFixBaseUrl(data?.FileURL)

  return (
    <>
      {PreviewURL && FileURL &&  data ? (
        <div className={cn("motion-container bg-black  rounded-3xl w-full overflow-hidden flex justify-center items-center ")}>
          <ReactPlayer
            width="100%"
            light={PreviewURL}
            controls={true}
            url={FileURL}
            loop={true}
            playing
          />
        </div>
      ) : (
        <div className={cn("w-full flex justify-center items-center h-full bg-black rounded-xl")}>
          <h1 className={cn("text-white text-3xl ")}>{t('noContent')}</h1>
        </div>
      )}
    </>
  )
}

export default Motion
