export default function getFormattedDate(date: Date) {
  let year = date.getFullYear()
  let day = date.getDate().toString().padStart(2, '0')
  let month = date.toLocaleString('default', {
    month: 'short'
  })
  return `${month} ${day}, ${year}`
}
