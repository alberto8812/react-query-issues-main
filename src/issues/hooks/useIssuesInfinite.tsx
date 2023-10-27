import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { Issues, State } from '../interfaces/issues'
import { gitHubApi } from '../../api/gitHubApi';

interface props{
    state?:State,
    labels:string[],

}




interface QueryProps{
    pageParam?:number;
    queryKey:(string | props)[];
}

const getIssues=async({pageParam=1,queryKey}:QueryProps):Promise <Issues[]>=>{

    const [,,args]=queryKey;//se crear un decestruturacion para estraer los argumentos de state y labels que se encuentran en la tercera posicion
    const {state,labels}=args as props;// que lo trate como props


    const params=new URLSearchParams();// Propiedad para crear parametro 
    if(state) params.append('state',state)//los agrega en la cola 

    params.append('page',pageParam.toString());
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



export const useIssuesInfinite = ({state,labels}:props) => {

    const issuesQuery=useInfiniteQuery(
        ['issues','infinite',{state,labels,page:1}],
        (data)=>getIssues(data),//pageparam me indica el numero de pagina key contienes toda la informacion
        // del encabezao
        {
            getNextPageParam:(lastPage,pages)=>{//se dispara con estos dos argumento
                    if(lastPage.length===0) return;

                    return pages.length + 1
            }
        }
    )

  return{
    issuesQuery
  }
}
