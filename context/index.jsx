import { useState, useContext, createContext } from "react";


const Context = createContext({
    fotballData: [], 
    nbaData: [], 
    setFotballData: () => {}, 
    setNbaData: () => {}, 
    loading: false, 
    setIsLoading: () => {}, 
    currentSection: "", 
    setCurrentSection: () => {}
})


export default function AppContextProvider({ children }){

    const [fotballData, setFotballData] = useState([]);
    const [nbaData, setNbaData] = useState([]);
    const [loading, setIsLoading] = useState(false)
    const [currentSection, setCurrentSection] = useState("")

    const value = { fotballData, nbaData, setFotballData, setNbaData, loading, setIsLoading, currentSection, setCurrentSection }
    
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}


export const useAppContext = () => useContext(Context)