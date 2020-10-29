import React from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

interface TileProps {
  date: Date
  view: string
}

const Hello = () => {
  const getTileContent = ({ date, view }: TileProps) => {
    if (view !== 'month') {
      return null
    }

    if (dayjs(date).isSame(dayjs(), 'day')) {
      return <p>テスト</p>
    }

    return null
  }

  return (
    <div>
      <h1>Hello</h1>
      <Calendar locale="ja-JP" tileContent={getTileContent} />
    </div>
  )
}

export default Hello
