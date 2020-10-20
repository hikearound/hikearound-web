import React from 'react';
import styled from 'styled-components';
import { Map } from 'react-mapkit';
import PropTypes from 'prop-types';
import { Section } from '../../../styles/landing';
import { withTranslation } from '../../../utils/i18n';
import { colors, transparentColors } from '../../../constants/colors';
import { device } from '../../../constants/breakpoints';
import { coverageAreas } from '../../../constants/data';
import {
    ContentSection,
    ContentTitle,
    ContentDescription,
} from '../../../styles/static';
import { withMap } from '../../../utils/map';
import { spacing } from '../../../constants/spacing';

const propTypes = {
    mapProps: PropTypes.object.isRequired,
    map: PropTypes.object,
};

const defaultProps = {
    map: null,
};

class MapSection extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            coordinates: [],
        };
    }

    async componentDidUpdate() {
        const { map } = this.props;

        if (map) {
            await this.plotOverlays();
            this.showOverlays();
        }
    }

    showOverlays = () => {
        const { map } = this.props;
        const { coordinates } = this.state;

        map.showItems(coordinates, {
            animate: true,
            padding: new mapkit.Padding(120, 25, 120, 25),
        });
    };

    plotOverlays = () => {
        const { map } = this.props;
        const { coordinates } = this.state;

        const style = new mapkit.Style({
            lineWidth: 2,
            strokeColor: colors.purple,
            fillColor: colors.purple,
        });

        const regionOverlays = coverageAreas.map(function (stat) {
            const coordinate = new mapkit.Coordinate(
                stat.coordinate[0],
                stat.coordinate[1],
            );
            const { radius } = stat;
            const overlay = new mapkit.CircleOverlay(coordinate, radius);

            overlay.data = { population: stat.population };
            overlay.style = style;
            coordinates.push(overlay);

            return overlay;
        });

        if (coordinates.len <= 3) {
            this.setState(coordinates);
        }

        map.mapType = mapkit.Map.MapTypes.MutedStandard;
        map.addOverlays(regionOverlays);
    };

    render() {
        const { mapProps, t } = this.props;

        return (
            <Section marginTop marginBottom offset='true'>
                <ContentSection>
                    <ContentTitle>{t('section.map.title')}</ContentTitle>
                    <ContentDescription>
                        {t('section.map.description')}
                    </ContentDescription>
                </ContentSection>
                <MapContainer>
                    <Map {...mapProps} />
                </MapContainer>
            </Section>
        );
    }
}

MapSection.propTypes = propTypes;
MapSection.defaultProps = defaultProps;

export default withTranslation('about')(withMap(MapSection));

const MapContainer = styled.div`
    background-color: ${colors.grayLight};
    height: 550px;
    width: 80%;
    margin: ${spacing.lg} auto 0 auto;
    border-radius: ${spacing.sm};
    box-shadow: 0 2px ${spacing.xs} 0 ${transparentColors.gray};

    canvas {
        border-radius: ${spacing.sm};
    }

    @media ${device.tablet} {
        height: 350px;
    }
`;
