import React from 'react'
import { Issues } from '../interfaces/issues'
import { gitHubApi } from '../../api/gitHubApi'
import { useQuery } from '@tanstack/react-query'

const getIssues=async():Promise <Issues[]>=>{
        
    const {data}=await gitHubApi.get<Issues[]>('/issues',{
        headers:{
            Authorization:null
        }
    })

    return data
}



export const useIssueList = () => {
  
    const issuesQuery=useQuery(
        ['issues'],//nombre para identificar en cahce
        getIssues //funcion que trae la data 
    
    )
  
    return {
        issuesQuery,
    }
}
