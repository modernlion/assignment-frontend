import { getAddress } from '@/interface/metamask'
const Home = () => {
  return (
    <div>
      <h1
        className="font-bold text-lg underline underline-offset-2"
        onClick={() => {
          getAddress()
        }}>
        Hello, World!
      </h1>
    </div>
  )
}

export default Home
