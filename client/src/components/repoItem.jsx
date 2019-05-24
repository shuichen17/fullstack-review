import React from 'react';
var RepoItem = (props) => {
    
    const style = {
        paddingLeft: '20px',
        paddingRight: '20px',
    }
    return(
<li>
        <span><a href={props.repo.repoUrl}>{props.repo.repoName}</a></span><span style={style}>watchers: {props.repo.watchers} </span>
        </li>
    )
    

}
export default RepoItem;