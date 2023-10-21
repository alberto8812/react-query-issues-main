import { Issues, State } from '../interfaces/issues'
import { gitHubApi } from '../../api/gitHubApi'
import { useQuery } from '@tanstack/react-query'

const getIssues=async(labels:string[],state?:State):Promise <Issues[]>=>{

    const params=new URLSearchParams();// Propiedad para crear parametro 
    if(state) params.append('state',state)//los agrega en la cola 

    params.append('page','1');
    params.append('per_page','5');

    if(labels.length>0){
        const labelString=labels.join(',')//la propuedad para que lo una con comas 
        params.append('labels',labelString);
    }
        
    const {data}=await gitHubApi.get<Issues[]>('/issues',{
        params,
        headers:{
            Authorization:null
        }
    })

    return data
}

interface props{
    state?:State,
    labels:string[],

}

export const useIssueList= ({state,labels}:props) => {
  
    const issuesQuery=useQuery(
        ['issues',{labels,state}],//nombre para identificar en cahce
        ()=>getIssues(labels,state) //funcion que trae la data 
    
    )
  
    return {
        issuesQuery,
    }
}
