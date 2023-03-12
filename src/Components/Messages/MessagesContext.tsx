import React from 'react'
import { create } from 'zustand'
import MessageToast from './MessageToast'

/**
 * Structure of a message
 */
interface Message {
  content: string
  sticky?: boolean
  delay?: number
}

/**
 * Structure of a message extended with a time property
 */
export interface MessageWithTime extends Message {
  time: number
}

/**
 * Structure of the message store
 */
interface MessageStore {
  messages: MessageWithTime[]
  showMessage: (message: Message) => void
}

/**
 * Message State Store
 */
const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  showMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, time: Date.now() }],
    })),
}))

/**
 * Helper Hook for adding messages from inside of components
 * @returns Message setter
 */
export const useShowMessage = (): (message: Message) => void => {
  return useMessageStore((state) => state.showMessage)
}

/**
 * Helper function for adding messages from outside of components
 * @param message Message to add
 */
export const showMessage = (message: Message): void => {
  useMessageStore.setState({
    messages: [
      ...useMessageStore.getState().messages,
      { ...message, time: Date.now() },
    ],
  })
}

/**
 * Message Output Component for displaying messages 
 * @returns Message Output
 */
export function MessageOutput() {
  // Get messages from the message store 
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
