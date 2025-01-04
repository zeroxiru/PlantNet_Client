import { Helmet } from 'react-helmet-async'
import Plants from '../../components/Home/Plants'
import { useQuery } from '@tanstack/react-query'


const Home = () => {
 
  return (
    <div>
      <Helmet>
        <title> PlantNet | Buy Your Desired Plant</title>
      </Helmet>
      <Plants />
    </div>
  )
}

export default Home
