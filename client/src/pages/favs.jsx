import React from 'react'
import Navbar from '../constants/navbar'
import Footer from '../constants/footer'
import FavItems from '../ui/favourites/favitems'

const Favourites = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Navbar />
      <FavItems />
      <Footer />
    </div>
  )
}

export default Favourites