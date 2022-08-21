import { Fragment } from 'react'
import MainPageLayout from '../../components/Layouts/MainPage'

const Home = () => {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className='pt-16'>HOME</p>
      </div>
    </Fragment>
  )
}

Home.Layout = MainPageLayout

export default Home