import React from 'react'
import { Message } from 'semantic-ui-react'
import i18n from '../../../i18n'

interface Props {
  content: string
}

export const Alert = (props: Props) => {
  const { content } = props
  return <Message className="alert" error={true} content={content} />
}

export const NoContentMessage = () => <Message info={true} content={i18n.t('message:noContent')} />
