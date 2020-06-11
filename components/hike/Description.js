import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import nl2br from 'react-nl2br';
import ShowMoreText from 'react-show-more-text';
import { Card, CardContent } from '../../styles/card';
import { SecondaryHeading } from '../../styles/headings';
import { colors } from '../../constants/colors';

const propTypes = {
    description: PropTypes.string.isRequired,
};

class Description extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { description: null, expanded: false };
    }

    componentDidMount() {
        this.setDescription();
    }

    componentDidUpdate(prevProps) {
        const { description } = this.props;

        if (prevProps.description !== description) {
            this.setDescription();
        }
    }

    setDescription = () => {
        const { description } = this.props;
        this.setState({ description, expanded: false });
    };

    updateDescription = () => {
        const { description } = this.props;

        if (description) {
            this.setState({
                description: nl2br(description),
                expanded: true,
            });
        }
    };

    renderDescription() {
        const { description, expanded } = this.state;

        if (description) {
            return (
                <DescriptionWrapper>
                    <ShowMoreText
                        lines={5}
                        more='Continue Reading'
                        less=''
                        anchorClass=''
                        onClick={this.updateDescription}
                        expanded={expanded}
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
