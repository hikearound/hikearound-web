import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { borderRadius } from '../../constants/dimensions';
import spacing from '../../constants/spacing';

const propTypes = {
    imageArray: PropTypes.array.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    currentImage: PropTypes.number.isRequired,
    closeModal: PropTypes.func.isRequired,
};

const imageMaxHeight = '80vh';
const dismissIconSize = '24px';
const modalBackgroundColor = 'rgba(0,0,0,0.9)';

class ImageModal extends React.PureComponent {
    render() {
        const {
            imageArray,
            modalIsOpen,
            currentImage,
            closeModal,
        } = this.props;

        return (
            <ModalGateway>
                {modalIsOpen ? (
                    <Modal
                        onClose={() => {
                            closeModal();
                        }}
                        allowFullscreen={false}
                        styles={{
                            blanket: (base) => ({
                                ...base,
                                backgroundColor: modalBackgroundColor,
                            }),
                        }}
                    >
                        <Carousel
                            components={{
                                FooterCount: () => null,
                                Navigation: () => null,
                            }}
                            views={imageArray}
                            currentIndex={currentImage}
                            styles={{
                                view: (base) => ({
                                    ...base,
                                    margin: `0 ${spacing.md}`,
                                    '> img': {
                                        borderRadius: borderRadius.sm,
                                        maxHeight: imageMaxHeight,
                                    },
                                }),
                                headerClose: (base) => ({
                                    ...base,
                                    height: dismissIconSize,
                                    width: dismissIconSize,
                                }),
                            }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        );
    }
}

ImageModal.propTypes = propTypes;

export default ImageModal;
