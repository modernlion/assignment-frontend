export const cx = (...classes: (false | null | undefined | string)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const protocolReplacer = (str: string) => {
  if (!str) {
    return ''
  }
  const uri = 'https://nftstorage.link/ipfs/'
  const _uri = str.replaceAll('ipfs://', uri).replaceAll('https://ipfs.io/ipfs/', uri)
  return _uri
}
