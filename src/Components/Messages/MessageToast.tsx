import moment from 'moment';
import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageWithTime } from './MessagesContext'

interface MessageProps extends MessageWithTime {}

export default function MessageToast({ content, sticky, delay, time }: MessageProps) {
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
