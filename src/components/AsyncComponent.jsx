import React, { PureComponent } from 'react';

function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
        super(props);ç
        this.state = {
            component: null,
        };
    }

    async componentDidMount() {
        const { default: component } = await importComponent();
        this.setState({
            component: component
        });
    }

    render() {
        const C = this.state.component;
        return C ? <C {...this.props} /> : null;
    }

  }

  return AsyncComponent;
}

export default asyncComponent;