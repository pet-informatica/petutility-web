import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

class UploadBox extends Component {
    
    handleDrop = (ac, rj) => {
        if (ac.length > 0) {
            const reader = new FileReader();
            const file = ac[0];

            reader.onloadend = () => {
                this.props.onChange(file, reader.result);
            }

            reader.readAsDataURL(file);    
        }
        this.props.onChange(ac);
    }

    handleInput = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.onChange(file, reader.result);
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            <Wrapper>
                <Cell />
                <Box onDrop={this.handleDrop}>
                    <Text>
                        {"Arraste o arquivo para aqui"}
                    </Text>
                    <Label for={"file"}>
                        <RaisedButton label={"Escolher Arquivo"} />
                    </Label>
                    <Input id={"file"} type={"file"} onChange={this.props.onChange}/>
                </Box>
                <Cell />
            </Wrapper>
        );
    }

}

export default UploadBox;

const Wrapper = styled.div`
    width: 100%;
    display: table-row;
`;
const Box = styled(Dropzone)`
    width: 20vw;
    height: 20vw;
    margin: auto;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    border: 1px dashed black;
    border-radius: 10%;
`;
const Cell = styled.div`
    width: 20vw;
    display: table-cell;
`;
const Text = styled.p``;
const Label = styled.label``;
const Input = styled.input`
    display: none;
`;