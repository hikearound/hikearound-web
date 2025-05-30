import React from 'react';
import AppLogo from '../../components/AppLogo';

export default {
    title: 'Components/AppLogo',
    component: AppLogo,
    parameters: {
        layout: 'centered',
    },
};

const Template = (args) => <AppLogo {...args} />;

export const Default = Template.bind({});
Default.args = {
    alt: 'Hikearound Logo',
};

export const WithCustomAlt = Template.bind({});
WithCustomAlt.args = {
    alt: 'Custom Alt Text',
};
