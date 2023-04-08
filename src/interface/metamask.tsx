import { ethers } from 'ethers'
const ethereum = window.ethereum
let provider: any

const createBytesMsg = (msg: string) => {
  return ethers.utils.toUtf8Bytes(msg)
}

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
    console.log(tx)
    return tx
  }
}

const metamaskSendTransaction = async (rawTx: any) => {
  if (ethereum) {
    const _ethereum = ethereum as any
    console.log('a')
    const txResult = await _ethereum.request({
      method: 'eth_sendTransaction',
      params: [rawTx],
      id: 1234,
    })
    return txResult
  }
}

export { encodeTransferFrom, getAddress, metamaskSendTransaction, signing }
