import React from 'react';
import { Card } from '../../styles/card';
import { withTranslation } from '../../utils/i18n';
import { RightRailLink } from '../../styles/links';
import { renderLinks } from '../../utils/terms';
import { ListHeading, OrderedList, ListItem } from '../../styles/lists';

class TermsNavigation extends React.PureComponent {
    renderRecentHikeLinks = () => {
        const { t } = this.props;
        const links = renderLinks(t);

        return links.map(({ text, link }, index) => (
            <ListItem key={index}>
                <RightRailLink href={link}>{text}</RightRailLink>
            </ListItem>
        ));
    };

    render() {
        const { t } = this.props;

        return (
            <Card noPadding hideMobile>
                <ListHeading>{t('card.title')}</ListHeading>
                <OrderedList>{this.renderRecentHikeLinks()}</OrderedList>
            </Card>
        );
    }
}

export default withTranslation('terms')(TermsNavigation);
