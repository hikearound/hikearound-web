import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import { getDifficultyColor } from '@utils/card';
import { ColorPill } from '@styles/pill';

const propTypes = {
    label: PropTypes.string.isRequired,
};

class DifficultyPill extends React.PureComponent {
    render() {
        const { label, t } = this.props;
        const backgroundColor = getDifficultyColor(label);

        return (
            <ColorPill style={{ backgroundColor }}>
                {t(`difficulty.${label.toLowerCase()}`)}
            </ColorPill>
        );
    }
}

DifficultyPill.propTypes = propTypes;

export default withTranslation(['hike'])(DifficultyPill);
