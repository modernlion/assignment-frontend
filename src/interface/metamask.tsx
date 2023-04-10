import { ethers } from 'ethers'

const ethereum = window.ethereum
let provider: any

const isAddress = (address: string) => {
  const isAddress = ethers.utils.isAddress(address)
  return isAddress
}

const convertToFormalAddress = (address: string) => {
  const newAddress = ethers.utils.getAddress(address)
  return newAddress
}

const createBytesMsg = (msg: string) => {
  return ethers.utils.toUtf8Bytes(msg)
}

const checkIsConnected = async () => {
  if (await provider.getNetwork()) {
    console.log('Successfully connected to MetaMask!')
    return true
  } else {
    console.log('Please connect to MetaMask!')
    return false
  }
}

const checkChainId = async () => {
  if (ethereum) {
    const _ethereum = window.ethereum as any
    await _ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x5' }],
    })
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

const signing = async (msg: string) => {
  if (ethereum) {
    const _ethereum = ethereum as any
    const bytesMsg = createBytesMsg(msg)
    const signature = await _ethereum.request({
      method: 'personal_sign',
      params: [_ethereum.selectedAddress, ethers.utils.hexlify(bytesMsg)],
    })
    return signature
  }
}

const encodeTransferFrom = async (
  contractAddress: string,
  recipientAddress: string,
  tokenId: number,
) => {
  const transferFrom = {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  }
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, [transferFrom], signer)
    const tx = await contract.transferFrom(await signer.getAddress(), recipientAddress, tokenId)
    return tx
  }
}

const metamaskSendTransaction = async (rawTx: any) => {
  if (ethereum) {
    const _ethereum = ethereum as any
    const txResult = await _ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTx],
      id: 1234,
    })
    return txResult
  }
}

export {
  checkChainId,
  checkIsConnected,
  convertToFormalAddress,
  encodeTransferFrom,
  getAddress,
  isAddress,
  metamaskSendTransaction,
  signing,
}
