import blockies from 'blockies'

export const getBlockieImageUrl = (address: string): string => {
  return blockies({ seed: address }).toDataURL()
}

export const getCroppedAddress = (address: string): string => {
  const front = address.substr(0, 6)
  const end = address.substr(-4)
  return `${front}...${end}`
}
