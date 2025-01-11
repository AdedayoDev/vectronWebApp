"use client"

import React, { Children } from 'react'
import AuthHeader from './AuthHeader'
import BackButton from './BackButton'
interface CardWrapperProps {
    image: string
    title: string
    backButtonHref: string
    backButtonLabel: string
    label: string
    children: React.ReactNode
    smallScreenPadding?: string; 
    largeScreenPadding?: string;
}
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from '@components/ui/card'
const CardWrapper = ({image, title, backButtonHref, backButtonLabel, label, children, smallScreenPadding = "pt-32", 
  largeScreenPadding = "lg:pt-60",}: CardWrapperProps) => {
  return (
    <Card className={`${smallScreenPadding} ${largeScreenPadding} `}>
        <CardHeader>
           <AuthHeader  image={image} title={title} label={label}/>
        </CardHeader>
      
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper
