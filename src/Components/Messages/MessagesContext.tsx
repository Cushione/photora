import React, { useEffect } from 'react'
import { create } from 'zustand'
import MessageToast from './MessageToast'

interface Message {
  content: string
  sticky?: boolean
  delay?: number
}

export interface MessageWithTime extends Message {
  time: number
}

interface MessageStore {
  messages: MessageWithTime[]
  showMessage: (message: Message) => void
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  showMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, time: Date.now() }],
    })),
}))

export const useShowMessage = () => {
  return useMessageStore((state) => state.showMessage)
}

export const showMessage = (message: Message) => {
  useMessageStore.setState({
    messages: [
      ...useMessageStore.getState().messages,
      { ...message, time: Date.now() },
    ],
  })
}

export function MessageProvider() {
  const messages = useMessageStore((state) => state.messages)

  return (
      <div
        style={{
          position: 'absolute',
          top: 15,
          right: 25,
          zIndex: 99,
        }}
      >
        {messages.map((message) => (
          <MessageToast key={message.time} {...message} />
        ))}
      </div>
  )
}
