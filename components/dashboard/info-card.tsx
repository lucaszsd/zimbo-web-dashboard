'use client'
import { Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CountUp from "react-countup"

type InfoCardProps = {
  title: string
  data: number,
  extraData?: string
  children?: React.ReactNode 
  status?: 'neutral' | 'positive' | 'negative' | 'default'
}

export default function ({title, data, extraData, children }: InfoCardProps ) {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {children ? children : <Users className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-baseline gap-2">
          <p className="text-2xl font-bold">
            <CountUp end={data} start={0}/> 
          </p>
          {extraData && <span className="text-md text-muted-foreground">{extraData}</span>}
        </div>
        <p className="text-xs text-muted-foreground">+180.1% from last month </p>
      </CardContent>
    </Card>
  )
}
