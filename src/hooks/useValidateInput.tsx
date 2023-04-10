import { useState } from 'react'

import { getLocalStorage } from '@/apis/localStorage'
import { CODES } from '@/constants/index'
import { convertToFormalAddress, isAddress } from '@/interface/metamask'

export const useValidateInput = () => {
  const [errMsg, setErrMsg] = useState<string>()

  const isValid = (address: string) => {
    try {
      const loginAddr = getLocalStorage('loginAddr')
      const inputAddr = convertToFormalAddress(address)
      const keys = Object.keys(CODES)
      if (loginAddr === inputAddr) {
        throw new Error(keys[1])
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
