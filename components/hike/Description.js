import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import nl2br from 'react-nl2br';
import ShowMoreText from 'react-show-more-text';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import colors from '../../constants/colors';

const propTypes = {
    description: PropTypes.string.isRequired,
};

class Description extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { description: null };
    }

    componentDidMount() {
        const { description } = this.props;
        this.setState({ description });
    }

    executeOnClick = () => {
        const { description } = this.props;

        if (description) {
            this.setState({
                description: nl2br(description),
            });
        }
    };

    updateDescription() {
        const { description } = this.props;

        if (description) {
            this.setState({
                description: nl2br(description),
            });
        }
    }

    renderDescription() {
        const { description } = this.state;
        if (description) {
            return (
                <DescriptionWrapper>
                    <ShowMoreText
                        lines={5}
                        more='Continue reading'
                        less=''
                        anchorClass=''
                        onClick={this.executeOnClick}
                        expanded={false}
                    >
                        {description}
                    </ShowMoreText>
                </DescriptionWrapper>
            );
        }
        return null;
    }

    render() {
        return (
            <Card noPadding>
                <SecondaryHeading isCard>Description</SecondaryHeading>
                <CardContent>{this.renderDescription()}</CardContent>
            </Card>
        );
    }
}

Description.propTypes = propTypes;

export default Description;

const DescriptionWrapper = styled.div`
    a {
        color: ${colors.purple};
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
