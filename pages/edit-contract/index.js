import { Fragment } from 'react'
import MainPageLayout from '../../components/Layouts/MainPage'
import StepsPanels from '../../components/StepsPanels'
import RevenueSplit from './components/RevenueSplit'

const steps = [
  { id: '01', name: 'UPLOAD YOUR MUSIC', description: 'Add your track to upload it to streaming platforms.', href: 'upload-music', status: 'complete' },
  { id: '02', name: 'CHOOSE YOUR CONTRACT', description: 'Choose among our standard contracts.', href: 'choose-contract', status: 'complete' },
  { id: '03', name: 'EDIT YOUR CONTRACT', description: 'Edit your contract, set revenue splits.', href: 'edit-contract', status: 'current' },
]

const Steps = () => {
  return (
    <Fragment>
      <StepsPanels steps={steps} /> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevenueSplit />
      </div>
    </Fragment>
  )
}

Steps.Layout = MainPageLayout

export default Steps