// eslint-disable-next-line check-file/filename-naming-convention
import './pixiImport'
import './sentryinit'
import './gsapImport'
import './assets/styles/_normalize.css'
import './assets/styles/_var.scss'
import './assets/styles/_scroll.scss'

import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { version } from '../package.json'
import store from './state/store'
import { defaultQueryString } from '@apis-games-front/use-assets'
console.log(`version 📟:${version}`)
defaultQueryString.set(`v=${version}`);

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = lazy(() => import('./App'))
const root = ReactDOM.createRoot(document.body.appendChild(document.createElement('div')) as HTMLElement)
root.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
)
