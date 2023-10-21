import { FC } from 'react';
import { Issues, State } from '../interfaces/issues';
import { IssueItem } from './IssueItem';

interface props{
    issues:Issues[],
    state?:State,
    onSteateChanged:(state?:State)=>void,
}

export const IssueList: FC <props> = ({issues,state,onSteateChanged}) => {
    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a 
                        className={`nav-link ${!state? 'active':''}`}
                        onClick={()=>onSteateChanged()}
                        >All</a>
                    </li>
                    <li className="nav-item">
                        <a 
                        className={`nav-link ${state===State.Open?'active':''}`}
                        onClick={()=>onSteateChanged(State.Open)}
                        >Open</a>
                    </li>
                    <li className="nav-item">
                        <a 
                        className={`nav-link ${state===State.Clossed?'active':''}`}
                        onClick={()=>onSteateChanged(State.Clossed)}
                        >Closed</a>
                    </li>
                </ul>
            </div>
            <div className="card-body text-dark">
                {
                    issues.map( issue => (
                        <IssueItem key={issue.id} issue={issue}/>
                    ))
                
                }                
            </div>
        </div>
    )
}
