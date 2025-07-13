import React,{ useState } from 'react'
import SideBar from '../component/SideBar'
import MessageArea from '../component/MessageArea'
import getMessages from '../customHooks/getMessages'
const Home = () => {
  getMessages()
  return (
    <div className='flex h-screen w-full'>
      <SideBar />
      <MessageArea />
    </div>
  )
}

export default Home
