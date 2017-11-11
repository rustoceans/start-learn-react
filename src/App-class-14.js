import React, { Component} from 'react';
import PropTypes from 'prop-types';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentWillMount(){
    let url = 'https://swapi.co/api/people/?format=json';
    fetch(url)
      .then(response => response.json())
      .then(({results: items}) => this.setState({
        items
      }))
  }


  filter(e) {
    this.setState({
      filter: e.target.value
    });
  }

  render() {
    let items = this.state.items;
    if (this.state.filter) {
      items = items.filter(item =>
        item.name.toLowerCase()
          .includes(this.state.filter.toLowerCase())
      )
    }
    return (
      <div>
        <input type="text" onChange={this.filter.bind(this)}/>
        {items.map(item =>
          <Person key={item.name} person={item}></Person>
        )}
      </div>
      );
  }
}

const Person = (props) => <h4>{props.person.name}</h4>

export default App;
