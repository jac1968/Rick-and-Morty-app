import './App.css'
import { useEffect, useRef, useState } from 'react'
import LocationData from './components/LocationData'
import useFetch from './hooks/useFetch'
import ResidentCard from './components/ResidentCard'
import Pagination from './components/Pagination'

function App() {

  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126 + 1))
  const [location, getLocation, isLoading, hasError] = useFetch()
  const [page, setPage] = useState(1)

  console.log(location)

  useEffect( ()=> {
    const url =`https://rickandmortyapi.com/api/location/${inputValue}`
    getLocation(url)
  }, [inputValue])

  const textInput = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    setInputValue(textInput.current.value.toLowerCase().trim())
    textInput.current.value =""
    setPage(1)
  }

  const quantity = 8
    const total = Math.ceil(location?.residents.length / quantity)
    const parts = () => { 
       const last = quantity * page
       const first = last - quantity
       return location?.residents.slice(first, last)
    }

  return (
    <>
      {
        isLoading ?
          <h2 className='anima'>Is Loanding...</h2>
        :
          <div className='app'>
            <div className="app__banner app__banner_850 app__banner_550"></div>
            <h1 className='anima-2'>Rick and Morty</h1>
            <form className="app__form" onSubmit={handleSubmit}>
              <input className='app__inp' type="text" ref={textInput}/>
              <button className='app__btn'>Search</button>
            </form>
              {
                hasError || inputValue==="0" ?
                  <h2> Hey! you must provide an id from 1 to 125 😵 </h2>
                  :
                  <>
                    <LocationData
                      location={location}
                    />
                    {
                      total > 1 && 
                      <Pagination
                          setPage={setPage}
                          page={page}
                          total={total}
                      />
                    }
                    <div className='app__container'>
                        {
                          parts()?.map(resident => (
                            <ResidentCard
                              key={resident}
                              url={resident}
                            />
                          ))
                        }
                    </div>
                  </>
              }
          </div>
      }
      {
        total > 1 && 
          <div className='footer'>
              <Pagination
                setPage={setPage}
                page={page}
                total={total}
              />
          </div>
      }
    </>
  )
}
export default App
