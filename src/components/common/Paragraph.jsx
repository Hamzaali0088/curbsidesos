import React from 'react'

export default function Paragraph({ children ,className}) {
  return (
    <p className={`text-sm md:text-base text-[#4D6C7D] leading-tight font-light ${className}`} style={{ fontFamily: 'var(--font-light-stack)' }}>
      {children}
    </p>
  )
}
