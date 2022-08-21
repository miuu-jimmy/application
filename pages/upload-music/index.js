import { Fragment, useEffect } from 'react'
import MainPageLayout from '../../components/Layouts/MainPage'
import StepsPanels from '../../components/StepsPanels'
import TrackInfo from './components/TrackInfo'
import {useSelector} from 'react-redux'
import { useRouter } from 'next/router'
const steps = [
  { id: '01', name: 'UPLOAD YOUR MUSIC', description: 'Add your track to upload it to streaming platforms.', href: 'upload-music', status: 'current' },
  { id: '02', name: 'CHOOSE YOUR CONTRACT', description: 'Choose among our standard contracts.', href: 'choose-contract', status: 'upcoming' },
  { id: '03', name: 'EDIT YOUR CONTRACT', description: 'Edit your contract, set revenue splits.', href: 'edit-contract', status: 'upcoming' },
]

const Steps = () => {
  const user = useSelector(state => state.authReducer)
  const router= useRouter();
  useEffect(()=> {
    if(!localStorage.user){
      router?.push("/login")
    }
  },[])
  
  
  return (
    <Fragment>
      <StepsPanels steps={steps} /> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrackInfo/>
      </div>
    </Fragment>
  )
}

Steps.Layout = MainPageLayout

export default Steps