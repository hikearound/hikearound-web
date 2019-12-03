import React from 'react';
import PropTypes from 'prop-types';
import nl2br from 'react-nl2br';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';

const propTypes = {
    description: PropTypes.string.isRequired,
};

class Description extends React.PureComponent {
    renderDescription() {
        const { description } = this.props;
        return nl2br(description.replace('\\n\\n', '\n\n'));
    }

    render() {
        return (
            <Card noPadding lastChild>
                <SecondaryHeading isCard>Description</SecondaryHeading>
                <CardContent>{this.renderDescription()}</CardContent>
            </Card>
        );
    }
}

Description.propTypes = propTypes;

export default Description;
