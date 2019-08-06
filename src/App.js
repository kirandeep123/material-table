import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {ListShipments} from './Components/ListShipments';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      shipments:[],
      searchById:'',
    }
    this.searchShipmentId = this.searchShipmentId.bind(this);
  }
  componentDidMount(){
    fetch('http://localhost:3000/shipments')
    .then(response =>response.json())
    .then(result => {
        this.setState({shipments:result})
      })
  }
  searchShipmentId(input){
    this.setState({searchById:input})
  }
  render(){
    let filtered = this.state.shipments;
   // filtered = filtered.filter(item =>item.id.toLowerCase().includes(this.state.searchById.toLowerCase()))
    return (
      <Container maxWidth="xm">
        <Box my={6}>
       <ListShipments shipments ={filtered} columns ={this.state.columns} />
      
        </Box>
      </Container>
    );
  }
  
}

export default App;