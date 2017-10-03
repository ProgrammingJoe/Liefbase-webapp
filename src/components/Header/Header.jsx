import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showSignIn, showRegister, showCreateMap, showCreateMapItemTemplate } from '../../redux/ui/modal';
import { showMap, showSearch, showInfo, hideDrawer } from '../../redux/ui/drawer';
import {
  signOut,
  refresh as refreshSession
} from '../../redux/authorization';

import { Button, Dropdown, Icon } from 'semantic-ui-react';
import HeaderButton from './HeaderButton';

import css from './Header.css';

const text = {
  liefbase: 'liefbase',
  signIn: 'Log In',
  signOut: 'Log out',
  register: 'Sign up',
  createMap: 'New Map',
  createTemplate: 'New Template'
};

const mapStateToProps = state => {
  const userId = state.authorization.currentUserId;
  const currentUser = state.entities.user[userId];

  const mapId = state.ui.map.selectedMapId;
  const currentMap = state.entities.reliefMap[mapId];

  return {
    currentUser,
    currentMap,
    modal: state.ui.modal,
    drawer: state.ui.drawer.drawerType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClickSignIn: () => dispatch(showSignIn()),
  onClickRegister: () => dispatch(showRegister()),
  onClickCreateMap: () => dispatch(showCreateMap()),
  onClickCreateTemplate: () => dispatch(showCreateMapItemTemplate()),
  onClickSignOut: () => dispatch(signOut()),
  openMapSettingsDrawer: () => dispatch(showMap()),
  openSearchDrawer: () => dispatch(showSearch()),
  openInfoDrawer: () => dispatch(showInfo()),
  hideDrawer: () => dispatch(hideDrawer()),
  refreshSession: () => dispatch(refreshSession()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string,
    }),
    currentMap: PropTypes.object,

    // Buttons
    onClickSignIn: PropTypes.func,
    onClickRegister: PropTypes.func,
    onClickSignOut: PropTypes.func,
    onClickCreateMap: PropTypes.func,
    onClickCreateTemplate: PropTypes.func,

    // Drawers
    drawer: PropTypes.string,
    hideDrawer: PropTypes.func,
    openInfoDrawer: PropTypes.func,
    openMapSettingsDrawer: PropTypes.func,
    openSearchDrawer: PropTypes.func,

    refreshSession: PropTypes.func,
  };

  componentWillMount() {
    this.props.refreshSession();
  }

  renderLoggedIn = () =>
    <div className={css.headerSection}>
      <h4 className={css.email}>{ `Welcome ${this.props.currentUser.firstName}!`}</h4>
      <Button
        onClick={() => this.props.onClickCreateMap()}
        color="blue"
      ><Icon name="add" />{text.createMap}</Button>
      { this.props.currentMap &&
          <Button
            onClick={() => this.props.onClickCreateTemplate()}
            color="green"
          ><Icon name="add" />{text.createTemplate}</Button>
      }
      <div className={css.dropdownContainer}>
        <Dropdown pointing="top right" icon={<Icon name="sidebar" size="big" />}>
          <Dropdown.Menu>
            <Dropdown.Item text='Settings' />
            <Dropdown.Divider />
            <Dropdown.Item text='Sign Out' onClick={this.props.onClickSignOut} />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>

  renderLoggedOut = () =>
    <div>
      <Button onClick={() => this.props.onClickSignIn()}>
        { text.signIn }
      </Button>
      <Button onClick={() => this.props.onClickRegister()} color="blue">
        { text.register }
      </Button>
    </div>

  render = () =>
    <div className={css.header}>
      <div className={css.headerSection}>
        <HeaderButton
          icon="search"
          onClick={() => this.props.drawer === 'SEARCH' ? this.props.hideDrawer() : this.props.openSearchDrawer()}
        />
        <HeaderButton
          icon="map outline"
          onClick={() => this.props.drawer === 'MAP' ? this.props.hideDrawer() : this.props.openMapSettingsDrawer()}
        />
        <HeaderButton
          icon="info circle"
          onClick={() => this.props.drawer === 'INFO' ? this.props.hideDrawer() : this.props.openInfoDrawer()}
        />
        <h1 style={{margin: '15px'}}>{ text.liefbase }</h1>
      </div>
      { this.props.currentMap && <h3 style={{ margin: '0' }}>{this.props.currentMap.name}</h3> }
      { this.props.currentUser ? this.renderLoggedIn() : this.renderLoggedOut() }
    </div>
}
