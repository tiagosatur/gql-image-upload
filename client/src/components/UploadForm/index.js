import React from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`


export default function UploadForm() {
    const [ uploadFile ] = useMutation(UPLOAD_FILE, {
        onCompleted(data) {
            console.log("🚀 ~ onCompleted ~ data", data)
            
        }
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(!file) return
        uploadFile({ variables: { file } })
    }
    
    return (
        <>
            <h1>UploadForm</h1>
            <input type="file" name="fileUpload" onChange={handleFileChange} />
            
        </>
    )
}