import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { setChannels } from '../../slices/channelsSlice.js';
import { setMessages, addMessage } from '../../slices/messagesSlice.js';
import { initSocket, getSocket } from '../../services/socket.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { getToken, user } = useAuth();
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  const { channels, currentChannelId } = useSelector((state) => state.channels));
  const messages = useSelector((state => state.messages.messages));

  const currentChannel = channels.find(ch => ch.id === currentChannelId) || { name: 'general' };
  const channelMessages = messages.filter(m => m.channelId === currentChannelId);

  // Загрузка начальных данных
  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const response = await axios.get('/api/v1/data', {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setChannels({
          channels: response.data.channels,
          currentChannelId: response.data.currentChannelId,
        }));
        dispatch(setMessages(response.data.messages));
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    };

    fetchData();
    initSocket(); // ← подключаем WebSocket
  }, [dispatch, getToken]);

  // Подписка на новые сообщения
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  // Отправка сообщения
  const handleSubmit = async (values, { resetForm }) => {
    if (!values.body.trim()) return;

    const message = {
      body: values.body,
      channelId: currentChannelId,
      username: user.username,
    };

    setSending(true);

    const socket = getSocket();

    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('timeout')), 5000);

        socket.emit('newMessage', message, (response) => {
          clearTimeout(timeout);
          if (response.status === 'ok') {
            resolve();
          } else {
            reject(new Error('server error'));
          }
        });
      });

      resetForm();
    } catch (err) {
      console.error('Не удалось отправить:', err);
      // Можно показать тост или красную надпись
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white">
              {/* Каналы */}
              <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                  <span>Каналы</span>
                </div>
                <ul className="nav flex-column nav-pills nav-fill px-2">
                  {channels.map((channel) => (
                    <li key={channel.id} className="nav-item w-100">
                      <button
                        type="button"
                        className={`w-100 rounded-0 text-start btn ${channel.id === currentChannelId ? 'btn-secondary' : ''}`}
                        onClick={() => dispatch({ type: 'channels/setCurrentChannel', payload: channel.id })}
                      >
                        <span className="me-1">#</span>{channel.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Чат */}
              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># {currentChannel.name}</b></p>
                    <span className="text-muted">{channelMessages.length} сообщений</span>
                  </div>

                  <div id="messages-box" className="chat-messages overflow-auto px-5">
                    {channelMessages.map((msg) => (
                      <div key={msg.id} className="text-break mb-2">
                        <b>{msg.username}</b>: {msg.body}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto px-5 py-3">
                    <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
                      {() => (
                        <Form noValidate className="py-1 border rounded-2">
                          <div className="input-group">
                            <Field
                              innerRef={inputRef}
                              name="body"
                              aria-label="Новое сообщение"
                              placeholder="Введите сообщение..."
                              className="border-0 p-0 ps-2 form-control"
                              disabled={sending}
                            />
                            <button
                              type="submit"
                              disabled={sending}
                              className="btn btn-group-vertical border-0"
                            >
                              {sending ? '...' : '→'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage
