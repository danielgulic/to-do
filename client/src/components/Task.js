import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import ago from 's-ago';

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
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.demo}>
        <ListItem style={this.props.task.done ? { backgroundColor: '#b3ff66' } : {}}>
          <ListItemText
            primary={this.props.task.name}
            secondary={`Added ${ago(new Date(this.props.task.createdAt))}`}
          />
          <ListItemSecondaryAction>
            {!this.props.task.done &&
            <Tooltip title='Mark as done' aria-label='Mark as done'>
              <IconButton aria-label='Mark as done'>
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

export default withStyles(styles)(Task);