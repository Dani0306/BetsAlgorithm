import React from 'react'

const FootballContainer = ({ fotballData }) => {
  return (
<>
    {
        fotballData.length > 0 &&
        <div className='w-full h-full flex flex-col items-center pt-[12vh]'>
          
          <h1 className='my-10 text-4xl'>Football</h1>

         <table classname="w-full lg:w-[700px] border-collapse">
          <thead>
              <tr>
                  <th className="w-1/5 px-4 py-2 border border-black">Home Team</th>
                  <th className="w-1/5 px-4 py-2 border border-black">Away Team</th>
                  <th className="w-1/5 px-4 py-2 border border-black">Home %</th>
                  <th className="w-1/5 px-4 py-2 border border-black">Draw %</th>
                  <th className="w-1/5 px-4 py-2 border border-black">Away %</th>
              </tr>
          </thead>
          <tbody>
              {
              fotballData.map((item, index) => (
                  <tr key={index}>
                      <td className="w-1/5 px-4 py-2 border border-black">{item[0]}</td>
                      <td className="w-1/5 px-4 py-2 border border-black">{item[1]}</td>
                      <td className="w-1/5 px-4 py-2 border border-black">{item[3]}%</td>
                      <td className="w-1/5 px-4 py-2 border border-black">{item[4]}%</td>
                      <td className="w-1/5 px-4 py-2 border border-black">{item[5]}%</td>
                  </tr>
                ))}
          </tbody>
          </table>
        </div>
      }
      </>
  )
}

export default FootballContainer