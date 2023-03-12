import moment from 'moment';
import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageWithTime } from './MessagesContext'

/**
 * Props for Message Toast Component
 */
interface MessageToastProps extends MessageWithTime {}

/**
 * Component for displaying a message as a toast
 * @param props Message Toast Props 
 * @returns Toast
 */
export default function MessageToast({ content, sticky, delay, time }: MessageToastProps) {
  const [show, setShow] = useState(true)

  return (
    <Toast
      style={{ width: '200px' }}
      onClose={() => setShow(false)}
      show={show}
      delay={delay || 3000}
      autohide={!sticky}
    >
      <Toast.Header hidden={!sticky}>
        <small className='mr-auto'>{moment(time).fromNow()}</small>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  )
}
