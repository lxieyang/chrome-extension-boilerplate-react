import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ContentContainer from './ContentContainer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'ContentContainer',
    component: ContentContainer,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ContentContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentContainer> = (args) => <ContentContainer {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    children: (<div className="flex flex-col">
        <p>Testing so many differenet things</p>
        <p>Testing so many differenet things</p>
        <p>Testing so many differenet things</p>
        </div>),
    _visible: true,
    _disabled: false,
};
