const cb = data => console.error('data:', data)

const bufferedSetData = () => {
  let state = {}
  let timeout
  return data => {
    state = { ...state, ...data }

    timeout = setTimeout(() => {
      cb(state)
      state = {}
      clearTimeout(timeout)
    }, 200)
  }
}
export const setData = bufferedSetData()
