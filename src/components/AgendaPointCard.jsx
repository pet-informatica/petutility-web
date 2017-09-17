import React, { Component } from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import CardText from './CardText';
import RaisedButton from 'material-ui/RaisedButton';

class AgendaPointCard extends Component {

    render() {
        return (
            <Card>
                <CardHeader
                    titleStyle={{fontWeight: 'normal'}}
                    title={this.props.AgendaPoint.Title}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {this.props.AgendaPoint.Description}
                </CardText>
                {
                    this.props.IsOpen ? 
                    <CardActions expandable={true}>
                        <RaisedButton
                            label="Editar"
                            primary={true}
                            onClick={() => this.props.handleEdit(this.props.AgendaPoint)}
                        />
                        <RaisedButton
                            label="Deletar"
                            secondary={true}
                            onClick={() => this.props.handleDelete(this.props.AgendaPoint)}
                        />
                    </CardActions>:
                    null
                }
            </Card>
        );
    }
}

export default AgendaPointCard;