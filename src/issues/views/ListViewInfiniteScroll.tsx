import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssueList } from '../hooks/useIssueList';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issues';
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';



export const ListViewInfiniteScroll = () => {

  const [selecterLabel, setSelecterLabel] = useState<string[] >([])
  const [state, setState] = useState<State>()//control de estado para los tickest 
  const {issuesQuery}=useIssuesInfinite({state,labels:selecterLabel});

  const onlabelChanged=(labelName:string)=>{
    (selecterLabel.includes(labelName))
    ?(setSelecterLabel(selecterLabel.filter((data=>labelName!==data))))
    :(setSelecterLabel([...selecterLabel,labelName]))

  }
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          (issuesQuery.isLoading)?(<LoadingIcon/>):( <IssueList issues={issuesQuery.data?.pages.flat() || []}  state={state} onSteateChanged={(newState)=>setState(newState)} />)
        }

        <button 
            className='btn btn-outline-primary' 
            onClick={()=>issuesQuery.fetchNextPage}
            disabled={!issuesQuery.hasNextPage}//si no tiene una siguiente pagina
            >Next
        </button>
      
      </div >

     
      <div className="col-4">
        <LabelPicker 
          selecterLabels={selecterLabel}
          onchange={(labelName)=>onlabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
