import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import Loading from '../components/Loading';
import RecordOfMeetingCard from '../components/RecordOfMeetingCard';
import RecordOfMeetingFactory from '../factories/RecordOfMeetingFactory';

class RecordOfMeeting extends PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading: true,
            recordsOfMeeting: [],
            recordOfMeeting: null
        }
    }

    async fetchRecordsOfMeeting(inYear) {
        let { year } = queryString.parse(this.props.location.search);
        year = inYear || year;
        const recordsOfMeeting = await RecordOfMeetingFactory.query({year: year});
        const recordOfMeeting = recordsOfMeeting.length > 0 ? 
            await RecordOfMeetingFactory.get(recordsOfMeeting[0].Id) :
            null;
        this.setState({
            loading: false,
            recordsOfMeeting: recordsOfMeeting,
            recordOfMeeting: recordOfMeeting
        });
    }

    componentDidMount() {
        this.fetchRecordsOfMeeting();
    }

    componentWillReceiveProps(nextProps) {
        const { year: prevYear } = queryString.parse(this.props.location.search);
        const { year: nextYear } = queryString.parse(nextProps.location.search);
        if(prevYear !== nextYear)
            this.fetchRecordsOfMeeting(nextYear);
    }

    handleChange(ev, idx, val) {
        this
            .props
            .history
            .push(`/recordOfMeeting?${queryString.stringify({year: val})}`);
    }

    render() {
        const { year } = queryString.parse(this.props.location.search);
        if(!year)
            return (
                <Redirect to={{pathname:'/recordOfMeeting', search: queryString.stringify({year: new Date().getFullYear()})}} />
            );
        if (this.state.loading)
            return (<Loading/>);
        return (
            <Wrapper>
                <RecordOfMeetingCard RecordOfMeeting={this.state.recordOfMeeting}/>
            </Wrapper>
        );
        /*
        <Toolbar style={{ padding: '30px' }}>
            <ToolbarGroup >
                <YearDropDownMenu maxHeight={300} value={Number(year)} onChange={this.handleChange} />
            </ToolbarGroup>
        </Toolbar>
        <RecordOfMeetingTable recordsOfMeeting={this.state.recordsOfMeeting} />
        */
    }

}

export default withRouter(RecordOfMeeting);

const Wrapper = styled.div`
    margin: 2% 15%;

    @media (max-width: 599px) {
        margin: 2% 10%;
    }
`