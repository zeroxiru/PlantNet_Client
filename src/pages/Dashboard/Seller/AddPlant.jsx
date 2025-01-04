import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utlis';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast';

const AddPlant = () => {
  const {user} = useAuth()
  const [uploadImage, setUploadImage] = useState({
    image: {name:'Upload Button'},

  } )
  const [loading, setLoading] = useState(false)
  const axiosSecure = useAxiosSecure()
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true)

    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value 
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl=  await imageUpload(image)

    // seller info
    const seller = { 
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }
   
    //create plant data object
    const plantData = { 
    name,
    description,
    category,
    price,
    quantity,
    image: imageUrl,
    seller,

    }
console.table(plantData);
//save plant in db
   try {
    //post request
     await axiosSecure.post('/addPlant', plantData)
     toast.success("Data added successfully!")
   } catch (error) {
    // catch error
    console.log(error);
   }
   finally
   //loading state after fetching the data from db to false
   { 
    setLoading(false)
   }

  }
   
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit}
      uploadImage ={uploadImage}
      setUploadImage= {setUploadImage}
      loading= {loading}/>
    </div>
  )
}

export default AddPlant
