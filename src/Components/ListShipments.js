import React from 'react';
import MaterialTable from 'material-table';
import { getThemeProps } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';

export const ListShipments = (props)=>{
    const [state, setState] = React.useState({
        columns: [
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'Type', field: 'type' },
          { title: 'Origin', field: 'origin'},
          { title: 'Destination', field: 'destination' },
          { title: 'Status', field: 'status' },


        ],
        data:props.shipments
        
      });

      return (
        <div style={{ maxWidth: "100%" }}>

        <MaterialTable
          title="Shipments Details"
          columns={state.columns}
          data={query =>
            new Promise((resolve, reject) => {
                // prepare your data and then call resolve like this:
                resolve({
                    data: props.shipments, // your data array
                    page : 1,// current page number
                    totalCount:10 // total page number
                });
            })
        }
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 600);
              }),
          }}
        />
        <TablePagination/>
        </div>
      );
    
}