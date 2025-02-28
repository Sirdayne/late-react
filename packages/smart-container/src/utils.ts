import { SmartContainerData } from './types'

export function shallowEqual(alpha: SmartContainerData, beta: SmartContainerData): boolean {
  const keys1 = Object.keys(alpha)
  const keys2 = Object.keys(beta)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (alpha[key as keyof SmartContainerData] !== beta[key as keyof SmartContainerData]) {
      return false
    }
  }

  return true
}
