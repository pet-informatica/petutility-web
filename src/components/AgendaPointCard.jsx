import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class AgendaPointCard extends Component {

    render() {
        return (
            <Card>
                <CardHeader
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
                        <RaisedButton label="Editar" primary={true}/>
                        <RaisedButton label="Deletar" secondary={true}/>
                    </CardActions>:
                    null
                }
            </Card>
        );
    }
}

export default AgendaPointCard;