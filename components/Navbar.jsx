import { useAppContext } from '@/context'
import React from 'react'
import { scrapeData, scrapeNba } from '@/actions';

const Navbar = () => {

  const { setIsLoading, setFotballData, setNbaData, setCurrentSection } = useAppContext();

  const handleFootballClick = () => {
    setIsLoading(true)
    scrapeData().then(res => {
      setFotballData(res)
    }).catch(e => console.log(e)).finally(() => {
      setIsLoading(false)
      setCurrentSection("football")
    })
  }


  const hanldeNbaClick = () => {
    setIsLoading(true)
    scrapeNba().then(res => {
      setNbaData(res)
    }).catch(e => console.log(e)).finally(() => {
      setIsLoading(false)
      setCurrentSection("NBA")
    })
  }

  return (
    <nav className='w-full h-[10vh] flex items-center justify-center bg-black fixed top-0 left-0'>
        <span onClick={handleFootballClick} className='font-semibold text-white text-base mx-2 hover:scale-[1.1] transition-all duration-1000 cursor-pointer'>Football</span>
        <span onClick={hanldeNbaClick} className='font-semibold text-white text-base mx-2 hover:scale-[1.1] transition-all duration-1000 cursor-pointer'>NBA</span>
    </nav>
  )
}

export default Navbar