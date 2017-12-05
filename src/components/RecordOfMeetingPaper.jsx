import React, { Component } from 'react';
import styled from 'styled-components';
import { lightGreen300, red300, orange900 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';

import Loading from './Loading';
import AgendaPointCard from './AgendaPointCard';
import PETianoService from '../services/PETianoService';
import AgendaPointFactory from '../factories/AgendaPointFactory';

class RecordOfMeetingCard extends Component {

    constructor(props) {
        super(props);
        const RecordOfMeeting = this.propsToObject(props);
        this.state = {
            loading: true,
            RecordOfMeeting: RecordOfMeeting,
            isEditing: (RecordOfMeeting.Status === 1),
            PETianos: null
        };
        this.editAgendaPoint = this.editAgendaPoint.bind(this);
        this.deleteAgendaPoint = this.deleteAgendaPoint.bind(this);
    }

    propsToObject = (props) =>{
        return {
            Status: props.RecordOfMeeting.Status,
            Date: new Date(props.RecordOfMeeting.Date),
            AteiroId: props.RecordOfMeeting.AteiroId,
            PresidentId: props.RecordOfMeeting.PresidentId,
            AgendaPoints: {
                Fixed: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 2),
                Pending: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 3),
                NewInside: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 4),
                NewOutside: props.RecordOfMeeting.AgendaPoints.filter(({ Status }) => Status === 1)
            },
            AbsentsOrLates: {
                Absents: props.RecordOfMeeting.AbsentsOrLates.filter(({ Type }) => Type === 1),
                Lates: props.RecordOfMeeting.AbsentsOrLates.filter(({ Type }) => Type === 2)
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const RecordOfMeeting = this.propsToObject(nextProps);
        this.setState({
            RecordOfMeeting: RecordOfMeeting,
            isEditing: (RecordOfMeeting.Status === 1)
        });
    }

    async componentDidMount() {
        let PETianos = {};
        let data = await PETianoService.getAll();
        await data.forEach(p => PETianos[p.Id] = p);
        this.setState({
            loading: false,
            PETianos: PETianos
        });
    }

    async editAgendaPoint(agendaPoint) {
        const data = await AgendaPointFactory.update(agendaPoint);
        let points = this.state.RecordOfMeeting.AgendaPoints;
        let check = false;
        for (const key in points) {
            if (points.hasOwnProperty(key)) {
                for (let i=0;i<points[key].length;++i) {
                    if (points[key][i].Id === agendaPoint.Id) {
                        points[key][i] = data;
                        check = true;
                        break;
                    }
                }
                if (check)
                    break;
            }
        }
        let rec = this.state.RecordOfMeeting;
        rec.AgendaPoints = points;
        this.setState({
            RecordOfMeeting: rec
        });
    }

    async deleteAgendaPoint(agendaPoint) {
        const ok = await AgendaPointFactory.delete(agendaPoint.Id);
        if (!ok) {
            // trow error
            return;
        }
        let points = this.state.RecordOfMeeting.AgendaPoints;
        let check = false;
        let k = '';
        for (const key in points) {
            if (points.hasOwnProperty(key)) {
                for (let i = 0; i < points[key].length; ++i) {
                    if (points[key][i].Id === agendaPoint.Id) {
                        k = key;
                        check = true;
                        break;
                    }
                }
                if (check)
                    break;
            }
        }
        if (!check) {
            // agenda point not found
            return;
        }
        let rec = this.state.RecordOfMeeting;
        rec = JSON.parse(JSON.stringify(rec)); // fast js clone
        rec.AgendaPoints[k] = await rec.AgendaPoints[k].filter((a) => a.Id !== agendaPoint.Id);
        this.setState({
            RecordOfMeeting: rec
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading/>);
        let President = this.state.PETianos[this.state.RecordOfMeeting.PresidentId];
        let Ateiro = this.state.PETianos[this.state.RecordOfMeeting.AteiroId];
        return (
            <Paper zDepth={2}>
                <CardTitle title={"Reunião "+this.state.RecordOfMeeting.Date.toLocaleString()} />
                <PresidentAndAteiroCard>
                    <CardHeader
                        title="Presidente"
                        subtitle={President.Name}
                        avatar={President.Photo}
                    />
                    <Divider/>
                    <CardHeader
                        title="Ateiro"
                        subtitle={Ateiro.Name}
                        avatar={Ateiro.Photo}
                    />
                </PresidentAndAteiroCard>
                <AbsentsOrLatesCard>
                    <CardHeader titleColor="white" title="Ausentes"/>
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Absents.map((a, i) =>{
                            a.PETiano = this.state.PETianos[a.PETianoId];
                            return (
                                <MyChip 
                                    key={i}
                                    backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                >
                                    <Avatar src={a.PETiano.Photo} />
                                    {a.PETiano.Name}
                                </MyChip>
                            )}
                        )}
                    </AbsentsOrLatesList>
                    <CardHeader titleColor="white" title="Atrasados"/>
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Lates.map((a, i) => {
                            a.PETiano = this.state.PETianos[a.PETianoId];
                            return (
                                <MyChip
                                    key={i}
                                    backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                >
                                    <Avatar src={a.PETiano.Photo} />
                                    {a.PETiano.Name}
                                </MyChip>
                            )
                        }
                        )}
                    </AbsentsOrLatesList>
                </AbsentsOrLatesCard>
                {Object.entries(this.state.RecordOfMeeting.AgendaPoints).map((val, i) => {
                    let title = "";
                    switch (val[0]) {
                        case "Fixed":
                            title = "Fixos";
                            break;
                        case "Pending":
                            title = "Pendentes";
                            break;
                        case "NewInside":
                            title = "Novos";
                            break;
                        default:
                    }
                    return (
                        <div key={i}>
                            <CardTitle title={title} />
                            <AgendaPointCards>
                                {this.state.RecordOfMeeting.AgendaPoints[val[0]].map((a, j) =>
                                    <AgendaPointCard
                                        key={a.Id}
                                        AgendaPoint={a}
                                        IsOpen={this.state.isEditing} 
                                        handleEdit={this.editAgendaPoint}
                                        handleDelete={this.deleteAgendaPoint}
                                    />
                                )}
                            </AgendaPointCards>
                        </div>
                    );
                })}
                <CardActions>
                    <RaisedButton
                        label="Baixar"
                        primary={true}
                        icon={<FileDownloadIcon/>}
                    />
                </CardActions>
            </Paper>
        );
    }

}

export default RecordOfMeetingCard;

const PresidentAndAteiroCard = styled(Card)`
    margin: 0 2%;
    border: 1px solid #e0e0e0;
`;
const AbsentsOrLatesCard = styled(Card)`
    margin: 3% 2%;
    background-color: ${orange900}!important;
`;
const AbsentsOrLatesList = styled.div`
    display: flex;
    flexWrap: wrap;
`;
const MyChip = styled(Chip)`
    margin: 15px 5px!important;
`;
const AgendaPointCards = styled.div`
    margin: 0 2%;
`;