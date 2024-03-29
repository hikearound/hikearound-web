import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { withTranslation } from 'next-i18next';
import { device } from '@constants/breakpoints';
import { Section } from '@styles/landing';
import { ContentSection } from '@styles/static';

const propTypes = {
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
};

class IntroSection extends React.PureComponent {
    render() {
        const { title, description } = this.props;

        return (
            <Section marginTop marginBottom>
                <StyledContentSection>
                    <RichText render={title} />
                    <RichText render={description} />
                </StyledContentSection>
            </Section>
        );
    }
}

export default withTranslation('landing')(IntroSection);

IntroSection.propTypes = propTypes;

export const StyledContentSection = styled(ContentSection)`
    max-width: 600px;
    text-align: left;
    margin: 125px auto 90px auto;

    @media ${device.tablet} {
        margin-top: 60px;
        margin-bottom: 30px;
    }
`;
