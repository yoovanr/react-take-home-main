import CircleIcon from '../../icons/CircleIcon'

export default function AppLoading() {
  return (
    <div role="status">
      <CircleIcon />

      <span class="sr-only">Loading...</span>
    </div>
  )
}