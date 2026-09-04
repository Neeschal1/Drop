import React from 'react'
import { NavigationAnchor, NavsTexts, SubHeading } from '../../components/componentsLayout'

const Navs = () => {
  return (
    <div className="flex items-center justify-center w-full pt-32 gap-large">
      <NavigationAnchor anchorName="Home" navigateTo="/" />
      <NavsTexts pageName=">" />
      <NavsTexts pageName="Product Description" />
    </div>
  )
}

export default Navs