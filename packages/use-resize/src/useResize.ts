import { useEffect, useState } from 'react'

import getSize from './getSize'
import { onResizeAdd, onResizeRemove } from './onResize'
import renderer from './renderer'
import { SizeProps } from './types'

function useResize() {
  const [size, setSize] = useState(getSize())
  useEffect(() => {
    const onResize = (data: SizeProps) => {
      setSize(data)
    }
    onResizeAdd(onResize)

    return () => {
      onResizeRemove(onResize)
    }
  }, [])

  return size
}

useResize.renderer = renderer

export default useResize
