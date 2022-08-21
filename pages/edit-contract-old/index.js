import { Fragment } from 'react'
import MainPageLayout from '../../components/Layouts/MainPage'
import StepsPanels from '../../components/StepsPanels'
import TrackInfo from './components/TrackInfo'

const steps = [
  { id: '01', name: 'UPLOAD YOUR MUSIC', description: 'Vitae sed mi luctus laoreet.', href: 'edit-contract', status: 'complete' },
  { id: '02', name: 'EDIT YOUR CONTRACT', description: 'Cursus semper viverra.', href: 'edit-contract', status: 'current' },
  { id: '03', name: 'RECEIVE AUTOMATIC PAYMENTS', description: 'Penatibus eu quis ante.', href: 'profile', status: 'upcoming' },
]

const Steps = () => {
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