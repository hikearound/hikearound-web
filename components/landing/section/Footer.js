import React from 'react';
import styled from 'styled-components';
import { Section } from '../../../styles/landing';
import { fontSize } from '../../../constants/landing';
import { spacing } from '../../../constants/spacing';
import Footer from '../../page/Footer';

class FooterSection extends React.PureComponent {
    render() {
        return (
            <Section>
                <FooterWrapper>
                    <Footer inlineCopyright />
                </FooterWrapper>
            </Section>
        );
    }
}

export default FooterSection;

const FooterWrapper = styled.div`
    padding: ${spacing.lg};

    a,
    select {
        font-size: ${fontSize.sm};
    }
`;
