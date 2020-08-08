import { connectRouter } from 'connected-react-router'
import { ActionCreatorsMapObject, combineReducers } from 'redux'
import selectors from './selector'
import history from './store/history'
import { MessageProps } from 'semantic-ui-react'

// Action
export const actions = {}

// Reducer
const rootReducer = combineReducers({
  router: connectRouter(history),
})

export { selectors }

export type RootState = ReturnType<typeof rootReducer>

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>

export interface ErrorProps {
  code: string
  message: string
  trace?: string
}

export type MessageLevel = 'error' | 'warning' | 'info' | 'success' | undefined

export interface MessageState {
  level: MessageLevel
  message: string
  code?: string
}

export const convertErrorPropsToMessageState = (error: ErrorProps): MessageProps => ({
  level: 'error' as MessageLevel,
  message: error.message,
  code: error.code,
})

export default rootReducer
