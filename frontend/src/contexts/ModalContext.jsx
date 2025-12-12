import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState({ type: null, item: null })

  const showModal = (type, item = null) => setModalInfo({ type, item })
  const hideModal = () => setModalInfo({ type: null, item: null })

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalInfo }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
