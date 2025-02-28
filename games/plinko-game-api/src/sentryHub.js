import 'scheduler-polyfill'

import * as Sentry from '@sentry/browser'
// Sentry.getSpanStatusFromHttpCode()
const createTransaction = (transactionName) => {
  if (Sentry.getCurrentHub().getClient()) {
    const transaction = Sentry.startTransaction({ name: transactionName })
    Sentry.getCurrentHub().configureScope(scope => scope.setSpan(transaction))
    return transaction
  }
  return null
}
const createSpan = (transaction, { op = 'fetch', description }) => {
  if (Sentry.getCurrentHub().getClient() && transaction) {
    return transaction.startChild({
      op,
      description,
    })
  }

  return null
}

const setSentryEventStatus = (response, span, data) => {
  if (span) {
    span.setStatus(Sentry.spanStatusfromHttpCode(response.status))
    span.setTag('http.status_code', response.status)
    span.setTag('http.url', response.url)
    span.setData('http.sessionKey', JSON.stringify(data))
  }
}
const setSentryErrorStatus = (span) => {
  if (span) {
    span.setStatus(Sentry.spanStatusfromHttpCode(600))
  }
}
const finishSentryEvent = (transaction, span) => {
  if (span) {
    scheduler.postTask(span.finish.bind(span), {
      priority: 'background',
    })
  }

  if (transaction) {
    scheduler.postTask(transaction.finish.bind(transaction), {
      priority: 'background',
    })
  }
}
export { createSpan, createTransaction, setSentryErrorStatus, setSentryEventStatus, finishSentryEvent }
