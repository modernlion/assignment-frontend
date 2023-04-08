import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { fetchMyTokens } from '@/apis/api'
import { List } from '@/components/design'
import { TransferForm } from '@/components/NFTs'
import { Item, TokenInfo } from '@/constants/types'
import { protocolReplacer } from '@/shared/utils'

const NFTs = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchMyTokens,
  })

  const [selectedItem, selectItem] = useState<Item>()

  const rawData: TokenInfo[] = data?.data.ownedNfts
  const nfts: Item[] = rawData?.map(el => {
    const { metadata, title, tokenId, contract } = el
    const contractAddress = contract?.address
    const name = metadata?.name ? metadata.name : ''
    const image = metadata?.image ? metadata.image : ''
    const img = protocolReplacer(image)
    return {
      name,
      img,
      title,
      tokenId,
      contractAddress,
    }
  })

  const onSelectItem = useCallback((item: Item) => {
    selectItem(item)
  }, [])

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex w-3/5 h-3/5 rounded-md border-bgQuarternary border-solid border p-4">
        <div className="w-80 rounded-md bg-neutral-800 overflow-scroll">
          <List
            isLoading={isLoading}
            list={nfts}
            onSelect={onSelectItem}
            selectedItem={selectedItem}
          />
        </div>
        <TransferForm selectedItem={selectedItem} />
      </div>
    </div>
  )
}

export default NFTs
