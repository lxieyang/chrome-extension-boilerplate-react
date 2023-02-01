import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestWebsite from './TestWebsite';
import Content from './Content';
import { fakeRuntime, fakeStorage } from './Fakes';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TestWebsite',
    component: TestWebsite,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof TestWebsite>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TestWebsite> = (args) => <TestWebsite {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    children: <Content setVisible={() => null} storage={fakeStorage} runtime={fakeRuntime} ignoreHttp={true}/>,
    containerProps: {
        _visible: true,
        _disabled: false,
    },
};
