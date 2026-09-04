import { useState } from "react"

const useFavs = () => {
  const [favList, setFavList] = useState([])
  return {favList, setFavList}
}

export default useFavs
