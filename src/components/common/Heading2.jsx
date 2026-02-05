import React from 'react'

export default function Heading2({ children ,className  }) {
  return (
    <h2 className={`text-2xl md:text-4xl lg:text-[46px] font-semibold tracking-normal text-gray-900 ${className}`}>
      {children}
    </h2>
  )
}
