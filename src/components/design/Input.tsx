import { ChangeEvent } from 'react'

interface IInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeHolder?: string
  error?: string
}

const Input = ({ value, onChange, placeHolder, error = '' }: IInputProps) => {
  return (
    <div className="relative w-full h-full">
      <input
        className="w-full h-full bg-transparent border-0"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="absolute">{error}</div>}
    </div>
  )
}

export default Input
