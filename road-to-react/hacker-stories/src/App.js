import './App.css';
import React from 'react';

function App() {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    }
  ];

  const handleSearchCallback = (event) => {
    console.log(event.target.value);
  }

  return (
    <div>
      <h1>My Stories</h1>
      <Search onSearch={handleSearchCallback}/>
      <hr/>
      <List list={stories}/>
    </div>
  );
}

const Search = (props) => {
  /* 
    The first value (searchTerm) represents the current
    state; the second value is a function to update this state (setSearchTerm). 
    I will sometimes refer to this function as state updater function. 
  */
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    
    //Value passed to callback props funtion
    props.onSearch(event);
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input type="text" onChange={handleChange} id="search"/>
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}
const List = (props) => {
  return props.list.map((item) => {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    )
  })
}
export default App;
