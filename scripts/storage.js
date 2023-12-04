const APP_KEY = "ifium";

function get(key) {
  if (typeof window === 'undefined') return

  const data = window.localStorage.getItem(`${APP_KEY}:${key}`)
  return data ? JSON.parse(data) : null
}

function set(key, value) {
  if (typeof window === 'undefined') return

  const data = JSON.stringify(value)

  window.localStorage.setItem(`${APP_KEY}:${key}`, data)
}

export const storage = {
  get,
  set
}