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
import {getIndustry, deleteIndustry} from 'app/redux/actions/admin/industry/IndustryActions'
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
const IndustryTable = ({ dispatch }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
     const [page, setPage] = React.useState(0)
     const [industries, setIndustries] = useState([]);
     const {industry} = useSelector(state=>state);
     const [open,setState] = React.useState(false)
     const [industryId,setIndustry] = React.useState()

    useEffect(() => {
            const params={type:'GET_INDUSTRY'};
            dispatch(getIndustry(params));

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
    
      const  handleClickOpen = (id) => {
        setState(true);
        setIndustry(id);
      };
    
      const  handleClose = () => {
        setState(false);
      };
    
      const handleAgree = () => {
        console.log("I agree!",industryId);
        dispatch(deleteIndustry(industryId));
        handleClose();
        const params={type:'GET_INDUSTRY'};
        dispatch(getIndustry(params));
      };
      const handleDisagree = () => {
        console.log("I do not agree.");
        handleClose();
      };

    return (
        <div className="w-full overflow-auto">
            <div className="w-full overflow-auto">
            <Link to="/industry/add">
            <Button variant="contained" color="primary" className={classes.button}><Icon>add</Icon> Add Industry</Button>
            </Link>
            </div>
           
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Name</TableCell>
                        <TableCell className="px-0">Status</TableCell>
                        <TableCell className="px-0">Created Date</TableCell>
                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {industry.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        ).map((indus, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {indus.name}
                                </TableCell>
                                <TableCell className="px-0 capitalize">
                                    {indus.status}
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                >
                                    {indus.createdAt}
                                </TableCell>
                                <TableCell className="px-0">
                                    <Link to="/industry/edit">
                                    <IconButton>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                    </Link>
                                    <IconButton onClick={() => handleClickOpen(indus.id)}>
                                        <Icon color="error">close</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={industry.length}
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )
            
}

export default connect()(IndustryTable);
