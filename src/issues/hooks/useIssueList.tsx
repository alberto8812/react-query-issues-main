import { Issues, State } from '../interfaces/issues'
import { gitHubApi } from '../../api/gitHubApi'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react';



interface Props{
    state?:State;
    labels:string[];
    page?:Number;
}

const getIssues=async({labels,state,page=1}:Props):Promise <Issues[]>=>{

    const params=new URLSearchParams();// Propiedad para crear parametro 
    if(state) params.append('state',state)//los agrega en la cola 

    params.append('page',page.toString());
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
  
    const [page, setPage] = useState(1);
  
    const issuesQuery=useQuery(
        ['issues',{labels,state,page}],//nombre para identificar en cahce se hace por que el orden no es importante
        ()=>getIssues({labels,state,page}) //funcion que trae la data 
    
    )

    const nextPage=()=>{
        if(issuesQuery.data?.length==0) return;//si no tenemos informacio de la pagian  no ya a pedir el cambio de pagina 
        setPage(page+1)
    }

    const PrevPage=()=>{
        if(page>1) setPage(page-1);
    }
  
    return {
        issuesQuery,
        //getter
        page,
        //metodo
        nextPage,
        PrevPage

    }
}
