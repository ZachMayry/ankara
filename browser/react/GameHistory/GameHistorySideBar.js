import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import GameHistoryComponent from './GameHistoryComponent';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import { getGameId, getPlayerMap } from '../../redux/reducers/game-reducer';
import { getUserId } from '../../redux/reducers/user-reducer';

class GameHistorySideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  };

  render() {
    const { userId, playerMap, gameId, historyRef } = this.props;
    return (
      <div>
        <RaisedButton
          label="Game Log"
          secondary={ true }
          onTouchTap={this.handleToggle} />
        <Drawer
          width={350}
          openSecondary={true}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <GameHistoryComponent historyRef={historyRef} userId={userId} playerMap={playerMap} />
        </Drawer>
      </div>
    );
  }
}

const fbHistoryContainer = firebaseConnect(({ gameId }) => {
  return [`gameLog/${gameId}`];
})(GameHistorySideBar);

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  playerMap: getPlayerMap(state),
  historyRef: dataToJS(state.firebase, `gameLog/${state.game.id}`)
})

export default connect(mapStateToProps)(fbHistoryContainer)
