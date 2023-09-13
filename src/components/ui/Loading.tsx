import React from 'react'

type Props = {}

function Loading({}: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60px] h-[60px] rounded-full border-[7px] border-solid border-cartNumBg border-l-transparent animate-spin"></div>
    </div>
  )
}

export default Loading