import { ethers } from 'ethers'
const ethereum = window.ethereum

const getAddress = () => {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const address = signer.getAddress()
    return address
  } else {
    throw new Error('E404')
  }
}

export { getAddress }
