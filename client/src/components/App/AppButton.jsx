export default function AppButton({ children, variant, disabled, className, ...props }) {
  const primaryStyles = 'px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150'
  const secondaryStyles = 'px-4 py-2 text-gray-700 font-medium border rounded-lg hover:border-indigo-600 active:shadow-lg duration-150'
  const transparentStyles = 'py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg'

  const disabledStyles = 'cursor-not-allowed opacity-50'

  let buttonStyles

  if (variant === 'primary') {
    buttonStyles = `${primaryStyles} ${disabled ? disabledStyles : ''}`
  } else if (variant === 'secondary') {
    buttonStyles = `${secondaryStyles} ${disabled ? disabledStyles : ''}`
  } else if (variant === 'transparent') {
    buttonStyles = `${transparentStyles} ${disabled ? disabledStyles : ''}`
  }

  return (
    <button
      className={`${buttonStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}