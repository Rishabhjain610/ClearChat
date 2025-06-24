import React,{ useState } from 'react'
import SideBar from '../component/SideBar'
import MessageArea from '../component/MessageArea'
const Home = () => {

  return (
    <div className='flex h-screen w-full'>
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default Home
