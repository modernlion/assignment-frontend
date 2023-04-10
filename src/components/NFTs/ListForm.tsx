import { List } from '@/components/design'
const ListForm = () => {
  return (
    <div className="w-80 rounded-md bg-neutral-800 overflow-scroll">
      <List isLoading={isLoading} list={nfts} onSelect={onSelectItem} selectedItem={selectedItem} />
    </div>
  )
}
