type TokenMetadata = {
  description: string
  image: string
  name: string
}

type ContractMetadataType = {
  name: string
}

type ContractInfo = {
  address: string
}

export type TokenInfo = {
  contract: ContractInfo
  contractMetadata: ContractMetadataType
  metadata?: TokenMetadata
  title: string
  tokenId: number
  tokenUri: string
}

export type Item = {
  name: string
  tokenId: number
  title: string
  img: string
  contractAddress: string
}
