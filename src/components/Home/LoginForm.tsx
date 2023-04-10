import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchAuthToken, fetchUserNonce } from '@/apis/api'
import { setLocalStorage } from '@/apis/localStorage'
import { Button } from '@/components/design'
import { PATHNAME } from '@/constants/index'
import { checkChainId, convertToFormalAddress, getAddress, signing } from '@/interface/metamask'

const LoginForm = () => {
  const navigate = useNavigate()
  const [userWalletAddr, setUserWalletAddr] = useState<string>('')
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const connectToWallet = useCallback(async () => {
    await checkChainId()
    const address = await getAddress()
    setUserWalletAddr(address)
  }, [])

  const getNonce = useCallback(async () => {
    const { nonce } = await fetchUserNonce({
      publicAddress: userWalletAddr,
    })
    return nonce
  }, [userWalletAddr])

  const sign = useCallback(async (nonce: string) => {
    const signature = await signing(nonce)
    return signature
  }, [])

  const getAuthToken = useCallback(async (userWalletAddr: string, signature: string) => {
    const { data } = await fetchAuthToken({
      publicAddress: userWalletAddr,
      signature,
    })
    const authToken = data.access_token
    return authToken
  }, [])

  const login = useCallback(async () => {
    try {
      if (isClicked) {
        return
      }
      setIsClicked(true)
      // auth token API가 nonce와 signature를 받지 않고 publicAddr과 signature 받는 것 같습니다.
      const nonce = await getNonce()
      const signature = await sign(nonce)
      const authToken = await getAuthToken(userWalletAddr, signature)
      setLocalStorage('token', authToken)
      setLocalStorage('loginAddr', convertToFormalAddress(userWalletAddr))
      navigate(PATHNAME.NFTS)
      setIsClicked(false)
    } catch (e) {
      setIsClicked(false)
      throw e
    }
  }, [userWalletAddr, isClicked])

  return (
    <div className="block w-640 h-3/5 p-4 rounded-md border-black bg-white border-4 border-solid">
      <div className="flex flex-col w-full h-full justify-between">
        <div className="w-full">
          <div className="w-full h-12 border-b-2 text-black border-solid border-black pb-2 mb-4">
            {userWalletAddr}
          </div>
          <Button
            className="h-8"
            text="Connect"
            size="sm"
            theme="Filled"
            onClick={connectToWallet}
          />
        </div>
        <Button
          className="w-full h-10"
          text={isClicked ? 'Loading' : 'Login'}
          size="sm"
          onClick={() => login()}
        />
      </div>
    </div>
  )
}

export default LoginForm
