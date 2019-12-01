import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeStatus, unlikeStatus } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedStatus = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.statusId === this.props.statusId))
            return true;
            else return false;
    };
    likeStatus = () => {
        this.props.likeStatus(this.props.statusId)
    }
    unlikeStatus = () => {
        this.props.unlikeStatus(this.props.statusId)
    };
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
            <MyButton tip="Like">
                    <FavoriteBorder color="primary"/>
            </MyButton>
            </Link>
        ) : this.likedStatus() ? (
                <MyButton tip="Undo like" onClick={this.unlikeStatus}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeStatus}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            );
        return likeButton;

    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    statusId: PropTypes.string.isRequired,
    likeStatus: PropTypes.func.isRequired,
    unlikeStatus: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeStatus,
    unlikeStatus
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
