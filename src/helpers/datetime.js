import dayjs from 'dayjs'

export const format = (dateTime, format = 'DD/MM/YYYY HH:mm:ss') => {
  const date = dayjs(dateTime)

  return date.format(format)
}

export const humanDate = (dateTime) => {
  return format(dateTime, 'DD/MM/YYYY HH:mm:ss')
}