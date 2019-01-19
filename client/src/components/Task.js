import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ago from 's-ago';
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
});

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: this.props.task.done,
      name: this.props.task.name
    }

    this.markAsDone = this.markAsDone.bind(this);
  }

  async markAsDone() {
    if (this.state.done === true) return;
    const res = await fetch(API_BASE + '/tasks/' + this.props.task.id + '?userId=' + window.localStorage.getItem('id').trim(), {
      method: 'PATCH',
      body: JSON.stringify({
        done: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.error) return this.props.enqueueSnackbar(json.error, { autoHideDuration: 5000, variant: 'error' });
    this.setState({ done: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.demo}>
        <ListItem style={this.state.done ? { backgroundColor: '#b3ff66' } : {}}>
          <ListItemText
            primary={<Typography noWrap style={{fontSize: 17, WebkitTextSizeAdjust: 'none', MozTextSizeAdjust: 'none', msTextSizeAdjust: 'none'}}>{this.state.name}</Typography>}
            secondary={`Added ${ago(new Date(this.props.task.createdAt))}`}
          />
          <ListItemSecondaryAction>
            {!this.state.done &&
            <Tooltip title='Mark as done' aria-label='Mark as done'>
              <IconButton aria-label='Mark as done' onClick={this.markAsDone}>
                <DoneIcon />
              </IconButton>
            </Tooltip>}
            <Tooltip title='Delete' aria-label='Delete'>
              <IconButton aria-label='Delete'>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
          </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(Task));