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

// A lorem ipsum website
function webpage(args) { 
<div>
    <div>
    <h1>Lorem Ipsum</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies
        tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec
        ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod,
        nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed
        euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget
        nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget aliquet nisl
        nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam mauris, eget
        aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl aliquam
        mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt, nunc nisl
        aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies tincidunt,
        nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec ultricies
        tincidunt, nunc nisl aliquam mauris, eget aliquet nisl nunc eget nisl. Sed euismod, nisl nec
        </p>
    </div>
    <ContentContainer {...args} />
</div>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ContentContainer> = (args) => webpage(args);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    children: <p>Test</p>,
    _visible: true,
    _disabled: false,
};
