import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');


    useEffect (() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

const fetchCustomers = () => {

    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const deleteCustomer = (url) => {

    if(window.confirm('Are you sure?'))
        fetch(url, {method : 'DELETE'})
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMessage('Member Deleted');
                openSnackBar();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
    }

const addCustomer = (newCustomer) => {

    fetch('https://customerrest.herokuapp.com/api/customers',
    {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type' : 'application/json' }
    })
    .then(_ => fetchCustomers())
    .catch(err => console.error(err))
}

const updateCustomer = (url, updatedCustomer) => {

    fetch(url,
    {
        method: 'PUT',
        body: JSON.stringify(updatedCustomer),
        headers: { 'Content-type' : 'application/json' }
    })
    .then(_ => fetchCustomers())
    .catch(err => console.error(err))
}

const columns = [

    {
        headerName: '',
        field: "links.0.href",
        width: 80,
        cellRendererFramework: params =>
         <EditCustomer link={params.value} customer={params.data} updateCustomer={updateCustomer}/>
    },

    {
        headerName: '',
        field: "links.0.href",
        width: 80,
        cellRendererFramework: params =>
         <IconButton color="secondary" onClick={() => deleteCustomer(params.value)} >
         <DeleteIcon/>
         </IconButton>
    },

    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 150  },
    { field: 'city', sortable: true, filter: true, width: 150  }
]

return (
    <main>
        <h1>Customers</h1>
        <AddCustomer addCustomer={addCustomer}/>

        <div className="ag-theme-material" 
        style={{height: 570, width: '100%', margin: 'auto'}}>
            <AgGridReact
            rowData={customers}
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
    </main>

)
}

export default Customerlist;