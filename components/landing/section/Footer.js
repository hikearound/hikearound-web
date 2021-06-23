import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Section } from '@styles/landing';
import { fontSize } from '@constants/landing';
import { spacing } from '@constants/spacing';
import Footer from '@components/page/Footer';
import { device } from '@constants/breakpoints';
import { colors } from '@constants/colors';

const propTypes = {
    centered: PropTypes.bool,
    topBorder: PropTypes.bool,
};

const defaultProps = {
    centered: false,
    topBorder: false,
};

class FooterSection extends React.PureComponent {
    render() {
        const { centered, topBorder } = this.props;

        return (
            <Section>
                <FooterWrapper centered={centered} topBorder={topBorder}>
                    <Footer inlineCopyright />
                </FooterWrapper>
            </Section>
        );
    }
}

FooterSection.propTypes = propTypes;
FooterSection.defaultProps = defaultProps;

export default FooterSection;

const FooterWrapper = styled.div`
    padding: ${spacing.lg};
    text-align: ${(props) => (props.centered ? 'center' : 'left')};
    border-top: ${(props) =>
        props.topBorder ? `1px solid ${colors.grayMediumLight}` : 'none'};
    margin-top: ${(props) => (props.topBorder ? '60px' : '0')};

    a,
    span {
        font-size: ${fontSize.sm};

        span {
            font-size: ${fontSize.sm};
        }
    }

    @media ${device.tablet} {
        line-height: 24px;
        margin-top: ${(props) => (props.topBorder ? '40px' : '0')};
    }
`;
