import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Color, Issues, State } from '../interfaces/issues';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueInfo, getIssuesCommetns } from '../hooks/UseIssue';
import { timeSince } from '../../helper/time-since';

interface props{
    issue:Issues
}

export const IssueItem:FC <props> = ({issue}) => {

    const navigate=useNavigate();
    const queryClient=useQueryClient();//informarcion  del query 
    /**
     * tiene toda la informacion del query
     */
    const PrefetchData=()=>{
      queryClient.prefetchQuery(
        ['issue',issue.number],
        ()=>getIssueInfo(issue.number)
      );//misma condiciones para hacer una peticion de query
      queryClient.prefetchQuery(
        ['issue',issue.number,"comments"],
        ()=>getIssuesCommetns(issue.number)
      );//misma condiciones para hacer una peticion de query
    }
   
    const PresetData=()=>{
        queryClient.setQueryData(
            ['issue',issue.number],
            issue,
            {
                updatedAt:new Date().getTime()+100000
            }
          );
    }

    return (
        <div className="card mb-2 issue"
            onClick={()=>navigate(`/issues/issue/${issue.number}`)}
            onMouseEnter={()=>PresetData()}
        
        >
            <div className="card-body d-flex align-items-center">
                  {
                    issue.state===State.Open
                    ?<FiInfo size={30} color="red" />
                  : <FiCheckCircle size={30} color="green" /> 
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">#{issue.number} opened  {timeSince(issue.created_at)} ago by <span className='fw-bold'>{issue.user.login}</span></span>
                    <div>
                      {
                        issue.labels.map(label=>(
                          <span
                          key={label.name}
                          className='badge rounded-pill m-1'
                          style={{backgroundColor:`#${label.color}`,color:'black'}}
                          >
                            {label.name}
                          </span>
                        ))
                      }
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>2</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
