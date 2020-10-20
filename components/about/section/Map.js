import React from 'react';
import styled from 'styled-components';
import { Map } from 'react-mapkit';
import PropTypes from 'prop-types';
import { Section } from '../../../styles/landing';
import { withTranslation } from '../../../utils/i18n';
import { colors, transparentColors } from '../../../constants/colors';
import { device } from '../../../constants/breakpoints';
import {
    ContentSection,
    ContentTitle,
    ContentDescription,
} from '../../../styles/static';
import { withMap } from '../../../utils/map';
import { spacing } from '../../../constants/spacing';

const stats = [
    {
        name: 'San Francisco',
        coordinate: [37.783333, -122.416667],
        radius: 150000,
    },
    {
        name: 'Seattle',
        coordinate: [47.6133555, -122.4118676],
        radius: 120000,
    },
    {
        name: 'Aurora',
        coordinate: [42.7515366, -76.7171491],
        radius: 100000,
    },
];

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

        const circles = stats.map(function (stat) {
            const coordinate = new mapkit.Coordinate(
                stat.coordinate[0],
                stat.coordinate[1],
            );
            const { radius } = stat;
            const circle = new mapkit.CircleOverlay(coordinate, radius);

            circle.data = { population: stat.population };
            circle.style = style;

            coordinates.push(circle);

            return circle;
        });

        if (coordinates.len <= 3) {
            this.setState(coordinates);
        }

        map.mapType = mapkit.Map.MapTypes.MutedStandard;
        map.addOverlays(circles);
    };

    render() {
        const { mapProps } = this.props;

        return (
            <Section marginTop marginBottom offset='true'>
                <ContentSection>
                    <ContentTitle>Coverage</ContentTitle>
                    <ContentDescription>
                        We currently cover hikes in portions of California,
                        Washington, and New York.
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

export default withTranslation('landing')(withMap(MapSection));

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
