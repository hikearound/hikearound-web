import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DirectionsIcon from '@material-ui/icons/Directions';
import { withRouter } from 'next/router';
import { withTranslation } from 'next-i18next';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { googleMapUrl, appleMapUrl } from '@constants/common';
import { menuStyle } from '@styles/actionbar';

const propTypes = {
    classes: PropTypes.object.isRequired,
    hike: PropTypes.object.isRequired,
};

class GetDirections extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            url: { google: null, apple: null },
            anchorEl: null,
        };
    }

    componentDidMount() {
        this.getUrls();
    }

    componentDidUpdate(prevProps) {
        const { hike } = this.props;

        if (prevProps.hike !== hike) {
            this.getUrls();
        }
    }

    getUrls = () => {
        const { hike } = this.props;
        const { lat, lng } = hike.coordinates.starting;

        this.setState({
            url: {
                google: `${googleMapUrl}//${lat},${lng}/@${lat},${lng},15z`,
                apple: `${appleMapUrl}${lat},${lng}`,
            },
        });
    };

    renderMenu = () => {
        const { classes, t } = this.props;
        const { anchorEl, url } = this.state;

        return (
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <MapLink href={url.apple} target='_blank' rel='noreferrer'>
                    <MenuItem
                        onClick={this.handleClose}
                        className={classes.item}
                    >
                        {t('action:hike.directions.map.type.apple')}
                    </MenuItem>
                </MapLink>
                <MapLink href={url.google} target='_blank' rel='noreferrer'>
                    <MenuItem
                        onClick={this.handleClose}
                        className={classes.item}
                    >
                        {t('action:hike.directions.map.type.google')}
                    </MenuItem>
                </MapLink>
            </Menu>
        );
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    renderButton = () => {
        const { t } = this.props;

        return (
            <Button
                onClick={this.handleClick}
                startIcon={<DirectionsIcon />}
                size='small'
            >
                {t('hike.directions.label')}
            </Button>
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

GetDirections.propTypes = propTypes;

export default withStyles(menuStyle)(
    withRouter(withTranslation('action')(GetDirections)),
);

const MapLink = styled.a`
    text-decoration: none;
`;
