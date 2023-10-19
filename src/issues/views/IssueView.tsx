import { Link, Navigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { UseIssue } from '../hooks/UseIssue';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const IssueView = () => {

  const params=useParams();
  const {id=0}=params;
  const {issueQuery,CommentsQuery}=UseIssue(+id);

  if(issueQuery.isLoading){
    return(
      <LoadingIcon/>
    )
  }
  if(!issueQuery.data){
    return(<Navigate  to="./issues/list"/>)
  }

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={ issueQuery.data! } />
        {
          CommentsQuery.data?.map(data=>(

             <IssueComment issue={ data } key={data.id} />
       
          ))
        }
      {/* Comentario de otros */}
    </div>
  )
}
function useIssue(id: string | number) {
  throw new Error('Function not implemented.');
}

