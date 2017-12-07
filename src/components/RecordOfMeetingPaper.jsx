import React, { Component } from 'react';
import styled from 'styled-components';
import { lightGreen300, red300, orange900, green500 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import Loading from './Loading';
import AgendaPointCard from './AgendaPointCard';
import PETianoService from '../services/PETianoService';
import AgendaPointFactory from '../factories/AgendaPointFactory';
import RecordOfMeetingFactory from '../factories/RecordOfMeetingFactory';
import RecordOfMeetingEditAteiroOrPresidentDialog from './RecordOfMeetingEditAteiroOrPresidentDialog';

class RecordOfMeetingCard extends Component {

    constructor(props) {
        super(props);
        const RecordOfMeeting = this.propsToObject(props);
        this.state = {
            loading: true,
            RecordOfMeeting: RecordOfMeeting,
            President: null,
            Ateiro: null,
            isEditing: (RecordOfMeeting.Status === 1),
            PETianos: null,
            isEditingAteiroOrPresident: false
        };
        this.editAgendaPoint = this.editAgendaPoint.bind(this);
        this.deleteAgendaPoint = this.deleteAgendaPoint.bind(this);
        this.saveAteiroOrPresident = this.saveAteiroOrPresident.bind(this);
    }

    propsToObject = (props) =>{
        let ag = props.RecordOfMeeting.AgendaPoints;
        ag.sort((a, b) => {
            if (a.Id > b.Id)
                return 1;
            if (a.Id < b.Id)
                return -1;
            return 0;
        });
        return {
            Id: props.RecordOfMeeting.Id,
            Status: props.RecordOfMeeting.Status,
            Date: new Date(props.RecordOfMeeting.Date),
            AteiroId: props.RecordOfMeeting.AteiroId,
            PresidentId: props.RecordOfMeeting.PresidentId,
            AgendaPoints: {
                Fixed: ag.filter(({ Status }) => Status === 2),
                Pending: ag.filter(({ Status }) => Status === 3),
                NewInside: ag.filter(({ Status }) => Status === 4),
                NewOutside: ag.filter(({ Status }) => Status === 1)
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
        await PETianoService.loadAll();
        const President = await PETianoService.get(this.state.RecordOfMeeting.PresidentId);
        const Ateiro = await PETianoService.get(this.state.RecordOfMeeting.AteiroId);
        this.setState({
            loading: false,
            PETianos: PETianos,
            President: President,
            Ateiro: Ateiro
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

    openAteiroOrPresidentDialog = () => {
        this.setState({
            isEditingAteiroOrPresident: true
        });
    }

    closeAteiroOrPresidentDialog = () => {
        this.setState({
            isEditingAteiroOrPresident: false
        });
    }

    async saveAteiroOrPresident(ateiro, president) {
        const id = this.state.RecordOfMeeting.Id;
        const body = {
            PresidentId: president,
            AteiroId: ateiro
        };
        const ok = await RecordOfMeetingFactory.update(id, body);
        if (!ok) {
            // throw error
            return;
        }
        const President = await PETianoService.get(president);
        const Ateiro = await PETianoService.get(ateiro);
        this.closeAteiroOrPresidentDialog();
        this.setState({
            President: President,
            Ateiro: Ateiro
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading/>);

        return (
            <Paper zDepth={2}>
                <CardTitle title={"Reunião "+this.state.RecordOfMeeting.Date.toLocaleString()} />
                <PresidentAndAteiroCard style={{position: 'relative'}}>
                    <CardHeader
                        title="Presidente"
                        subtitle={this.state.President.Name}
                        avatar={this.state.President.Photo}
                    />
                    <Divider/>
                    <CardHeader
                        title="Ateiro"
                        subtitle={this.state.Ateiro.Name}
                        avatar={this.state.Ateiro.Photo}
                    />
                    {
                        !this.state.isEditing ? null:
                        <FloatingActionButton
                            onClick={this.openAteiroOrPresidentDialog}
                            backgroundColor={green500}
                            title="Editar Presidente e Ateiro" // ver tooltip dps
                            style={{position: 'absolute', right: 20, top: 49, bottom: 49}}
                        >
                            <ModeEdit />
                        </FloatingActionButton>
                    }
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
                {
                    this.state.isEditing ? null:
                    <CardActions>
                        <RaisedButton
                            label="Baixar"
                            primary={true}
                            icon={<FileDownloadIcon/>}
                        />
                    </CardActions>
                }
                <RecordOfMeetingEditAteiroOrPresidentDialog 
                    open={this.state.isEditingAteiroOrPresident}
                    onRequestClose={this.closeAteiroOrPresidentDialog}
                    president={this.state.President}
                    ateiro={this.state.Ateiro}
                    save={this.saveAteiroOrPresident}
                />
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