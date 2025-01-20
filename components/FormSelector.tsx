"use client"

import React, { useState } from 'react'
import ContentForm from './ContentForm'
import ProductForm from './ProductForm'
import PlanForm from './PlanForm'


const FormSelector = () => {
  const [ formType, setFormType ] = useState<string>('')

  const changeType = (e: React.MouseEvent<HTMLSpanElement>) => {
    setFormType(e.currentTarget.id) 
  }
  
  return (
    <>
      <div className='flex justify-center grid-cols-3 gap-5 bg-white py-6'>
        <span
          id='post'
          onClick={changeType}
          className='cursor-pointer text-20-medium'>Post</span>
        <span
          id='product'
          onClick={changeType}
          className='cursor-pointer text-20-medium'>Product</span>
        <span
          id='plan'
          onClick={changeType}
          className='cursor-pointer text-20-medium'>Plan</span>
      </div>

      { formType === 'post' ? (
        <ContentForm />
      ) : formType === 'product' ? (
        <ProductForm />
      ) : formType === 'plan' ? (
        <PlanForm />
      ) : <p>Select an Option to Load the Form</p>}
    </>
  )
}

export default FormSelector