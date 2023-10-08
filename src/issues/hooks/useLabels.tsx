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
          refetchOnWindowFocus:false//evitar que haga peticiones cuando hace un foco en la pagina 
        }
      );

  return labelSQuery;
}

