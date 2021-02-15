import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppStoreBadge from '../landing/Badge';
import { withTranslation } from '../../utils/i18n';
import {
    PromptWrapper,
    PromptTitle,
    RatingWrapper,
    StyledRating,
    StyledTitle,
    StyledText,
} from '../../styles/reviewPrompt';

class ReviewPrompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            value: 0,
        };
    }

    renderTitle = () => {
        const { t } = this.props;
        return <PromptTitle>{t('review.prompt.title')}</PromptTitle>;
    };

    onStarPress = (event, value) => {
        this.setState({
            showDialog: true,
            value,
        });
    };

    handleDialogClose = () => {
        this.setState({
            showDialog: false,
            value: 0,
        });
    };

    renderStars = () => {
        const { value } = this.state;

        return (
            <RatingWrapper>
                <StyledRating
                    name='customized-empty'
                    max={5}
                    value={value}
                    precision={1}
                    onChange={this.onStarPress}
                    emptyIcon={<StarBorderIcon fontSize='inherit' />}
                />
            </RatingWrapper>
        );
    };

    renderDialog = () => {
        const { t } = this.props;
        const { showDialog } = this.state;

        return (
            <div>
                <Dialog open={showDialog} onClose={this.handleDialogClose}>
                    <StyledTitle>{t('review.dialog.title')}</StyledTitle>
                    <DialogContent>
                        <StyledText>{t('review.dialog.content')}</StyledText>
                        <AppStoreBadge includeTopMargin={false} />
                    </DialogContent>
                    <DialogActions />
                </Dialog>
            </div>
        );
    };

    render() {
        return (
            <PromptWrapper>
                {this.renderTitle()}
                {this.renderStars()}
                {this.renderDialog()}
            </PromptWrapper>
        );
    }
}

export default withTranslation(['hike'])(ReviewPrompt);
