import React, { useState, useEffect, Component } from 'react'
import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Button
} from '@material-ui/core'
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "../../../constants/utility"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import useIndustry from 'app/hooks/admin/industry/useIndustry'
import history from 'history.js'
import { connect } from 'react-redux';
import {getAlert} from 'app/redux/actions/common/AlertActions'
import { useSelector } from 'react-redux'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))
const AlertTable = ({ dispatch }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
     const [page, setPage] = React.useState(0)
     const [industries, setIndustries] = useState([]);
     const {alert} = useSelector(state=>state);
     const [open,setState] = React.useState(false)
     const [industryId,setIndustry] = React.useState()

    useEffect(() => {
            const params={type:'GET_ALERT'};
            dispatch(getAlert(params));

        }, []);
    const classes = useStyles()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    // const handleDelete = indus => {
    //     confirm({ description: `This will permanently delete ${indus.name}.` })
    //       .then(() => dispatch(deleteIndustry(indus.id)))
    //       .catch(() => console.log("Deletion cancelled."));
    //   };
    
      const  handleClose = () => {
        setState(false);
      };
    

    return (
        <div className="w-full overflow-auto">
           
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">High Price</TableCell>
                        <TableCell className="px-0">Low Price</TableCell>
                        <TableCell className="px-0">IP</TableCell>
                        <TableCell className="px-0">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {alert.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        ).map((indus, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {indus.highPrice}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {indus.lowPrice}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {indus.ip}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {indus.status}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={alert.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
            
}

export default connect()(AlertTable);
