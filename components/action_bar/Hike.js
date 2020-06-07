import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import ShareIcon from '../icons/Share';
import { Card } from '../../styles/card';
import colors from '../../constants/colors';
import { fontSize } from '../../constants/type';
import { borderRadius } from '../../constants/dimensions';
import spacing from '../../constants/spacing';

const propTypes = {
    classes: PropTypes.object.isRequired,
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
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedItem } = this.state;

        if (prevState.selectedItem !== selectedItem) {
            // console.log(selectedItem);
        }
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null, selectedItem: event.target.tabIndex });
    };

    render() {
        const { anchorEl, didLoad } = this.state;
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
                            <MenuItem
                                onClick={this.handleClose}
                                className={classes.item}
                            >
                                Copy Link
                            </MenuItem>
                            <MenuItem
                                onClick={this.handleClose}
                                className={classes.item}
                            >
                                Twitter
                            </MenuItem>
                        </Menu>
                        <Button startIcon={<DirectionsIcon />} size='small'>
                            Get Directions
                        </Button>
                    </>
                )}
            </ActionBarWrapper>
        );
    }
}

ActionBar.propTypes = propTypes;

export default withStyles(styles)(ActionBar);

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
            font-size: ${fontSize.md};
        }

        &:first-of-type {
            border-bottom-left-radius: ${borderRadius.sm};
        }
    }

    .MuiButton-text {
        padding: 9.5px 18px;
    }

    .MuiButton-startIcon {
        margin-right: ${spacing.xs};
    }
`;
