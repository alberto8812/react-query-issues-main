import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Issues } from '../interfaces/issues';
import { gitHubApi } from '../../api/gitHubApi';

export const getIssueInfo=async(issueNumber:number):Promise<Issues>=>{
   
   const {data}=await gitHubApi.get<Issues>(`/issues/${issueNumber}`,{
    headers:{

      Authorization:null
    }
  })

   return data
}


 export const getIssuesCommetns=async(issueNumber:number):Promise<Issues[]>=>{
   
  const {data}=await gitHubApi.get<Issues[]>(`/issues/${issueNumber}/comments`,{
    headers:{

      Authorization:null
    }
  })
 console.log(data)
  return data
}
export const UseIssue = (issueNumber:number) => {
    const  issueQuery=useQuery(
        ['issue',issueNumber],
        ()=>getIssueInfo(issueNumber),/// DEVIDO A QUE TIENE UN PARAMETRO SE HACE CREA COMO UN FUNCION DE INVOCACION
       
    );
    const  CommentsQuery=useQuery(
        ['issue',issueNumber,'comments'],
        ()=>getIssuesCommetns(issueQuery.data!.number),
        {
          //si esta en false jamas se va a disparara la query debe pasar a true 
          enabled:issueQuery.data !==undefined 
        }
       
    );
  return {
    issueQuery,
    CommentsQuery
  }
}

