import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { ActionBarWrapper } from '@styles/actionbar';
import { withToast } from '@utils/toast';
import ShareHike from '@components/action/Share';
import GetDirections from '@components/action/Directions';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class ActionBar extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            didLoad: false,
        };
    }

    componentDidMount() {
        this.setState({ didLoad: true });
    }

    render() {
        const { didLoad } = this.state;
        const { hike } = this.props;

        return (
            <ActionBarWrapper noPadding>
                {didLoad && (
                    <span>
                        <ShareHike hike={hike} />
                        <GetDirections hike={hike} />
                    </span>
                )}
            </ActionBarWrapper>
        );
    }
}

ActionBar.propTypes = propTypes;

export default withToast(withRouter(ActionBar));
