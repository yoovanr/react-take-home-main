import AppButton from '../App/AppButton'

export default function ProductsTable({ data = [], onUpdateItem }) {
  return (
    <table className="w-full table-auto text-sm text-left">
      <thead className="bg-gray-50 text-gray-600 font-medium border-b">
        <tr>
          <th className="py-3 px-6">ID</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Type</th>
          <th className="py-3 px-6">Sizes</th>
          <th className="py-3 px-6">Brand</th>
          <th className="py-3 px-6"></th>
        </tr>
      </thead>

      <tbody className="text-gray-600 divide-y">
        {
          data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">#{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.sizes.join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>

              <td className="text-right px-6 whitespace-nowrap">
                <AppButton
                  variant="transparent"
                  onClick={() => onUpdateItem(item.id)}
                >
                  Update
                </AppButton>
              </td>
            </tr>
          ))
        }

        {
          data.length === 0 && (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">There are no products yet!</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}