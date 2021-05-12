import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    useEffect (() => {
        fetchTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

const fetchTrainings = () => {

    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}

const deleteCustomer = (url) => {

    if(window.confirm('Are you sure?'))
        fetch(url, {method : 'DELETE'})
        .then(response => {
            if(response.ok) {
                fetchTrainings();
                setMessage('Training Deleted');
                openSnackBar();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }

const columns = [

    {
        headerName: '',
        field: 'links[0].href',
        width: 80,
        cellRendererFramework: params =>
         <IconButton color="secondary" onClick={() => deleteCustomer(params.value)} >
         <DeleteIcon/>
         </IconButton>
    },

    { field: 'activity', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    { field: 'customer', sortable: true, filter: true },
]

return (
    <div>
        <h1>Trainings</h1>
        <div className="ag-theme-material" 
        style={{height: 570, width: '100%', margin: 'auto'}}>
            <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            floatingFilter={true}
            suppressCellSelection={true}
        />
        </div>
        <Snackbar
            open={open}
            message={message}
            autoHideDuration={3000}
            onClose={closeSnackBar}/>
    </div>
    )
}

export default Traininglist;