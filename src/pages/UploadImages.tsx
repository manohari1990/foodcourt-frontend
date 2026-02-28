import axios from 'axios'
import { useEffect, useState} from 'react'

function UploadImages () {

    const [images, setImages] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const arr:number[] = []

    useEffect(()=>{
        console.log(arr)
    })

    const handleUpload = async(e:any) =>{
        setIsUploading(true)
        const file = e.target.files[0]
        setImages(file)
        const formData = new FormData()
        formData.append('file', file)
        console.log(formData)

        try{
            const response = await axios.post('http://localhost:8000/stalls/upload', formData)
            console.log(response.data)
        }catch(e){
            console.error(e)
        }finally{
            setIsUploading(false)
        }        
    }

    return (
        <div>
            
            <input type='file' name='fileInput' onChange={handleUpload} />
            {isUploading && <>uploading...</>}
            {images}
        </div>
    )

}

export default UploadImages 