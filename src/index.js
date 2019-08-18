import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import Cookies from 'js-cookie'

import './css/styles.css'

const playerId = Cookies.get('playerId') || ''

ReactDOM.render(<App playerId={ playerId } />, document.getElementById('root'))
