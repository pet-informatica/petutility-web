import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

import Loading from '../../../components/Loading';
import PETianoService from '../../../services/PETianoService';

class ActivityCard extends Component {

    constructor(props) {
        super(props);
        this.activity = this.props.activity;
        this.activity.Start = new Date(this.activity.Start).toLocaleString();
        this.activity.End = new Date(this.activity.End).toLocaleString();
        this.PETianoId = this.props.activity.PETianoId;
        this.state = {
            PETiano: null
        };
    }

    async componentDidMount() {
        let PETiano = await PETianoService.get(this.PETianoId);
        this.setState({
            PETiano: PETiano
        });
    }

    render() {
        return (
            <Card style={style} >
                <CardTitle title={this.activity.Title} />
                <CardText>
                    <Text>
                        <Label>
                            {"Data de início: "}
                        </Label>
                        {this.activity.Start}
                    </Text>
                    <Text>
                        <Label>
                            {"Data de término: "}
                        </Label>
                        {this.activity.End}
                    </Text>
                    <Text>
                        <Label>
                            {"Número de Participantes: "}
                        </Label>
                        {this.activity.Participants}
                    </Text>
                    <Text>
                        <Label>
                            {"Pontos Positivos: "}
                        </Label>
                        {this.activity.Positive}
                    </Text>
                    <Text>
                        <Label>
                            {"Pontos Negativos: "}
                        </Label>
                        {this.activity.Negative}
                    </Text>
                    <Text>
                        <Label>
                            {"Comentários: "}
                        </Label>
                        {this.activity.Comments}
                    </Text>
                </CardText>
                {
                    this.state.PETiano !== null ?
                        <CardHeader
                            title={this.state.PETiano.Name}
                            avatar={this.state.PETiano.Photo}
                        /> : <Loading />
                }
            </Card>
        );
    }
}

export default ActivityCard;

const style = {
    margin: 10
};
const Text = styled.p``;
const Label = styled.label`
    font-weight: bold;
`;