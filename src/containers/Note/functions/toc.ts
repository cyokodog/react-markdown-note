interface BaseHeadingItem {
  level: number;
  el: HTMLHeadingElement;
}

interface HeadingItem extends BaseHeadingItem {
  parentNode?: BaseHeadingItem;
  children?: Array<BaseHeadingItem>;
}

export const getHeadingData = (
  targetElement: Element,
  headingRange: { firstLevel: number; lastLevel: number },
): HeadingItem => {
  const re = new RegExp(`h([${headingRange.firstLevel}-${headingRange.lastLevel}])+`, 'i');
  const headerParts = re.exec(targetElement.tagName);
  if (headerParts && headerParts.length === 2) {
    return {
      level: Number(headerParts[1]),
      el: targetElement as HTMLTableHeaderCellElement,
    };
  }
};

export const makeHeadingCollection = (
  firstHeadingElement: Element,
  headingRange: { firstLevel: number; lastLevel: number },
): HeadingItem[] => {
  if (!firstHeadingElement) {
    return [];
  }
  const headingData = getHeadingData(firstHeadingElement, headingRange);
  const collection = makeHeadingCollection(firstHeadingElement.nextElementSibling, headingRange);
  return headingData ? [headingData, ...collection] : collection;
};

export const addHeadingRelationTo = (headingCollection: HeadingItem[]) => {
  const collection = [...headingCollection].reverse();
  collection.forEach((currentNode, currentIdx) => {
    if (currentIdx < collection.length - 1) {
      const parentNode = collection.find((item, idx) => {
        return currentIdx < idx && item.level < currentNode.level;
      });
      if (parentNode) {
        parentNode.children = parentNode.children
          ? [...parentNode.children, currentNode]
          : [currentNode];
        currentNode.parentNode = parentNode;
      }
    }
  });
};

export const makeTocHtml = (headingCollection: HeadingItem[], listLevel = 1) => {
  const listContentHtml = headingCollection
    .map((item, idx) => {
      const childrenHTML = item.children ? makeTocHtml(item.children, listLevel + 1) : '';
      const tocId = `toc${idx}`;
      item.el.dataset.tocId = tocId;
      return `<li><a href="javascript:void(0)" data-toc-ref-id="${tocId}">${item.el.innerHTML}</a>${childrenHTML}</li>`;
    })
    .join('');
  return `<ul class="toc-level-${listLevel}">${listContentHtml}</ul>`;
};

export const makeTocDom = (tocHtml: string): HTMLElement => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(tocHtml, 'text/html');
  const tocDom = doc.querySelector('ul');
  tocDom.addEventListener('click', (event) => {
    const target = event.target as HTMLAnchorElement;
    const headingEl = document.querySelector(`[data-toc-id="${target.dataset.tocRefId}"]`);
    headingEl.scrollIntoView(true);
  });
  return tocDom;
};

export const makeTocElement = (
  firstHeadingElement: Element,
  headingRange: { firstLevel: number; lastLevel: number },
): HTMLElement => {
  const headingCollection = makeHeadingCollection(firstHeadingElement, headingRange);
  addHeadingRelationTo(headingCollection);
  const tocHtml = makeTocHtml(headingCollection);
  return makeTocDom(tocHtml);
};
