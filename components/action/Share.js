import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withRouter } from 'next/router';
import { TwitterShareButton } from 'react-share';
import ShareIcon from '../icons/Share';
import { withToast } from '../../utils/toast';
import { baseUrl } from '../../constants/common';
import { menuStyle } from '../../styles/actionbar';
import { withTranslation } from '../../utils/i18n';

const propTypes = {
    classes: PropTypes.object.isRequired,
    addToast: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
};

class ShareHike extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            anchorEl: null,
            selectedItem: null,
        };
    }

    componentDidMount() {
        this.getShareData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedItem } = this.state;
        const { hike } = this.props;

        if (prevProps.hike !== hike) {
            this.getShareData();
        }

        if (prevState.selectedItem !== selectedItem || selectedItem === 0) {
            if (selectedItem === 0) {
                this.copyLink();
            }
        }
    }

    getShareData = () => {
        this.getShareUrl();
        this.getShareText();
    };

    getShareUrl = () => {
        const { router } = this.props;
        this.setState({ shareUrl: `${baseUrl}${router.asPath}` });
    };

    getShareText = () => {
        const { t, hike } = this.props;

        this.setState({
            shareText: t('action:hike.share.message', { hikeName: hike.name }),
        });
    };

    copyLink = () => {
        const { addToast, t } = this.props;

        addToast(t('action:hike.share.type.copy.success'), {
            appearance: 'success',
        });

        this.setState({ selectedItem: null });
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null, selectedItem: event.target.tabIndex });
    };

    renderButton = () => {
        const { t } = this.props;

        return (
            <Button
                onClick={this.handleClick}
                startIcon={<ShareIcon />}
                size='small'
                className='firstChild'
            >
                {t('action:hike.share.label')}
            </Button>
        );
    };

    renderMenu = () => {
        const { classes, t } = this.props;
        const { anchorEl, shareUrl, shareText } = this.state;

        return (
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
                        {t('action:hike.share.type.copy.label')}
                    </MenuItem>
                </CopyToClipboard>
                <TwitterShareButton
                    url={shareUrl}
                    title={shareText}
                    windowHeight={425}
                    related={['tryhikearound']}
                >
                    <MenuItem
                        onClick={this.handleClose}
                        className={classes.item}
                    >
                        {t('action:hike.share.type.twitter.label')}
                    </MenuItem>
                </TwitterShareButton>
            </Menu>
        );
    };

    render() {
        return (
            <span>
                {this.renderButton()}
                {this.renderMenu()}
            </span>
        );
    }
}

ShareHike.propTypes = propTypes;

export default withStyles(menuStyle)(
    withToast(withRouter(withTranslation(['common', 'action'])(ShareHike))),
);
