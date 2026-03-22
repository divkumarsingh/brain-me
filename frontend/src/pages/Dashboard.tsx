
import { useState } from 'react'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/ui/SideBar'




export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div >
      <div>
        <SideBar/>
      </div>
      <div className="p-4 ml-72 min-h-screen bg-slate-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => {
          setModalOpen(false)
        }}/>
        <div className='flex justify-end mt-2 mb-4 gap-4'>
          <Button onClick={() => {
            setModalOpen(true)
          }} variant="primary" size='md' text="Add content" startIcon={<PlusIcon/>} ></Button>
          <Button variant="secondary" size='md' text="Share Brain" startIcon={<ShareIcon/>} ></Button>
        </div>
        <div className='flex gap-2'>
          <Card  title="first video" type="youtube" link="https://www.youtube.com/watch?v=zBZgdTb-dns"/>
          <Card title='first tweet' type="twitter" link="https://x.com/nsinghal211/status/2035344644440232001"/>
          <Card title="elons tweet" type="twitter" link="https://x.com/elonmusk/status/2035526810939666552"/>
        </div>
      </div>
    </div>
  )
}

