import React from 'react';
import PropTypes from 'prop-types';
import {
    TextBlock,
    ContentBlock,
    ContentTitle,
    ContentDescription,
} from '@styles/landing';

const propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    renderExtra: PropTypes.object,
    centered: PropTypes.bool,
    includeBlock: PropTypes.bool,
    includeMaxWidth: PropTypes.bool,
    offsetTop: PropTypes.bool,
};

const defaultProps = {
    renderExtra: <></>,
    centered: false,
    includeBlock: false,
    includeMaxWidth: false,
    offsetTop: false,
};

class TextSection extends React.PureComponent {
    renderContent = () => {
        const { title, description, renderExtra } = this.props;

        return (
            <>
                <ContentTitle>{title}</ContentTitle>
                <ContentDescription>{description}</ContentDescription>
                {renderExtra}
            </>
        );
    };

    render() {
        const { includeBlock, includeMaxWidth, offsetTop, centered } =
            this.props;

        return (
            <TextBlock offsetTop={offsetTop} centered={centered}>
                {includeBlock && (
                    <ContentBlock includeMaxWidth={includeMaxWidth}>
                        {this.renderContent()}
                    </ContentBlock>
                )}
                {!includeBlock && this.renderContent()}
            </TextBlock>
        );
    }
}

TextSection.propTypes = propTypes;
TextSection.defaultProps = defaultProps;

export default TextSection;
