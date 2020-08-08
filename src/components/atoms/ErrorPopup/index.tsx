import React from 'react'
import { Popup, PopupProps } from 'semantic-ui-react'

import { errorPopup } from './style.css'

interface ErrorPopupProps {
  children: JSX.Element
  on?: PopupProps['on']
  isOpen?: boolean
  position?: PopupProps['position']
  message?: string
}

const ErrorPopup = (props: ErrorPopupProps) => {
  const { children, on = 'focus', isOpen, position = 'top right', message } = props

  return (
    <Popup
      className={`${errorPopup} errorPopup`}
      hideOnScroll={true}
      trigger={children}
      open={isOpen}
      on={on}
      position={position}
    >
      <Popup.Content>{message}</Popup.Content>
    </Popup>
  )
}

export default ErrorPopup
