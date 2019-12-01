import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Status from '../components/status/Status';
import Profile from '../components/profile/Profile';
import StatusSkeleton from '../util/StatusSkeleton';


import { connect } from 'react-redux';
import { getStatuses } from '../redux/actions/dataActions';


class home extends Component {
    componentDidMount(){
        this.props.getStatuses()
    }
    render() {
        const { statuses, loading } = this.props.data;
        let recentStatusesMarkup = !loading ? (
        statuses.map(status => <Status key={status.statusId} status={status}/>)
        ) : (
            <StatusSkeleton/>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xd={12}>
                    {recentStatusesMarkup}
                </Grid>
                <Grid item sm={4} xd={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getStatuses: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getStatuses })(home);
