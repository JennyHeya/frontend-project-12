import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Messages = ({ messages, activeChannelId, channels }) => {
  const { t } = useTranslation()
  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.lastChild?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const renderMessages = (id) => {
    const currentMessages = messages.filter(message => message.channelId === id)
    const channel = channels.find(item => item.id === id)
    if (!channel) return null

    return (
      <>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chatPage.messages', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " ref={messagesRef}>
          {currentMessages.map(message => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :
              {message.body}
            </div>
          ))}
        </div>
      </>
    )
  }

  return renderMessages(activeChannelId)
}

export default Messages
