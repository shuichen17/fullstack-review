import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: null
    }
    this.search = this.search.bind(this);
    this.addList = this.addList.bind(this);
    

  }
  
 componentDidMount() {
   this.addList();
   };
 


addList() {
  axios.get('http://localhost:1128/repos')
  .then((res) => {
    this.setState({
      repos: res.data
    });
  })
}
  
  
  search(term) {
    console.log(`${term} was searched`);
    console.log(JSON.stringify({ term: `${term}` }))
    // TODO
    
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json',
      data: JSON.stringify({ term: `${term}` }),
      success: (data) => {
        console.log('callback done!');
        console.log(this);
        this.addList();
      },
      error: error => {
        console.log(error);
      }
    })
    //this.addList();
  }
 
  render() {
    console.log('repos in index.js: ', this.state)
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));