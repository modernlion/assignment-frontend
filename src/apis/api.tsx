import { SERVER_ENDPOINT } from '@/constants/values'

import { fetchData } from './rest'

const DOMAIN = SERVER_ENDPOINT
const PATH = {
  users: {
    nonce: 'users/nonce',
    nfts: 'users/nfts',
  },
  auth: {
    token: '/auth/token',
  },
}

const fetchUserNonce = async (params: { [key: string]: any }) => {
  const rsp = await fetchData({
    domain: `${DOMAIN}/${PATH.users.nonce}`,
    method: 'GET',
    params,
  })
  return rsp
}

const fetchAuthToken = async (params: { publicAddress: string; signature: string }) => {
  const rsp = await fetchData({
    domain: `${DOMAIN}/${PATH.auth.token}`,
    method: 'POST',
    params,
  })
  return rsp
}

export { fetchAuthToken, fetchUserNonce }
