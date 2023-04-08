import { getLocalStorage } from '@/apis/localStorage'

type RestFulAPIType = {
  domain: string
  method: 'GET' | 'POST'
  queryParams?: string
  params?: any
  delay?: number
}

const fetchData = async ({ domain, method, params, delay = 5000 }: RestFulAPIType) => {
  const controller = new AbortController()
  const timerId = setTimeout(() => controller.abort(), delay)
  let qs = ''
  let body = {}
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (params) {
    qs = queryParser(params)
  }

  if (method === 'POST') {
    const autoToken = getLocalStorage('token')
    body = {
      body: JSON.stringify(params),
    }
    headers = {
      ...headers,
      Authorization: `Bearer ${autoToken}`,
    }
  }

  const rsp = await fetch(`${domain}${qs}`, {
    method,
    ...headers,
    ...body,
    redirect: 'follow',
    signal: controller.signal,
  })
  clearTimeout(timerId)
  if (rsp.ok) {
    const response = await rsp.json()
    const retCode = (response.retCode ??= 0) as number
    const retMsg = (response.retMessage ??= '') as string
    if (retCode !== 0) {
      throw new Error(JSON.stringify({ code: retCode, message: retMsg }))
    } else {
      return response
    }
  } else {
    throw new Error(JSON.stringify({ code: rsp.status }))
  }
}

const queryParser = (params: any) => {
  if (!params) {
    return ''
  }
  let initialValue = '?'
  const keys = Object.keys(params)
  keys.map((el: any, idx) => {
    if (idx === keys.length - 1) {
      initialValue = initialValue + el + '=' + params[el]
      return
    }
    initialValue = initialValue + el + '=' + params[el] + '&'
  })
  return initialValue
}

export { fetchData }
