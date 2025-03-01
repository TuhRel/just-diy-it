"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useToast } from '@/hooks/use-toast'


const PlanForm = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: 0,
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/submit-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      toast({
        title: "Success",
        description: "Post submission completed successfully."
      })
      console.log('Form submitted successfully')
      setFormData({
        title: '',
        description: '',
        image: '',
        price: 0,
      })
    } else {
      toast({
        title: "Error",
        description: "Post submission failed."
      })
      console.error('Form submission failed')
    }
  }

  return (
    <>
      <form
        className="admin-form"
        onSubmit={handleSubmit}>
        <div>
          <label
            className='admin-form_label'
            htmlFor="title">Title</label>
          <Input
            className='admin-form_input'
            id="title"
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Title'
          />
        </div>

        <div>
          <label
            className='admin-form_label'
            htmlFor="description">Description</label>
          <Textarea
            className='admin-form_textarea'
            id="description"
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='description'/>
        </div>

        <div>
          <label
            className='admin-form_label'
            htmlFor="image">Image URL</label>
          <Input
            className='admin-form_input'
            id="image"
            name='image'
            value={formData.image}
            onChange={handleChange}
            placeholder='imageUrl'/>
        </div>
        
        <div>
          <label
            className='admin-form_label'
            htmlFor="price">Price</label>
          <Input
            className='admin-form_input'
            id="price"
            name='price'
            value={formData.price}
            onChange={handleChange}
            placeholder='Price'/>
        </div>

        <div>
          <Button
            className='admin-form_btn'
            type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

export default PlanForm