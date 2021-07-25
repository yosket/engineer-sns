import blockies from 'blockies'

export const getBlockieImageUrl = (seed: string): string => {
  return blockies({ seed }).toDataURL()
}

export const getCroppedAddress = (address: string): string => {
  const front = address.substr(0, 6)
  const end = address.substr(-4)
  return `${front}...${end}`
}
