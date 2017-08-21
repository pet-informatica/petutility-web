import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, CardText } from 'material-ui/Card';


class PETianoCard extends Component {

    constructor(props) {
        super(props);
        this.PETiano = this.props.PETiano;
    }

    render() {
        return (
            <MyCard>
                <Row>
                    <Cell>
                        <Image src={this.PETiano.Photo} alt=""/>
                    </Cell>
                    <Cell>
                        <CardText>
                            <Text>
                                <Label>
                                    {"Nome: "}
                                </Label>
                                {this.PETiano.Name}
                            </Text>
                            <Text>
                                <Label>
                                    {"Email: "}
                                </Label>
                                {this.PETiano.Email}
                            </Text>
                            <Text>
                                <Label>
                                    {"Telefone Celular: "}
                                </Label>
                                {this.PETiano.CellPhone}
                            </Text>
                            <Text>
                                <Label>
                                    {"CPF: "}
                                </Label>
                                {this.PETiano.Cpf}
                            </Text>
                            <Text>
                                <Label>
                                    {"RG: "}
                                </Label>
                                {this.PETiano.Rg}
                            </Text>
                        </CardText>
                    </Cell>
                </Row>
            </MyCard>
        );
    }
}

export default PETianoCard;

const MyCard = styled(Card)`
    margin: 10px;
`;
const Row = styled.div`
    display: table-row;
`;
const Cell = styled.div`
    display: table-cell;
    vertical-align: top;
`;
const Image = styled.img`
    margin: 20px;
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
`;
const Text = styled.p``;
const Label = styled.label`
    font-weight: bold;
`;