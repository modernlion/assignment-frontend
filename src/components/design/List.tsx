import { useState } from 'react'

import { Item } from '@/constants/types'

interface IListProps {
  list: Item[]
  isLoading: boolean
  onSelect: (e: Item) => void
  selectedItem: Item | any
}

const List = ({ list, isLoading, onSelect, selectedItem }: IListProps) => {
  const [isClicked, setIsClicked] = useState<number>(-1)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full text-gray-200">Loading...</div>
    )
  } else {
    return (
      <div className="grid grid-cols-2 gap-3 ">
        {list.map((el: Item, idx: number) => {
          const { title, tokenId, img } = el
          const isSelected = idx === isClicked
          return (
            <div
              key={title + tokenId + idx}
              className={`w-full h-180 rounded-md overflow-hidden border border-solid ${
                isSelected ? 'border-gray-800' : ''
              }`}
              onClick={() => {
                onSelect(el)
                setIsClicked(idx)
              }}>
              <img className="w-full h-auto" src={img} />
              <span>{title}</span>
              <span>{tokenId}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

export default List
