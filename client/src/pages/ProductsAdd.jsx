import { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createProduct, isProductNameUnique } from '../services/products'

import { typeOptions, footwearSizeOptions, clothingSizesOptions } from '../constants'

import AppButton from '../components/App/AppButton'
import AppSelect from '../components/App/AppSelect'

import DeleteIcon from '../icons/DeleteIcon'

const defaultValues = {
  features: [{ value: '' }],
}

export default function ProductsAddPage() {
  const navigate = useNavigate()

  const [sizeOptions, setSizeOptions] = useState(footwearSizeOptions)

  const { register, watch, control, setValue, setError, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ defaultValues })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  })

  const navigateToProducts = () => {
    navigate('/')
  }

  const typeField = watch('type')

  const createProductMutation = useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      toast('Succesfully created!', {
        position: 'bottom-right',
      })

      navigateToProducts()
    },
  })

  const onChangeType = (selectedOption) => {
    if (selectedOption.sizeType === 'footwear') {
      setSizeOptions(footwearSizeOptions)
    } else {
      setSizeOptions(clothingSizesOptions)
    }

    setValue('sizes', [])
    setValue('features', [])
    setValue('features.0.value', '')
    setValue('brand', '')
    setValue('style', '')
    setValue('materials', '')
    setValue('colour', '')
    setValue('neckline', '')
  }

  const onSubmit = async (data) => {
    const isUnique = await isProductNameUnique({ name: data.name })

    if (isUnique) {
      const product = {
        name: data.name,
        type: data.type.value,
        sizes: data.sizes.map((size) => size.value),
        features: data.features.map((feature) => feature.value),
        brand: data.brand,
      }

      if (data.type.value === 'footwear') {
        product.style = data.style
      } else if (data.type.value === 'outerwear') {
        product.materials = data.materials
      } else if (data.type.value === 'dress') {
        product.colour = data.colour
      } else if (data.type.value === 'top') {
        product.neckline = data.neckline
      }

      createProductMutation.mutate(product)
    } else {
      setError('name', {
        type: 'manual',
        message: 'Product name must be unique',
      })
    }
  }

  const selectedTypeField = typeField && typeField.value

  const isDisabled = !isDirty || !isValid

  return (
    <main className="py-14">
      <div className="max-w-lg mx-auto px-4 text-gray-600 md:px-8">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Add product
        </h3>

        <div className="mt-6 max-w-lg mx-auto">
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="font-medium">
                Name *
              </label>

              <input
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                type="text"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />

              {errors.name && <p className="mt-2 text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="font-medium">
                Type *
              </label>

              <div className="mt-2">
                <Controller
                  name="type"
                  rules={{ required: true }}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <AppSelect
                      options={typeOptions}
                      placeholder="Select type"
                      value={value}
                      onChange={(selectedOption) => {
                        onChange(selectedOption)
                        onChangeType(selectedOption)
                      }}
                    />
                  )}
                />
              </div>
            </div>

            {
              selectedTypeField && (
                <div className="space-y-5">
                  <div>
                    <label className="font-medium">
                      Sizes *
                    </label>

                    <div className="mt-2">
                      <Controller
                        name="sizes"
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <AppSelect
                            isMulti
                            options={sizeOptions}
                            placeholder="Select sizes"
                            value={value}
                            onChange={(selectedOption) => {
                              onChange(selectedOption)
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    {
                      fields.map((field, index) => (
                        <div className="mt-2" key={index}>
                          <label className="font-medium">
                            Feature #{index + 1} *
                          </label>

                          <div className="relative mt-2">
                            {
                              index !== 0 && (
                                <AppButton
                                  type="button"
                                  className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                  onClick={() => remove(index)}
                                >
                                  <DeleteIcon />
                                </AppButton>
                              )
                            }

                            <input
                              className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                              type="text"
                              placeholder="Enter feature name"
                              {...register(`features.${index}.value`, { required: true })}
                            />
                          </div>
                        </div>
                      ))
                    }

                    <div className="mt-2">
                      <AppButton
                        type="button"
                        variant="primary"
                        className="w-fit"
                        onClick={() => append({ value: '' })}
                      >
                        Add feature
                      </AppButton>
                    </div>
                  </div>

                  <div>
                    <label className="font-medium">
                      Brand *
                    </label>

                    <input
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      type="text"
                      placeholder="Enter brand name"
                      {...register("brand", { required: true })}
                    />
                  </div>

                  {
                    selectedTypeField === 'footwear' && (
                      <div>
                        <label className="font-medium">
                          Style *
                        </label>

                        <input
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          type="text"
                          placeholder="Enter style"
                          {...register("style", { required: true })}
                        />
                      </div>
                    )
                  }

                  {
                    selectedTypeField === 'outerwear' && (
                      <div>
                        <label className="font-medium">
                          Materials *
                        </label>

                        <input
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          type="text"
                          placeholder="Enter materials"
                          {...register("materials", { required: true })}
                        />
                      </div>
                    )
                  }

                  {
                    selectedTypeField === 'dress' && (
                      <div>
                        <label className="font-medium">
                          Colour *
                        </label>

                        <input
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          type="text"
                          placeholder="Enter colour"
                          {...register("colour", { required: true })}
                        />
                      </div>
                    )
                  }

                  {
                    selectedTypeField === 'top' && (
                      <div>
                        <label className="font-medium">
                          Neckline *
                        </label>

                        <input
                          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          type="text"
                          placeholder="Enter neckline"
                          {...register("neckline", { required: true })}
                        />
                      </div>
                    )
                  }
                </div>
              )
            }

            <AppButton
              variant="primary"
              type="submit"
              className="w-full"
              disabled={isDisabled}
            >
              Add product
            </AppButton>

            <AppButton
              variant="secondary"
              className="w-full"
              onClick={() => navigateToProducts()}
            >
              Cancel
            </AppButton>
          </form>
        </div>
      </div>
    </main>
  )
}