import React from 'react'
import Header from '../Header/Header'
import { categoryContext } from '../../App'
import { useContext } from 'react'

function Cart() {
    const { categories } = useContext(categoryContext);
    // api for getting all the cart item all the courses (with the entire data like getcard) 

    // display in the list type 
    // 1
    // 2

    // have btn proceed and remove (delete)

    // and also every page have the home btn navigate('/')

    return (
        <div>
            <Header categories={categories} />

        </div>
    )
}

export default Cart