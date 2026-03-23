
import { useEffect, useState } from 'react'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { SideBar } from '../components/ui/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'




export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  },[modalOpen])

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
          <Button onClick={ async() => {
            const response = axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share: true,
            }, {
              headers: {
                "Authorization" : localStorage.getItem("token")
              }
            });
            const shareUrl = `http://localhost:5173/share/${(await response).data.hash}`;
            alert(shareUrl);

          }
          }variant="secondary" size='md' text="Share Brain" startIcon={<ShareIcon/>} ></Button>
        </div>
        <div className='flex gap-2 flex-wrap'>
          {contents.map(({type, link, title}) => <Card 
          type={type} 
          link={link} 
          title={title}/>)}
        </div>
      </div>
    </div>
  )
}

