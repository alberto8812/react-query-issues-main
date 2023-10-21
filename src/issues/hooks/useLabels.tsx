import { useQuery } from "@tanstack/react-query";
import { gitHubApi } from "../../api/gitHubApi";
import { Label } from "../interfaces/label";

const getLabels=async():Promise<Label[]>=>{
    const {data}= await gitHubApi.get<Label[]>('/labels?per_page=100',{
      headers:{

        Authorization:null
      }
    });
    console.log(data);
    return data
  }


 export const useLabels = () => {

    const labelSQuery=useQuery(
        ['label'],//definicmos el espacio en chache
        getLabels,
        {
         staleTime:1000*60*60,//la data se va a mantener fresa por una hora 
        //  initialData:[
        //   {
        //     id: 69105383,
        //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
        //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        //     name: "Browser: IE",
        //     color: "c7def8",
        //     default: false,
        //   },
        //   {
        //     id: 69105358,
        //     node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
        //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
        //     name: "Browser: Safari",
        //     color: "c7def8",
        //     default: false,
        //   }
        // ],//da confianza en la data fresca 
         placeholderData: [//debe ser un  objeto que lusca como la data que se esta cargando, muestra informacion antes
          {
            id: 69105383,
            node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
            url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
            name: "Browser: IE",
            color: "c7def8",
            default: false,
          },
          {
            id: 69105358,
            node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
            url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
            name: "Browser: Safari",
            color: "c7def8",
            default: false,
          }
      ]
          
         
        }
      );

  return labelSQuery;
}

