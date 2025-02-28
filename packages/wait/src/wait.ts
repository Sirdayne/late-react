import { setTimeout } from 'worker-timers'

const wait = (mls: number): Promise<true> => new Promise<true>((res) => setTimeout(() => res(true), mls))
export default wait
