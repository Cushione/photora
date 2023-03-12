import moment from 'moment';
import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageWithTime } from './MessagesContext'

/**
 * Component for displaying a message as a toast
 * @param props Message With Time 
 * @returns Toast
 */
export default function MessageToast({ content, sticky, delay, time, error }: MessageWithTime) {
  const [show, setShow] = useState(true)

  return (
    <Toast
      style={{ width: '200px' }}
      onClose={() => setShow(false)}
      show={show}
      delay={delay || 3000}
      autohide={!sticky}
      className={error ? 'bg-danger text-white': ''}
    >
      <Toast.Header hidden={!sticky}>
        <small className='mr-auto'>{moment(time).fromNow()}</small>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  )
}
