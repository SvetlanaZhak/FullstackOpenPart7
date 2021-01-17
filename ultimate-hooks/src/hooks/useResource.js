import React, { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = '/api/notes'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    let token = null
    const setToken = newToken => {
        token = `bearer ${newToken}`
      }

    useEffect(() => {
        getAll()
      }, [])

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources([...response.data])
      }

   const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    setResources([...resources, response.data])
  }


    const service = {
        getAll,
        create,
  
    }
   
    return [
      resources, service
    ]
  }

