import React from 'react';
import styled from 'styled-components';

class AppIcon extends React.PureComponent {
    render() {
        return <IconImage src='/images/icon.svg' alt='Hikearound icon' />;
    }
}

export default AppIcon;

const IconImage = styled.img`
    height: 125px;
    width: 125px;
`;
