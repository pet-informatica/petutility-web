import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { lightGreen300, red300, orange900, green500 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Loading from '../../../components/Loading';

import AgendaPointCard from './AgendaPointCard';
import AddAgendaPointDialog from './AddAgendaPointDialog';
import EditAteiroOrPresidentDialog from './EditAteiroOrPresidentDialog';
import AddAbsentOrLateDialog from './AddAbsentOrLateDialog';

import Constants from '../../../lib/Constants';

import AgendaPointFactory from '../../../factories/AgendaPointFactory';
import RecordOfMeetingFactory from '../../../factories/RecordOfMeetingFactory';
import AbsentOrLateFactory from '../../../factories/AbsentOrLateFactory';

import PETianoService from '../../../services/PETianoService';

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
            isEditingAteiroOrPresident: false,
            isAddingAbsentOrLate: false,
            isAddingAgendaPoint: false,
            typeOfAbsentOrLate: null
        };
        this.createAgendaPoint = this.createAgendaPoint.bind(this);
        this.editAgendaPoint = this.editAgendaPoint.bind(this);
        this.deleteAgendaPoint = this.deleteAgendaPoint.bind(this);
        this.saveAteiroOrPresident = this.saveAteiroOrPresident.bind(this);
        this.saveAbsentOrLate = this.saveAbsentOrLate.bind(this);
        this.deleteAbsentOrLate = this.deleteAbsentOrLate.bind(this);
    }

    propsToObject(props) {
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

    async componentWillReceiveProps(nextProps) {
        const RecordOfMeeting = this.propsToObject(nextProps);
        this.setState({
            RecordOfMeeting: RecordOfMeeting,
            isEditing: (RecordOfMeeting.Status === 1)
        });
    }

    async componentDidMount() {
        let PETianos = {};
        let rec = this.state.RecordOfMeeting;
        await PETianoService.loadAll();
        const data = await AgendaPointFactory.query();
        data.sort((a, b) => {
            if (a.Id > b.Id)
                return 1;
            if (a.Id < b.Id)
                return -1;
            return 0;
        });
        rec.AgendaPoints.NewOutside = data;
        const President = await PETianoService.get(this.state.RecordOfMeeting.PresidentId);
        const Ateiro = await PETianoService.get(this.state.RecordOfMeeting.AteiroId);
        this.setState({
            RecordOfMeeting: rec,
            loading: false,
            PETianos: PETianos,
            President: President,
            Ateiro: Ateiro
        });
    }

    downloadRecordOfMeeting = () => {
        const pdf = window.open(`${Constants.apiURL}/recordOfMeeting/${this.state.RecordOfMeeting.Id}/download`, '_blank');
        pdf.focus();
    }

    openAddAgendaPointDialog = () => this.setState({ isAddingAgendaPoint: true });

    closeAddAgendaPointDialog = () => this.setState({ isAddingAgendaPoint: false });

    async createAgendaPoint(agendaPoint) {
        if (this.state.isEditing) {
            agendaPoint.Status = 4;
        } else {
            agendaPoint.Status = 1;
        }
        const data = await AgendaPointFactory.create(agendaPoint);
        this.closeAddAgendaPointDialog();
        let rec = this.state.RecordOfMeeting;
        if (this.state.isEditing) {
            rec.AgendaPoints.NewInside.push(data);
        } else {
            rec.AgendaPoints.NewOutside.push(data);
        }
        this.setState({
            RecordOfMeeting: rec
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
        let ag = [];
        ag = ag.concat(points.Fixed);
        ag = ag.concat(points.NewInside);
        ag = ag.concat(points.NewOutside);
        ag = ag.concat(points.Pending);
        ag.sort((a, b) => {
            if (a.Id > b.Id)
                return 1;
            if (a.Id < b.Id)
                return -1;
            return 0;
        });
        rec.AgendaPoints = {
            Fixed: ag.filter(({ Status }) => Status === 2),
            Pending: ag.filter(({ Status }) => Status === 3),
            NewInside: ag.filter(({ Status }) => Status === 4),
            NewOutside: ag.filter(({ Status }) => Status === 1)
        };
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
        rec.AgendaPoints[k] = rec.AgendaPoints[k].filter((a) => a.Id !== agendaPoint.Id);
        this.setState({
            RecordOfMeeting: rec
        });
    }

    openAteiroOrPresidentDialog = () => this.setState({ isEditingAteiroOrPresident: true })

    closeAteiroOrPresidentDialog = () => this.setState({ isEditingAteiroOrPresident: false })

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

    openAbsentOrLateDialog = (type) => {
        this.setState({
            isAddingAbsentOrLate: true,
            typeOfAbsentOrLate: type
        });
    }

    closeAbsentOrLateDialog = () => this.setState({ isAddingAbsentOrLate: false })

    async saveAbsentOrLate(absentOrLate) {
        const body = {
            RecordOfMeetingId: this.state.RecordOfMeeting.Id,
            PETianoId: absentOrLate.PETianoId,
            Reason: absentOrLate.Reason,
            IsJustified: absentOrLate.IsJustified,
            Type: absentOrLate.Type
        };
        let data = await AbsentOrLateFactory.create(body);
        this.closeAbsentOrLateDialog();
        data.PETiano = await PETianoService.get(data.PETianoId);
        let rec = this.state.RecordOfMeeting;
        rec.AbsentsOrLates.Absents = rec.AbsentsOrLates.Absents.filter(a => a.PETianoId !== data.PETianoId);
        rec.AbsentsOrLates.Lates = rec.AbsentsOrLates.Lates.filter(a => a.PETianoId !== data.PETianoId);
        if (absentOrLate.Type === 1) {
            rec.AbsentsOrLates.Absents.push(data);
        } else {
            rec.AbsentsOrLates.Lates.push(data);
        }
        this.setState({
           RecordOfMeeting: rec 
        });
    }

    async deleteAbsentOrLate(id, param) {
        const ok = await AbsentOrLateFactory.delete(id);
        if (!ok) {
            // throw error
            return;
        }
        let rec = this.state.RecordOfMeeting;
        rec.AbsentsOrLates[param] = rec.AbsentsOrLates[param].filter(a => a.Id !== id);
        this.setState({
            RecordOfMeeting: rec
        });
    }

    render() {
        if (this.state.loading)
            return (<Loading/>);
        return (
            <Paper zDepth={2}>
                <CardTitle title={`Reunião número ${this.state.RecordOfMeeting.Id} - ${this.state.RecordOfMeeting.Date.toLocaleDateString('en-US')}`} />
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
                    <CardHeader title="Ausentes"/>
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Absents.map((a, i) =>{
                            return (
                                <div key={a.Id}>
                                    <MyChip
                                        backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                        onRequestDelete={this.state.isEditing ? () => this.deleteAbsentOrLate(a.Id, 'Absents') : null}
                                        data-tip={a.Reason}
                                    >
                                        <Avatar src={a.PETiano.Photo} />
                                        {a.PETiano.Name}
                                    </MyChip>
                                    <ReactTooltip place="top" type="dark" effect="solid" />
                                </div>
                            )
                        })}
                    </AbsentsOrLatesList>
                    {
                        this.state.isEditing ?
                        <FloatingActionButton
                            onClick={() => this.openAbsentOrLateDialog('absent')}
                            mini={true}
                            style={{ 
                                position: 'absolute',
                                right: 20,
                                top: this.state.RecordOfMeeting.AbsentsOrLates.Absents.length ? 32 : 7
                            }}
                        >
                            <ContentAdd />
                        </FloatingActionButton>:
                        null
                    }
                </AbsentsOrLatesCard>
                <AbsentsOrLatesCard>
                    <CardHeader title="Atrasados" />
                    <AbsentsOrLatesList>
                        {this.state.RecordOfMeeting.AbsentsOrLates.Lates.map((a, i) => {
                            return (
                                <div key={a.Id}>
                                    <MyChip
                                        backgroundColor={a.IsJustified ? lightGreen300 : red300}
                                        data-tip={a.Reason}
                                        onRequestDelete={this.state.isEditing ? () => this.deleteAbsentOrLate(a.Id, 'Lates') : null}
                                    >
                                        <Avatar src={a.PETiano.Photo} />
                                        {a.PETiano.Name}
                                    </MyChip>
                                    <ReactTooltip place="top" type="dark" effect="solid" />
                                </div>
                            )
                        }
                        )}
                    </AbsentsOrLatesList>
                    {
                        this.state.isEditing ?
                        <FloatingActionButton
                            onClick={() => this.openAbsentOrLateDialog('late')}
                            mini={true}
                            style={{
                                position: 'absolute',
                                right: 20,
                                top: this.state.RecordOfMeeting.AbsentsOrLates.Lates.length ? 32 : 7
                            }}
                        >
                            <ContentAdd />
                        </FloatingActionButton> :
                        null
                    }
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
                        case "NewOutside":
                            title = "Novos para a próxima ata";
                            break;
                        default:
                    }
                    if (val[0] === "NewOutside" && this.state.RecordOfMeeting.AgendaPoints[val[0]].length === 0)
                        return null;
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
                <RecordOfMeetingCardActions>
                    <FlatButton
                        onClick={this.openAddAgendaPointDialog}
                        label="Adicionar Ponto de Pauta"
                        icon={<ContentAdd />}
                    />
                    {
                        !this.state.isEditing ? 
                        <FlatButton
                        label="Baixar"
                        onClick={this.downloadRecordOfMeeting}
                        icon={<FileDownloadIcon />}
                        />: null
                    }
                </RecordOfMeetingCardActions>
                <EditAteiroOrPresidentDialog 
                    open={this.state.isEditingAteiroOrPresident}
                    onRequestClose={this.closeAteiroOrPresidentDialog}
                    president={this.state.President}
                    ateiro={this.state.Ateiro}
                    save={this.saveAteiroOrPresident}
                />
                <AddAbsentOrLateDialog
                    open={this.state.isAddingAbsentOrLate}
                    onRequestClose={this.closeAbsentOrLateDialog}
                    type={this.state.typeOfAbsentOrLate}
                    save={this.saveAbsentOrLate}
                />
                <AddAgendaPointDialog
                    open={this.state.isAddingAgendaPoint}
                    onRequestClose={this.closeAddAgendaPointDialog}
                    save={this.createAgendaPoint}
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
    position: relative;
`;
const AbsentsOrLatesList = styled.div`
    background-color: ${orange900}!important;
    display: flex;
    flexWrap: wrap;
`;
const MyChip = styled(Chip)`
    margin: 15px 5px!important;
`;
const AgendaPointCards = styled.div`
    margin: 0 2%;
`;
const RecordOfMeetingCardActions = styled(CardActions)`
    margin: 1% 2% 3% 1%;
    padding-bottom: 10px!important;
`;