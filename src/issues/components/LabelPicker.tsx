import { FC } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels } from "../hooks/useLabels";

interface props{
  selecterLabels:string[],
  onchange:(labelName: string) => void
}


export const LabelPicker :FC<props>= ({selecterLabels,onchange}) => {
 const labelSQuery = useLabels();

if(labelSQuery.isLoading) return(<LoadingIcon/>)


  return (
    <>
    {
      labelSQuery.data?.map(label=>(
        <span 
            key={label.id}
            className={`badge rounded-pill m-1 label-picker ${selecterLabels.includes(label.name) && 'label-active'}`}
            style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
            onClick={()=>onchange(label.name)}
        >
            {label.name}
        </span>
      ))
    }
        
    </>
  )
}
