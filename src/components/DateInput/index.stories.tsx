import * as React from 'react'
import { DateInput } from '../../index.js'

const meta = {
  title: 'Inputs/DateInput',
}
export default meta

export const SingleDate = () => {
  return (
    <DateInput
      label="Single date"
      description="Select a date"
      onChange={(value) => {}}
    />
  )
}

export const SingleDateAndTime = () => {
  return (
    <DateInput
      time
      label="Single date and time"
      onChange={(value) => {}}
      defaultValue={new Date('1999/11/03 08:00').getTime()}
    />
  )
}

export const Min = () => {
  const [foo, setFoo] = React.useState<any>()

  return (
    <>
      <DateInput label="Date one" onChange={setFoo} />
      <DateInput label="Date two (min: date one)" min={foo} />
    </>
  )
}

export const Max = () => {
  const [foo, setFoo] = React.useState<any>()

  return (
    <>
      <DateInput label="Date one" onChange={setFoo} />
      <DateInput label="Date two (max: date one)" max={foo} />
    </>
  )
}

export const MinTime = () => {
  const [foo, setFoo] = React.useState<any>()

  return (
    <>
      <DateInput time label="Date one" onChange={setFoo} />
      <DateInput time label="Date two (min: date one)" min={foo} />
    </>
  )
}

export const MaxTime = () => {
  const [foo, setFoo] = React.useState<any>()

  return (
    <>
      <DateInput time label="Date one" onChange={setFoo} />
      <DateInput time label="Date two (max: date one)" max={foo} />
    </>
  )
}

export const DateRange = () => {
  return <DateInput range label="Range" onChange={(value) => {}} />
}

export const DateRangeAndTime = () => {
  return (
    <DateInput range time label="Range and time" onChange={(value) => {}} />
  )
}

export const Error = () => {
  return <DateInput error onChange={(value) => {}} />
}

export const Small = () => {
  return <DateInput variant="small" onChange={(value) => {}} />
}
