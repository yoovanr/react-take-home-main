export default function AppLoading({ children, variant, disabled, className, ...props }) {
  const primaryStyles = 'w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150'
  const secondaryStyles = 'w-full px-4 py-2 text-gray-700 font-medium border rounded-lg hover:border-indigo-600 active:shadow-lg duration-150'

  const disabledStyles = 'cursor-not-allowed opacity-50'

  let buttonStyles

  if (variant === 'primary') {
    buttonStyles = `${primaryStyles} ${disabled ? disabledStyles : ''}`
  } else if (variant === 'secondary') {
    buttonStyles = `${secondaryStyles} ${disabled ? disabledStyles : ''}`
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