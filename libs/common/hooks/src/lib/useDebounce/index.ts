import { useEffect, useState } from 'react'

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // set timeout when value changed
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // clear timeout when next render or component unmounted
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
