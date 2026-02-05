import React from 'react'

export default function Paragraph({ children ,className}) {
  return (
    <p className={`text-lg text-[#4D6C7D] leading-5.5 ${className}`}>
      {children}
    </p>
  )
}
