import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { API_BASE } from '../';

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
    const res = await fetch(API_BASE + '/tasks?id=' + window.localStorage.getItem('id').trim(), {
      method: 'POST',
      body: JSON.stringify({
        name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.error)
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

export default withStyles(styles)(NewTask);