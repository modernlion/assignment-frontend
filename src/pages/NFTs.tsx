import { Button, Input, List } from '@/components/design'

const NFTs = () => {
  const func = (e: any) => {
    console.log(e)
  }
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex w-3/5 h-3/5 rounded-md border-bgQuarternary border-solid border p-4">
        <div className="w-80 rounded-md bg-neutral-800">
          <List list={[]} />
        </div>
        <div className="w-[calc(100%-320px)] h-full ml-4">
          <div className="relative flex flex-col items-center w-full h-full pt-20">
            <div className="w-full h-12">
              <Input value="Value" handleOnChange={func} />
            </div>

            <div className="absolute flex justify-center w-full bottom-0 text-center">
              <Button text="Send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTs
