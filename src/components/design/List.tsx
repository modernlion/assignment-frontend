interface IListProps {
  list: any[]
}

const List = ({ list }: IListProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="w-full h-180 rounded-md"></div>
    </div>
  )
}

export default List
