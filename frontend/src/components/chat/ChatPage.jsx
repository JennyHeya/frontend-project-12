const ChatPage = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>

        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            {/* Каналы */}
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-3">
                <span>Каналы</span>
              </div>
              <ul className="nav flex-column nav-pills nav-fill px-2 pb-3">
                <li className="nav-item w-100">
                  <button type="button" className="w-100 rounded-0 text-start btn">
                    <span className="me-1">#</span>general
                  </button>
                </li>
                <li className="nav-item w-100">
                  <button type="button" className="w-100 rounded-0 text-start btn">
                    <span className="me-1">#</span>random
                  </button>
                </li>
              </ul>
            </div>

            {/* Сообщения */}
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0"><b># general</b></p>
                  <span className="text-muted">0 сообщений</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5" />
                <div className="mt-auto px-5 py-3">
                  <form noValidate className="py-1 border rounded-2">
                    <div className="input-group">
                      <input
                        name="body"
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2 form-control"
                        value=""
                        readOnly
                      />
                      <button type="submit" disabled className="btn btn-group-vertical border-0">
                        →
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ChatPage
