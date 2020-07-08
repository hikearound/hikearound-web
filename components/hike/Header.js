import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { spacing } from '../../constants/spacing';
import { Card } from '../../styles/card';
import { PrimaryHeading, SubHeading } from '../../styles/headings';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
};

class Header extends React.PureComponent {
    render() {
        const { name, city } = this.props;

        return (
            <Card>
                <PrimaryHeading>{name}</PrimaryHeading>
                <HikeCity>{city}</HikeCity>
            </Card>
        );
    }
}

Header.propTypes = propTypes;

export default Header;

const HikeCity = styled(SubHeading)`
    margin-top: ${spacing.xs};
`;
