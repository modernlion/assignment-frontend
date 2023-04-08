import { ChangeEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input } from '@/components/design'
import { Item } from '@/constants/types'
import { encodeTransferFrom } from '@/interface/metamask'

interface IProps {
  selectedItem: Item | any
}

const TransferForm = ({ selectedItem }: IProps) => {
  const { register, handleSubmit } = useForm()
  const [recipient, setRecipient] = useState<string>('')
  const transferNFT = useCallback(async () => {
    if (selectedItem) {
      const { contractAddress, tokenId } = selectedItem
      await encodeTransferFrom(contractAddress, recipient, tokenId)
    }
  }, [selectedItem, recipient])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    console.log(value)
    setRecipient(value)
  }

  return (
    <div className="w-[calc(100%-320px)] h-full ml-4">
      <div className="relative flex flex-col items-center w-full h-full pt-20">
        <div className="w-full h-12">
          <span>Recipient</span>
          <Input value={recipient} onChange={handleChange} />
        </div>
        <div className="absolute flex justify-center w-full bottom-0 text-center">
          <Button text="Send" onClick={handleSubmit(transferNFT)} />
        </div>
      </div>
    </div>
  )
}

export default TransferForm
