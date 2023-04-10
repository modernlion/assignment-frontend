import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Item } from '@/constants/types'
import { useValidateInput } from '@/hooks/useValidateInput'
import { encodeTransferFrom } from '@/interface/metamask'

interface IProps {
  selectedItem: Item | any
}

type InputType = {
  recipient: string
}

const TransferForm = ({ selectedItem }: IProps) => {
  const { register, handleSubmit } = useForm()
  const { isValid, errMsg } = useValidateInput()
  const transferNFT = useCallback(
    async (recipient: string) => {
      if (!isValid(recipient)) return
      if (selectedItem) {
        const { contractAddress, tokenId } = selectedItem
        await encodeTransferFrom(contractAddress, recipient, tokenId)
      }
    },
    [selectedItem],
  )

  return (
    <div className="w-[calc(100%-320px)] h-full ml-4">
      <form
        className="relative flex flex-col items-center w-full h-full pt-20"
        onSubmit={handleSubmit(data => {
          const { recipient } = data as InputType
          transferNFT(recipient)
        })}>
        <div>Recipient</div>
        <div className="relative w-full h-12">
          <input
            className=" w-full h-full border-slate-800 border-solid border-b-2 bg-transparent placeholder:text-gray-500"
            {...register('recipient')}
            placeholder={'Recipient Address'}
          />
          {!!errMsg && <div className="text-red-500">{errMsg}</div>}
        </div>
        <div className="absolute flex justify-center w-full bottom-0 text-center">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default TransferForm
