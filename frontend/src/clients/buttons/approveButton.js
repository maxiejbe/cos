
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { clientApprove as clientApproveAction, clientReject as clientRejectAction } from '../actions/clientActions';

class ApproveButton extends Component {
  handleApprove = () => {
    const {clientApprove, record} = this.props;
    clientApprove(record.id, record);
  }

  handleReject = () => {
    const {clientReject, record} = this.props;
    clientReject(record.id, record);
  }

  render() {
    const {record} = this.props;
    return (
      <span>
          <IconButton onClick={this.handleApprove} disabled={record.status === 'APROBADO'}><ThumbUp color="#00bcd4" /></IconButton>
          <IconButton onClick={this.handleReject} disabled={record.status === 'RECHAZADO'}><ThumbDown color="#00bcd4" /></IconButton>
      </span>
      );
  }
}

ApproveButton.propTypes = {
  record: PropTypes.object,
  clientApprove: PropTypes.func,
  clientReject: PropTypes.func,
};

export default connect(null, {
  clientApprove: clientApproveAction,
  clientReject: clientRejectAction,
})(ApproveButton);