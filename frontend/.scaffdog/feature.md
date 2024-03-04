---
name: 'feature'
root: '.'
output: './src/feature'
questions:
  name: 'Please enter a component feature name.'
  story:
    confirm: 'Do you need a story?'
    initial: true
---

# `{{ inputs.name | pascal }}/index.ts`

```typescript
export * from './{{ inputs.name }}';
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
export type Props = React.PropsWithChildren<{}>;

export const {{ inputs.name | pascal }}: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
```

# `{{ !inputs.story && '!' }}{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}';
import type { Meta, StoryObj } from '@storybook/react';

const meta:Meta<typeof {{ inputs.name | pascal }}> = { component: {{ inputs.name | pascal }} ,title : "Features/{{ inputs.name | pascal }}" };

export default meta;
export const Overview = { args: {} };
```
