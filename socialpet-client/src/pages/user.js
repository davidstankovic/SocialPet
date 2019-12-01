import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Status from '../components/status/Status';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';

import StatusSkeleton from '../util/StatusSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';


import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';


class user extends Component {
    state = {
        profile: null,
        statusIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const statusId = this.props.match.params.statusId;

        if(statusId) this.setState({statusIdParam: statusId});


        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const {statuses, loading} = this.props.data;
        const { statusIdParam } = this.state;
        const statusesMarkup = loading ? (
            <StatusSkeleton/>
        ) : statuses === null ? (
            <p>No statuses from this user</p>
        ) : !statusIdParam ? (
            statuses.map((status) => <Status key={status.statusId} status={status}/>)
        ) : (
            statuses.map(status => {
                if(status.statusId !== statusIdParam)
                    return <Status key={status.statusId} status={status}/>
                  else return <Status key={status.statusId} status={status} openDialog/>
            })
        )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xd={12}>
                    {statusesMarkup}
                </Grid>
                <Grid item sm={4} xd={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (
                        <StaticProfile profile={this.state.profile}/>
                        )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
    data: state.data
  });

export default connect(
    mapStateToProps,
    { getUserData }
  )(user);
