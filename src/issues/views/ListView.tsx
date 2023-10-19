import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssueList } from '../hooks/useIssueList';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [selecterLabel, setSelecterLabel] = useState<string[] >([])

  const {issuesQuery}=useIssueList();

  const onlabelChanged=(labelName:string)=>{
    (selecterLabel.includes(labelName))?
    (setSelecterLabel(selecterLabel.filter((data=>labelName!==data))))
    :(setSelecterLabel([...selecterLabel,labelName]))

  }
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          (issuesQuery.isLoading)?(<LoadingIcon/>):( <IssueList issues={issuesQuery.data || []} />)
        }
       
      </div>
      
      <div className="col-4">
        <LabelPicker 
          selecterLabels={selecterLabel}
          onchange={(labelName)=>onlabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
