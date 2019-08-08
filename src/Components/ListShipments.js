import React ,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { getThemeProps } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { async } from 'q';
import { func } from 'prop-types';

export const ListShipments = (props)=>{

  const listOfshipments = props.shipments;
   // console.log(listOfshipments);
    const [state, setState] = React.useState({
        columns: [
          { title: 'Id', field: 'id', editable: 'never' },
          { title: 'Name', field: 'name' },
          { title: 'Type', field: 'type', editable: 'never' },
          { title: 'Origin', field: 'origin', editable: 'never' },
          { title: 'Destination', field: 'destination', editable: 'never' },
          { title: 'Status', field: 'status', editable: 'never' },
        ],
         data:props.shipments
      });

      const [data23,setData] = useState(props.shipments); 
      useEffect(() => {
        setData(props.shipments);
       }, [props])

    
      return (
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Shipments Details"
          columns={state.columns}
          data ={data23}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                fetch('http://localhost:3000/shipments/', {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',                                                              
                  body: JSON.stringify( newData )                                        
                })
                
                const data = [...data23];
                data.push(newData);
                setData(data);
                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
               
                fetch('http://localhost:3000/shipments/' + newData.id, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'PUT',                                                              
                  body: JSON.stringify( newData )                                        
                })
                const data = [...data23];
                data[data.indexOf(oldData)] = newData;
                setData(data);
                resolve();
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                fetch('http://localhost:3000/shipments/'+oldData.id, {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'DELETE',                                                              
                                                      
                })
                const data = [...data23];
                data.splice(data.indexOf(oldData), 1);
                setData(data);
                resolve();

              }),
          }}
        />
        </div>
      );
    
}