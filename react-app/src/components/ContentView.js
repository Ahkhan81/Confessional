import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Breadcrumb } from 'react-bootstrap';

export class ContentView extends React.Component {
    render() {
        const { headerName, breadCrumbName, paths, component } = this.props;

        return (
            <React.Fragment>
                <h3>{headerName}</h3>
                <hr className="mt-0" />
                <Breadcrumb>
                    {paths && paths.map((path) => {
                        return (
                            <LinkContainer key={path.name} to={path.url}>
                                <Breadcrumb.Item>{path.name}</Breadcrumb.Item>
                            </LinkContainer>
                        );
                    })}
                    <Breadcrumb.Item active>{breadCrumbName}</Breadcrumb.Item>
                </Breadcrumb>
                {component}
            </React.Fragment>
        );
    }
}