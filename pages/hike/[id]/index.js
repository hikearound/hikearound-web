import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../../layouts/main';
import HikeHeader from '../../../components/HikeHeader';
import { getHikeData } from '../../../utils/hike';

const propTypes = {
    hike: PropTypes.object.isRequired,
};

class HikePage extends React.Component {
    static async getInitialProps({ query }) {
        const hike = await getHikeData(query.id);
        return { hike };
    }

    render() {
        const { hike } = this.props;

        return (
            <Page>
                <HikeHeader name={hike.name} city={hike.city} />
            </Page>
        );
    }
}

HikePage.propTypes = propTypes;

export default HikePage;
