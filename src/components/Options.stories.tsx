import React, { useCallback } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Options from './Options';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Options',
  component: Options,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Options>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Options> = (args) => <Options {...args} />;

function fakeGetStorage(defaults, callback) {
  callback(defaults);
}

function fakeSetStorage(callback) {
  callback();
}

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  storage: {get: fakeGetStorage, set: fakeSetStorage}
};
