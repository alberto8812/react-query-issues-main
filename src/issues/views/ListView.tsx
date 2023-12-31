import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssueList } from '../hooks/useIssueList';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces/issues';


export const ListView = () => {

  const [selecterLabel, setSelecterLabel] = useState<string[] >([])
  const [state, setState] = useState<State>()//control de estado para los tickest 
  const {issuesQuery,page,nextPage,PrevPage}=useIssueList({state,labels:selecterLabel});

  const onlabelChanged=(labelName:string)=>{
    (selecterLabel.includes(labelName))
    ?(setSelecterLabel(selecterLabel.filter((data=>labelName!==data))))
    :(setSelecterLabel([...selecterLabel,labelName]))

  }
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          (issuesQuery.isLoading)?(<LoadingIcon/>):( <IssueList issues={issuesQuery.data || []}  state={state} onSteateChanged={(newState)=>setState(newState)} />)
        }
      <div className='d-flex mt-2 justify-content-between align-items-center'>
        <button 
        className='btn btn-outline-primary' 
        onClick={PrevPage}
        disabled={issuesQuery.isFetching}//si esta cargando la informacion es el is fetching
        >prev
        </button>
        <span>{issuesQuery.isFetching?'Loading...':page}</span>
        <button 
        className='btn btn-outline-primary' 
        onClick={nextPage}
        disabled={issuesQuery.isFetching}//si esta cargando la informacion es el is fetching
        >Next
        </button>
      </div>
      
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
