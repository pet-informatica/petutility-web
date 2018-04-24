import React, { Component } from 'react';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { red500, yellow500, orange900 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import Search from 'material-ui/svg-icons/action/search';

class RecordOfMeetingMenu extends Component {

    constructor(props) {
        super(props);
        this.messages = {
            create: 'Você confirma que deseja criar uma ata nova?',
            close: 'Você confirma que deseja salvar essa ata?'
        };
        this.state = {
            open: false,
            message: '',
            callback: null,
            speedDialOpened: false,
            CurrAgendaPoint: null
        };
    }

    handleOpen = (message, callback) => {
        this.setState({
            open: true,
            message: message,
            callback: callback,
            speedDialOpened: false
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleOk = () => {
        this.state.callback();
        this.setState({
            message: '',
            open: false
        });
    }

    onChangeSpeedDial = () => {
        const st = this.state.speedDialOpened;
        this.setState({
            speedDialOpened: !st
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Confirmar"
                primary={true}
                onClick={this.handleOk}
            />
        ];
        const floatingActionButtonProps = {
            backgroundColor: orange900,
        };
        return (
            <div>
                <SpeedDial
                    title={this.props.title}
                    icon={<MoreVert />}
                    hasBackdrop={false}
                    floatingActionButtonProps={floatingActionButtonProps}
                    isOpen={this.state.speedDialOpened}
                    onChange={this.onChangeSpeedDial}
                >
                    {!this.state.speedDialOpened ? null:
                        <BubbleList>
                            {this.props.isEditing ?
                                <BubbleListItem
                                    primaryText="Salvar ata"
                                    rightAvatar={
                                        <FloatingActionButton
                                            onClick={() => this.handleOpen(this.messages.close, this.props.closeRecordOfMeeting)}
                                            backgroundColor={red500}
                                        >
                                            <ContentSave />
                                        </FloatingActionButton>
                                    }
                                />:
                                <BubbleListItem
                                    primaryText="Criar ata"
                                    rightAvatar={
                                        <FloatingActionButton
                                            onClick={() => this.handleOpen(this.messages.create, this.props.createRecordOfMeeting)}
                                            backgroundColor={yellow500}
                                        >
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    }
                                />
                            }
                            <BubbleListItem
                                primaryText="Procurar atas"
                                rightAvatar={
                                    <FloatingActionButton onClick={this.props.openSearchBox}>
                                        <Search />
                                    </FloatingActionButton>
                                }
                            />
                        </BubbleList>
                    }
                </SpeedDial>
                <Dialog
                    open={this.state.open}
                    modal={false}
                    actions={actions}
                >
                    {this.state.message}
                </Dialog>
            </div>
        );
    }

}

export default RecordOfMeetingMenu;