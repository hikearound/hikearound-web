import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { withTranslation } from 'next-i18next';
import { Section } from '../../../styles/landing';
import { spacing } from '../../../constants/spacing';
import { device } from '../../../constants/breakpoints';
import { fontSize } from '../../../constants/landing';
import { colors } from '../../../constants/colors';

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
                <ContentSection>
                    <RichText render={title} />
                    {introduction && this.renderIntroduction(introduction)}
                    <RichText render={description} />
                </ContentSection>
            </Section>
        );
    }
}

export default withTranslation('landing')(DescriptionSection);

DescriptionSection.propTypes = propTypes;
DescriptionSection.defaultProps = defaultProps;

export const ContentSection = styled.div`
    max-width: 700px;
    text-align: left;
    margin: ${spacing.xl} auto 0 auto;
    padding-bottom: ${spacing.xl};
    font-size: ${spacing.md};

    a {
        color: ${colors.purple};
    }

    @media ${device.tablet} {
        margin-top: ${spacing.lg};
        padding: 0 ${spacing.md} ${spacing.md} ${spacing.md};
    }
`;

export const IntroductionWrapper = styled.div`
    margin-top: ${spacing.xs};
    font-size: ${fontSize.md};

    @media ${device.tablet} {
        margin-top: ${spacing.sm};
    }
`;
