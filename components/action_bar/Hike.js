import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'next/router';
import { TwitterShareButton } from 'react-share';
import ShareIcon from '../icons/Share';
import { Card } from '../../styles/card';
import colors from '../../constants/colors';
import { fontSize } from '../../constants/type';
import { borderRadius } from '../../constants/dimensions';
import spacing from '../../constants/spacing';
import { withToast } from '../../utils/toast';
import { baseUrl } from '../../constants/common';

const propTypes = {
    classes: PropTypes.object.isRequired,
    addToast: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
};

const styles = {
    item: {
        fontSize: fontSize.md,
        color: colors.blackText,
    },
};

class ActionBar extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            anchorEl: null,
            selectedItem: null,
            didLoad: false,
        };
    }

    componentDidMount() {
        this.setState({ didLoad: true });
        this.getShareUrl();
        this.getShareText();
        this.getMapUrl();
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedItem } = this.state;

        if (prevState.selectedItem !== selectedItem || selectedItem === 0) {
            if (selectedItem === 0) {
                this.copyLink();
            }
        }
    }

    getShareUrl = () => {
        const { router } = this.props;

        this.setState({ shareUrl: `${baseUrl}${router.asPath}` });
    };

    getShareText = () => {
        const { hike } = this.props;

        this.setState({
            shareText: `Check out ${hike.name} on @tryhikearound`,
        });
    };

    getMapUrl = () => {
        const { hike } = this.props;
        const { lat, lng } = hike.coordinates.starting;

        this.setState({
            mapUrl: `https://www.google.com/maps/dir/${lat},${lng}/@${lat},${lng},15z`,
        });
    };

    copyLink = () => {
        const { addToast } = this.props;

        addToast('Link copied to clipboard', { appearance: 'success' });
        this.setState({ selectedItem: null });
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null, selectedItem: event.target.tabIndex });
    };

    render() {
        const { anchorEl, didLoad, shareUrl, shareText, mapUrl } = this.state;
        const { classes } = this.props;

        return (
            <ActionBarWrapper noPadding>
                {didLoad && (
                    <>
                        <Button
                            onClick={this.handleClick}
                            startIcon={<ShareIcon />}
                            size='small'
                        >
                            Share Hike
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <CopyToClipboard text={shareUrl}>
                                <MenuItem
                                    onClick={this.handleClose}
                                    className={classes.item}
                                >
                                    Copy Link
                                </MenuItem>
                            </CopyToClipboard>
                            <TwitterShareButton
                                url={shareUrl}
                                title={shareText}
                                windowHeight={300}
                            >
                                <MenuItem
                                    onClick={this.handleClose}
                                    className={classes.item}
                                >
                                    Twitter
                                </MenuItem>
                            </TwitterShareButton>
                        </Menu>
                        <a href={mapUrl} target='_blank' rel='noreferrer'>
                            <Button startIcon={<DirectionsIcon />} size='small'>
                                Get Directions
                            </Button>
                        </a>
                    </>
                )}
            </ActionBarWrapper>
        );
    }
}

ActionBar.propTypes = propTypes;

export default withStyles(styles)(withToast(withRouter(ActionBar)));

const ActionBarWrapper = styled(Card)`
    padding: 0;
    min-height: 45px;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    .MuiButton-root {
        border-radius: 0;
        text-transform: none;
        color: ${colors.blackText};

        span {
            font-size: 14px;
        }

        &:first-of-type {
            border-bottom-left-radius: ${borderRadius.sm};
        }
    }

    .MuiButton-text {
        padding: 10.5px 18px;
    }

    .MuiButton-startIcon {
        margin-right: ${spacing.xs};
    }
`;
