import React, { FC } from 'react'
import { MyReactComponent } from './components/MyReactComponent'

export const App: FC<{ id: string }> = ({ id }) => (<div><MyReactComponent id={id} /></div>)
