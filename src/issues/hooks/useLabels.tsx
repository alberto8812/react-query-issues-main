import { useQuery } from "@tanstack/react-query";
import { gitHubApi } from "../../api/gitHubApi";
import { Label } from "../interfaces/label";

const getLabels=async():Promise<Label[]>=>{
    const {data}= await gitHubApi.get<Label[]>('/labels');
    console.log(data);
    return data
  }


 export const useLabels = () => {

    const labelSQuery=useQuery(
        ['label'],//definicmos el espacio en chache
        getLabels,
        {
          staleTime:1000*60*60//la data se va a mantener fresa por una hora 
        }
      );

  return labelSQuery;
}

