"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'


const PlanForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
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
      console.log('Form submitted successfully')
      setFormData({
        title: '',
        description: '',
        image: '',
      })
    } else {
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