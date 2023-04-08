import { atom } from 'recoil'

const userWalletAddrState = atom<string>({
  key: 'userWalletAddrState',
  default: '',
})

export { userWalletAddrState }
