import { useMemo } from 'react'
import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

let store

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initStore = (preloadedState = {}) => {
  const middlewares = [thunkMiddleware] // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  )

  const enhancers = [middlewareEnhancer]
  const composedEnhancers: StoreEnhancer<any> = compose(...enhancers)

  const cart = JSON.parse('{}')
  const customizedProduct = JSON.parse('{}')
  const initialState = { ...preloadedState, cart, customizedProduct }

  const _store = createStore(persistedReducer, composedEnhancers)
  const persistor = persistStore(_store)

  return { store: _store, persistor }
}

export default function configureStoreCustom(preloadedState) {
  let _store = store ?? initStore(preloadedState)
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => configureStoreCustom(initialState), [initialState])
  return store
}
