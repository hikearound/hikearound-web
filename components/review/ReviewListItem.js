import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/min/locales';
import ShowMoreText from 'react-show-more-text';
import nl2br from 'react-nl2br';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { withTranslation } from 'next-i18next';
import { colors } from '@constants/colors';
import timestamps from '@constants/timestamps';
import { parseText } from '@utils/text';
import { device } from '@constants/breakpoints';
import { spacing } from '@constants/spacing';
import { fontWeight } from '@constants/type';

const propTypes = {
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    savedOn: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    numberOfLines: PropTypes.number,
};

const defaultProps = {
    numberOfLines: 3,
};

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timestamp: null,
            expanded: false,
            review: undefined,
            lang: null,
        };
    }

    componentDidMount() {
        this.updateReview();
        this.setLanguageAndTimestamp();
    }

    componentDidUpdate() {
        this.setLanguageAndTimestamp();
    }

    setLanguageAndTimestamp = () => {
        this.setLanguage();
        this.setTimestamp();
    };

    setLanguage = () => {
        const { i18n } = this.props;
        moment.locale(i18n.language);
    };

    setTimestamp = () => {
        const { savedOn, i18n } = this.props;
        const { lang } = this.state;

        if (lang !== i18n.language) {
            this.setState({
                timestamp: moment(savedOn.toDate()).format(timestamps.standard),
                lang: i18n.language,
            });
        }
    };

    expandReview = () => {
        const { review } = this.props;

        if (review) {
            this.setState({
                expanded: true,
                review: nl2br(review),
            });
        }
    };

    updateReview() {
        const { review } = this.props;

        if (review) {
            this.setState({
                review: parseText(review),
            });
        }
    }

    renderHeader = () => {
        const { user } = this.props;
        const { timestamp } = this.state;

        return (
            <Header>
                <Avatar src={user.photoURL} />
                <InfoBlock>
                    <Name>{user.name}</Name>
                    <TimeStamp>{timestamp}</TimeStamp>
                </InfoBlock>
            </Header>
        );
    };

    renderStars = () => {
        const { rating } = this.props;

        return (
            <RatingWrapper>
                <StyledRating
                    name='customized-empty'
                    value={rating}
                    max={5}
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize='inherit' />}
                    disabled
                />
            </RatingWrapper>
        );
    };

    renderBody = () => {
        const { numberOfLines, t } = this.props;
        const { review, expanded } = this.state;

        return (
            <Body>
                {this.renderStars()}
                <ShowMoreText
                    lines={numberOfLines}
                    more={t('action:hike.continue.label')}
                    less=''
                    anchorClass=''
                    onClick={this.expandReview}
                    expanded={expanded}
                >
                    {review}
                </ShowMoreText>
            </Body>
        );
    };

    render() {
        return (
            <ReviewItemWrapper>
                {this.renderHeader()}
                {this.renderBody()}
            </ReviewItemWrapper>
        );
    }
}

ReviewListItem.propTypes = propTypes;
ReviewListItem.defaultProps = defaultProps;

export default withTranslation(['common', 'action'])(ReviewListItem);

const ReviewItemWrapper = styled.div`
    display: block;
    border-top: 1px solid ${colors.gray};
    padding: ${spacing.md};
    margin-top: -1px;

    a {
        color: ${colors.purple};
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    &:first-of-type {
        border-top-width: 0;
    }

    @media ${device.tablet} {
        border-color: ${colors.grayLight};
    }
`;

const Header = styled.div`
    display: block;
`;

const Body = styled.div`
    display: block;
`;

const InfoBlock = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-left: ${spacing.sm};
    position: relative;
    top: 2px;
`;

const Avatar = styled.img`
    display: inline-block;
    height: 38px;
    width: 38px;
    border-radius: 100%;
`;

const Name = styled.div`
    display: block;
    font-weight: ${fontWeight.medium};
    padding-bottom: 2px;
`;

const TimeStamp = styled.div`
    display: block;
    font-size: 14px;
    color: ${colors.grayMedium};
    text-transform: capitalize;
`;

const RatingWrapper = styled.div`
    margin: 2px 0;

    .MuiRating-decimal {
        .MuiRating-icon {
            font-size: 18px !important;
        }
    }
`;

export const StyledRating = withStyles({
    iconFilled: {
        color: colors.purple,
    },
    iconEmpty: {
        color: colors.gray,
    },
    root: {
        opacity: '1 !important',
    },
})(Rating);
