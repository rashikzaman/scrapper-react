import React from 'react'
import cookie from '../utils/cookie'
import api from '../utils/api'

const useKeyword = () => {
    const [selectedFile, setSelectedFile] = React.useState()
    const [keywords, setKeywords] = React.useState([])
    const [searchKey, setSearchKey] = React.useState("")


    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const result = await api().get(`user/keywords?search=${searchKey}`, cookie.getAccessTokenCookie())
            setKeywords(result.data)
        } catch (e) {
            console.log(e)
            alert("Failed to search keywords")
        }
    }

    const loadKeywords = async () => {
        try {
            const result = await api().get(`user/keywords`, cookie.getAccessTokenCookie())
            setKeywords(result.data)
        } catch (e) {
            console.log(e)
            alert("Failed to fetch keywords")
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
            const result = await api().post(`user/keywords`, cookie.getAccessTokenCookie(), formData)
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


    return { keywords, handleSubmit, handleFileChange, searchKey, setSearchKey, handleSearch }
}

export default useKeyword