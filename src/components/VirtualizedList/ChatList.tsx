import { useState, useEffect, useRef } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import ChatRow from './ChatRow'
import { MessageItem } from '@/types/openai'


type Props = {
  message: MessageItem[]
  handleStopResponse: () => void
  handleRetry: () => void
}

const ChatList = ({ message, handleStopResponse, handleRetry }: Props) => {
  const listRef = useRef<VariableSizeList<MessageItem>>(null)
  const [rowHeights, setRowHeights] = useState<{ [key: number]: number }>({})

 
  const setRowHeight = (index: number, size: number) => {
    console.log('setRowHeight', rowHeights, index, size, listRef.current)

    if (rowHeights[index] !== size) {
      console.log('setRowHeight', index, size)
      setRowHeights((prevRowHeights) => ({
        ...prevRowHeights,
        [index]: size,
      }))
    }
    if (listRef.current) {
      listRef.current.resetAfterIndex(index)
    }
  }

  const getRowHeight = (index: number) => {
    console.log('getRowHeight', index, rowHeights[index])
    return index in rowHeights ? rowHeights[index] + 8 : 80
  }

  useEffect(() => {
    if (message.length > 0) {
      listRef.current?.scrollToItem(message.length - 1, 'end')
    }
  }, [message])

  return (
    <AutoSizer style={{ width: '100%', height: '100%' }}>
      {({ height, width }) => (
        <VariableSizeList
          itemCount={message.length}
          itemSize={getRowHeight}
          height={height as number}
          width={width as number}
          overscanCount={5}
          ref={listRef}
        >
          {({ index, style }) => (
            <ChatRow
              index={index}
              style={style}
              message={message[index]}
              setRowHeight={setRowHeight}
              handleStopResponse={handleStopResponse}
              handleRetry={handleRetry}
            />
          )}
        </VariableSizeList>
      )}
    </AutoSizer>
  )
}

export default ChatList
