import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { API_BASE } from '../config';
import { withSnackbar } from 'notistack';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }
});

class NewTask extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('task-name-input').value.trim();
    if (name.length === 0) return;
    const res = await fetch(API_BASE + '/tasks?userId=' + window.localStorage.getItem('id').trim(), {
      method: 'POST',
      body: JSON.stringify({
        name,
        done: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.error) return this.props.enqueueSnackbar(json.error, { autoHideDuration: 5000, variant: 'error' });
    this.props.pushNewTask(json.task);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.demo}>
        <ListItem>
          <ListItemText>
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete='off' style={{alignItems: 'baseline', display: 'flex', flexWrap: 'nowrap'}}>
              <TextField
                id='task-name-input'
                placeholder='Feed the dog'
                fullWidth
                value={this.state.name}
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <div style={{paddingLeft: '1vw', paddingRight: '1vw'}}></div>
              <Button style={{flexGrow: 0, width: '10%'}} type='submit' variant='contained' color='secondary' className={classes.button}>Add</Button>
            </form>
          </ListItemText>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(NewTask));