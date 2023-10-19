import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Issues } from '../interfaces/issues';
import { gitHubApi } from '../../api/gitHubApi';

const getIssueInfo=async(issueNumber:number):Promise<Issues>=>{
   
   const {data}=await gitHubApi.get<Issues>(`/issues/${issueNumber}`)

   return data
}


 const getIssuesCommetns=async(issueNumber:number):Promise<Issues[]>=>{
   
  const {data}=await gitHubApi.get<Issues[]>(`/issues/${issueNumber}/comments`)
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
        ()=>getIssuesCommetns(issueNumber),
       
    );
  return {
    issueQuery,
    CommentsQuery
  }
}

