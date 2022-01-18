import React from 'react'
import axios from 'axios'
import cookie from '../utils/cookie'

const useKeyword = () => {
    const [selectedFile, setSelectedFile] = React.useState()
    const [keywords, setKeywords] = React.useState([])
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_HOST

    const loadKeywords = async () => {
        try {
            const result = await axios(`${baseUrl}/user/keywords`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${cookie.getAccessTokenCookie()}`
                }
            })
            setKeywords(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        loadKeywords()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const result = await axios(`${baseUrl}/user/keywords`, {
                method: 'POST',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${cookie.getAccessTokenCookie()}`
                }
            })
            if (result.status === 201) {
                const tempArray = keywords.concat(result.data)
                setKeywords(tempArray)
            } else {
                alert("Failed uploading file!")
            }
        } catch (e) {
            alert("Network error!")
        }
    }


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }


    return { keywords, handleSubmit, handleFileChange }
}

export default useKeyword