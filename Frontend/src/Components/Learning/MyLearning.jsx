import React from 'react'
import Header from '../Header/Header'
import { useContext } from 'react'
import { categoryContext } from '../../App'

function MyLearning() {
  const { categories } = useContext(categoryContext);
  return (
    <div>
      <Header categories={categories} />
    </div>
  )
}

export default MyLearning
