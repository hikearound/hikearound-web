import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { Section } from '../../../styles/landing';
import { withTranslation } from '../../../utils/i18n';
import { spacing } from '../../../constants/spacing';
import { ContentSection } from '../../../styles/static';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class DescriptionSection extends React.PureComponent {
    render() {
        const { title, description } = this.props;

        return (
            <Section marginTop>
                <StyledContentSection>
                    <RichText render={title} />
                    <RichText render={description} />
                </StyledContentSection>
            </Section>
        );
    }
}

export default withTranslation('landing')(DescriptionSection);

DescriptionSection.propTypes = propTypes;

export const StyledContentSection = styled(ContentSection)`
    max-width: 700px;
    text-align: left;
    margin: ${spacing.xl} auto 0 auto;
    padding-bottom: ${spacing.xl};
`;
