import { useState } from 'react'

import { getLocalStorage } from '@/apis/localStorage'
import { CODES } from '@/constants/index'
import { convertToFormalAddress, getAddress, isAddress } from '@/interface/metamask'

export const useValidateInput = () => {
  const [errMsg, setErrMsg] = useState<string>()

  const isValid = async (address: string) => {
    try {
      const loginAddr = getLocalStorage('loginAddr') as string
      const inputAddr = convertToFormalAddress(address)
      const curAddr = await getAddress()
      const keys = Object.keys(CODES)
      if (loginAddr === inputAddr) {
        throw new Error(keys[1])
      }
      if (convertToFormalAddress(curAddr) !== convertToFormalAddress(loginAddr)) {
        throw new Error(keys[2])
      }
      return isAddress(address)
    } catch (e: any) {
      const MSG = CODES[e.message] ? CODES[e.message] : e.message
      setErrMsg(MSG)
      throw e
    }
  }

  return {
    isValid,
    errMsg,
  }
}
