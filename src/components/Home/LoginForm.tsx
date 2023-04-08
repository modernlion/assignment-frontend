import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchAuthToken, fetchUserNonce } from '@/apis/api'
import { setLocalStorage } from '@/apis/localStorage'
import { Button } from '@/components/design'
import { PATHNAME } from '@/constants/index'
import { getAddress, signing } from '@/interface/metamask'

const LoginForm = () => {
  const navigate = useNavigate()
  const [userWalletAddr, setUserWalletAddr] = useState<string>('')
  const [nonce, setNonce] = useState<string>('')

  const onClickConnect = async () => {
    const address = await getAddress()
    setUserWalletAddr(address)
  }

  const getNonce = useCallback(async () => {
    await fetchUserNonce({
      publicAddress: userWalletAddr,
    }).then(data => {
      console.log(data)
      const { nonce } = data
      setNonce(nonce)
    })
  }, [userWalletAddr])

  const signNonce = useCallback(async () => {
    const signature = await signing(nonce)
    const autoToken = await fetchAuthToken({
      publicAddress: userWalletAddr,
      signature,
    })
    setLocalStorage('token', autoToken)
  }, [userWalletAddr, nonce])

  return (
    <div className="block w-2/4 h-3/5 p-4 rounded-md border-bgQuarternary bg-gray-600 border border-solid">
      <div className="flex flex-col w-full h-full justify-between">
        <div className="w-full">
          <div className="w-full h-12 border-b-2 border-solid border-gray-300 pb-2 mb-4">
            {userWalletAddr}
          </div>
          <Button
            className="h-8"
            text="Connect"
            size="sm"
            theme="Filled"
            onClick={onClickConnect}
          />
          <div className="w-full h-12 border-b-2 border-solid border-gray-300 pb-2 mb-4">
            {nonce}
          </div>
          <Button className="h-8" text="Nonce" size="sm" theme="Filled" onClick={getNonce} />
          <Button className="h-8" text="Sign" size="sm" theme="Filled" onClick={signNonce} />
        </div>
        <Button
          className="w-full h-10"
          text="Login"
          size="sm"
          onClick={() => navigate(PATHNAME.NFTS)}
        />
      </div>
    </div>
  )
}

export default LoginForm
