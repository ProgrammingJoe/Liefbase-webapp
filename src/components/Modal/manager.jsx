import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { hideModal } from '../../redux/ui/modal';

import SignInModal from './SignIn';
import RegisterModal from './Register';
import ReliefMapModal from './ReliefMap';
import MapItemModal from './MapItem';
import MapItemTemplateModal from './MapItemTemplate';

const mapStateToProps = state => ({
  modalType: state.ui.modal.modalType,
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ModalManager extends Component {
  static propTypes = {
    modalType: PropTypes.string,
  };

  render = () => {
    switch(this.props.modalType){
    case 'SIGN_IN':
      return <SignInModal title="Sign In" {...this.props} />;

    case 'REGISTER':
      return <RegisterModal title="Register" {...this.props} />;

    case 'CREATE_MAP':
      return <ReliefMapModal title="Create Map" {...this.props} />;
    case 'UPDATE_MAP':
      return <ReliefMapModal title="Update Map" {...this.props} />;

    case 'CREATE_MAP_ITEM':
      return <MapItemModal title="Create Resource" {...this.props} />;
    case 'UPDATE_MAP_ITEM':
      return <MapItemModal title="Update Resource" {...this.props} />;

    case 'CREATE_MAP_ITEM_TEMPLATE':
      return <MapItemTemplateModal title="Create Template" {...this.props} />;
    case 'UPDATE_MAP_ITEM_TEMPLATE':
      return <MapItemTemplateModal title="Update Template" {...this.props} />;
    }

    return null;
  }
}
