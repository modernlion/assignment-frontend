import { ethers } from 'ethers'
const ethereum = window.ethereum
let provider: any

const initialize = () => {
  if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum)
  } else {
    throw new Error('E1000')
  }
}

const isConnected = async () => {
  if (await provider.getNetwork()) {
    console.log('Successfully connected to MetaMask!')
  } else {
    console.log('Please connect to MetaMask!')
  }
}

const getAddress = async () => {
  if (ethereum) {
    const _ethereum = ethereum as any
    const [account] = await _ethereum.request({ method: 'eth_requestAccounts' })
    console.log('Connected account:', account)
    return account
  } else {
    throw new Error('E404')
  }
}

export { getAddress }
