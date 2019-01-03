import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Task from './Task';
import NewTask from './NewTask';
import randomstring from 'randomstring';
import { API_BASE } from '../';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

class TaskList extends Component {
  constructor() {
    super();

    this.state = {
      showFinishedTasks: false,
      tasks: []
    }

    this.pushNewTask = this.pushNewTask.bind(this);
  }

  componentDidMount = async () => {
    let id;
    if (!window.localStorage.getItem('id')) id = randomstring.generate(36)
    else id = window.localStorage.getItem('id').trim();
    window.localStorage.setItem('id', id);

    const res = await fetch(API_BASE + '/tasks?id=' + id);
    const resTasks = (await res.json()).tasks;
    const sortedTasks = resTasks.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
    this.setState({ tasks: sortedTasks });
    console.log(sortedTasks);
  }

  pushNewTask = (task) => {
    console.log(this.state.tasks);
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }));
    console.log(this.state.tasks);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <List>
            {this.state.tasks.length < 1 && <Typography variant='h6' style={{color: 'red'}}>No tasks found</Typography>}
            {this.state.tasks.map(t => <Task key={t.id} task={t} />)}
            <NewTask pushNewTask={this.pushNewTask} />
          </List>
        </CardContent>
        <CardActions>
          <Button variant='contained' color='primary' className={classes.button}>
            Hide finished tasks
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(TaskList);