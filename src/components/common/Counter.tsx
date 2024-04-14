import { count } from "console"
import { ReactNode } from "react"
import { Control, Form, useWatch } from "react-hook-form"

type CounterProps = {
  name: string
  control: any
  children: (count: number ) => ReactNode
}

export const Counter = ({name, control, children}: CounterProps) => {
  const value = useWatch({name, control})

  const count = 3

  // console.log(value)

  return <>{children(count)}</>
}