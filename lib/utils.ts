import blockies from 'blockies'

export const getBlockieImageUrl = (seed: string): string => {
  return blockies({ seed }).toDataURL()
}

export const sanitize = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27')
}

export const replaceToAnchor = (src: string, className?: string): string =>
  src.replace(
    /((https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+))/g,
    `<a href="$1" target="_blank" rel="noopener noreferrer" class="${className}">$1</a>`
  )

export const replaceToBr = (src: string): string => src.replace(/\n/g, '<br />')

export const getCroppedAddress = (address: string): string => {
  const front = address.substr(0, 6)
  const end = address.substr(-4)
  return `${front}...${end}`
}
