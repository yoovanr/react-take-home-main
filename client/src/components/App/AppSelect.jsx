import Select from 'react-select'

export default function AppSelect(props) {
  return (
    <Select
      classNames={{
        control: () => "!cursor-pointer !bg-transparent !outline-none !border !border-inherit !focus:border-indigo-600 !shadow-sm !rounded-lg",
        valueContainer: () => "!px-3 !py-2",
        input: () => "!m-0 !p-0",
        multiValue: () => "!my-0",
        multiValueLabel: () => "!py-0",
        option: () => "!cursor-pointer",
        placeholder: () => "!text-gray-400"
      }}

      {...props}
    />
  )
}