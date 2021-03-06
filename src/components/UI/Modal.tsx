import React from 'react'
import ReactDOM from 'react-dom'

import Backdrop from './Backdrop'

interface IModal {
  show: boolean
  onClose: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void
  children: React.ReactNode
}

const Modal: React.FC<IModal> = ({ show, onClose, children }) => {
  const focusModal = React.useCallback((node: HTMLDivElement) => {
    if (node) node.focus()
  }, [])

  return ReactDOM.createPortal(
    <>
      <Backdrop show={show} onClick={onClose} />
      {show && (
        <div className='modal' ref={focusModal} tabIndex={-1}>
          {children}
        </div>
      )}
    </>,
    document.getElementById('modal-root') as HTMLElement,
  )
}

export default Modal
