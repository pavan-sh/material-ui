import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import ThemeViewer from './ThemeViewer';

describe('ThemeViewer', () => {
  const { render } = createRenderer();

  it('should make tree text selectable', () => {
    render(
      <ThemeViewer
        data={{ palette: { primary: { main: '#1976d2' } } }}
        expandPaths={['palette', 'palette.primary']}
      />,
    );

    const label = screen.getByText(
      (_content, node) =>
        node?.classList.contains(treeItemClasses.label) && node.textContent === 'palette: Object',
    );

    expect(label).toHaveComputedStyle({ userSelect: 'text' });

    const content = label.closest(`.${treeItemClasses.content}`);

    expect(content).not.to.equal(null);
    expect(content).toHaveComputedStyle({ userSelect: 'text' });

    const nestedLeafLabel = screen.getByText(
      (_content, node) =>
        node?.classList.contains(treeItemClasses.label) &&
        node.textContent?.includes('main:') &&
        node.textContent?.includes('#1976d2'),
    );

    expect(nestedLeafLabel).toHaveComputedStyle({ userSelect: 'text' });
  });
});
