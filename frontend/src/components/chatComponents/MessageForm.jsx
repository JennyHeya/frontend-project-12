import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import EmojiPicker from 'emoji-picker-react'

import { useAuth, useUiContext } from '../../hooks'
import { useSendMessageMutation } from '../../slices/messagesSlice'

import Smile from '../svg/Smile'
import Arrow from '../svg/Arrow'

const MessageForm = ({ activeChannelId }) => {
  const { t } = useTranslation()
  const auth = useAuth()
  const inputRef = useUiContext()
  const messageRef = useRef(null)

  const [sendMessage] = useSendMessageMutation()

  const { show } = useSelector(state => state.modal)

  useEffect(() => {
    inputRef.saveInputRef(messageRef.current)
  }, [inputRef])

  useEffect(() => {
    if (!show) {
      inputRef.setFocus()
    }
  }, [show, inputRef])

  const [message, setMessage] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const onEmojiClick = (event) => {
    setMessage(`${message}${event.emoji}`)
    setShowPicker(false)
  }

  const handlePicker = () => setShowPicker(!showPicker)

  const closeEmojiBox = (event) => {
    if (event.key === 'Escape') {
      handlePicker()
    }
  }
  useEffect(() => {
    if (!showPicker) {
      messageRef.current.focus() // TODO
    }
  }, [showPicker])

  useEffect(() => {
    if (!showPicker) return undefined
    document.addEventListener('keydown', closeEmojiBox)

    return () => document.removeEventListener('keydown', closeEmojiBox)
  }) // TODO

  const handleMessage = event => setMessage(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!message.trim()) return
    const filteredMessage = filter.clean(message)
    const { username } = auth.getUser()
    sendMessage({
      body: filteredMessage,
      channelId: activeChannelId,
      username,
    })

    setMessage('')
  }

  return (
    <div className="mt-auto px-5 py-3">
      {showPicker && (
        <EmojiPicker onEmojiClick={onEmojiClick} emojiContainerClassName="emoji-box" />
      )}
      <Form noValidate className="p-1 border rounded-2" onSubmit={handleSubmit}>
        <InputGroup>
          <Smile
            handlePicker={handlePicker}
            classNames="message-svg position-absolute top-50 translate-middle"
          />
          <Form.Control
            name="body"
            aria-label={t('chatPage.newMessage')}
            placeholder={t('chatPage.placeholder')}
            className="border-0 p-0 ps-5"
            onChange={handleMessage}
            value={message}
            ref={messageRef}
          />
          <Button variant="" type="submit" className="btn-group-vertical" disabled="">
            <Arrow />
            <span className="visually-hidden">{t('chatPage.submit')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageForm
