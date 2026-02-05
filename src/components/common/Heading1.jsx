import React from 'react'

export default function Heading1({ children ,className}) {
  return (
    <h1 className={`text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl ${className}`}>
      {children}
    </h1>
  )
}