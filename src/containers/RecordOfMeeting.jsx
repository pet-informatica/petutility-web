import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import YearDropDownMenu from '../components/YearDropDownMenu';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import Constants from '../lib/Constants';
import RecordOfMeetingTable from '../components/RecordOfMeetingTable';

class RecordOfMeeting extends PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading: false,
            recordsOfMeeting: []
        }
        this.fetchRecordsOfMeeting = this.fetchRecordsOfMeeting.bind(this);
    }

    async fetchRecordsOfMeeting(inYear) {
        this.setState({loading: true});
        try {
            var { year } = queryString.parse(this.props.location.search);
            year = inYear || year;
            const response = await fetch(`${Constants.apiURL}/recordOfMeeting?${queryString.stringify({year: year})}`, {
                credentials: 'include'
            });
            const recordsOfMeeting = await response.json();
            this.setState({
                loading: false,
                recordsOfMeeting: recordsOfMeeting
            });
        } catch(err) {
            console.error(err);
        }
    }

    async componentDidMount() {
        await this.fetchRecordsOfMeeting();
    }

    async componentWillReceiveProps(nextProps) {
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
        return (
            <Wrapper>
                <H2>Reuniões</H2>
                <Toolbar style={{padding: '30px'}}>
                    <ToolbarGroup >
                        <YearDropDownMenu maxHeight={300} value={Number(year)} onChange={this.handleChange} />
                    </ToolbarGroup>
                </Toolbar>
                <RecordOfMeetingTable recordsOfMeeting={this.state.recordsOfMeeting} />
            </Wrapper>
        );
    }

}

export default withRouter(RecordOfMeeting);

const Wrapper = styled.div`
    margin: 0 15%;

    @media (max-width: 599px) {
        margin: 0 10%;
    }
`

const H2 = styled.h2`
    font-family: Roboto, sans-serif;
`