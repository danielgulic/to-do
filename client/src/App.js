import React, { Component } from 'react';
import TaskList from './components/TaskList';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className='container' style={{ textAlign: 'center' }}>
        <Typography variant='h4'>My Tasks</Typography><br />
        <TaskList />
      </div>
    );
  }
}

export default App;
