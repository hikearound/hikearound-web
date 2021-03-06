import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { withTranslation } from 'next-i18next';
import { Section } from '../../../styles/landing';
import { spacing } from '../../../constants/spacing';
import { ContentSection } from '../../../styles/static';
import { device } from '../../../constants/breakpoints';
import { fontSize } from '../../../constants/landing';

const propTypes = {
    title: PropTypes.array.isRequired,
    introduction: PropTypes.array,
    description: PropTypes.array.isRequired,
};

const defaultProps = {
    introduction: null,
};

class DescriptionSection extends React.PureComponent {
    renderIntroduction = (introduction) => (
        <IntroductionWrapper>
            <RichText render={introduction} />
        </IntroductionWrapper>
    );

    render() {
        const { title, introduction, description } = this.props;

        return (
            <Section marginTop>
                <StyledContentSection>
                    <RichText render={title} />
                    {introduction && this.renderIntroduction(introduction)}
                    <RichText render={description} />
                </StyledContentSection>
            </Section>
        );
    }
}

export default withTranslation('landing')(DescriptionSection);

DescriptionSection.propTypes = propTypes;
DescriptionSection.defaultProps = defaultProps;

export const StyledContentSection = styled(ContentSection)`
    max-width: 700px;
    text-align: left;
    margin: ${spacing.xl} auto 0 auto;
    padding-bottom: ${spacing.xl};

    @media ${device.tablet} {
        margin-top: ${spacing.lg};
        padding-bottom: ${spacing.md};
    }
`;

export const IntroductionWrapper = styled.div`
    margin-top: ${spacing.xs};
    font-size: ${fontSize.md};

    @media ${device.tablet} {
        margin-top: ${spacing.sm};
    }
`;
