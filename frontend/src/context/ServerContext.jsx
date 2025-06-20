import React from 'react'
import { createContext,useState } from 'react'
export const ServerContext1= createContext();


const ServerContext = ({children}) => {
  const serverUrl="http://localhost:7000";
  const value={
    serverUrl
   
  }

  return (
    <div>
      <ServerContext1.Provider value={value}>
        {children}
      </ServerContext1.Provider>
    </div>
  )
}

export default ServerContext
