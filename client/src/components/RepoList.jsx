import React from 'react';
import RepoItem from './repoItem.jsx';
var RepoList = (props) => {
   

     return(
 
   <div>
     <h4> Repo List Component </h4>
     <ul className="repoList">
   {props.repos? props.repos.map((repo, index) => <RepoItem key={index} repo={repo} />) : <p>Loading...</p>}
     </ul>
   </div>
     )
   }
    



export default RepoList;