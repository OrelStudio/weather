import React from 'react'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.scss'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        {/* <meta name='viewport' content='initial-scale=1, viewport-fit=cover' /> */}
        <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap' rel='stylesheet' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
