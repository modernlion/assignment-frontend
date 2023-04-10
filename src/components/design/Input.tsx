import { ChangeEvent } from 'react'

interface IInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeHolder?: string
  error?: string
}

const Input = ({ value, onChange, placeHolder, error = '' }: IInputProps) => {
  return (
    <div className="relative w-full h-full border-gray-50 border-solid border-b-2 placeholder:text-gray-500">
      <input
        className="w-full h-full bg-transparent border-0 border-gray-50 border-solid"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="absolute">{error}</div>}
    </div>
  )
}

export default Input
