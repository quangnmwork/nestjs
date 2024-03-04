import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui';


//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Component/Button'
  , render: () => <Button>Hello</Button>
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};