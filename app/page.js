"use client";

import FootballContainer from '@/components/FootballContainer';
import NBAcontainer from '@/components/NBAcontainer';
import { useAppContext } from '@/context';


const Home = () => {

  const { loading, fotballData, nbaData, currentSection } = useAppContext();

  if (loading) return <h1 className='text-6xl text-black font-bold'>Loading Data...</h1>
  else return (
    <div className='w-full h-full flex flex-col items-center justify-center'>

      {
        fotballData.length > 0 && currentSection === "football" && <FootballContainer fotballData={fotballData}/>
      }
      {
        nbaData.length > 0 && currentSection === "NBA" && <NBAcontainer nbaData={nbaData} />
      }
     
    </div>
  )
}

export default Home