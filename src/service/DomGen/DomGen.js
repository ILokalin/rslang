/* eslint-disable guard-for-in */
export function DomGen({ name, ...blockStruct }) {
  const bemBlock = {
    name,
    setMod(mod) {
      this.block.classList.add(`${this.name}--${mod}`);
    },
    removeMod(mod) {
      this.block.classList.remove(`${this.name}--${mod}`);
    },
    toggleMod(mod) {
      this.block.classList.toggle(`${this.name}--${mod}`);
    },
  };

  const bemClassGenerator = (blockClassName) => (classNames = '') => {
    if (classNames === '') {
      return [blockClassName];
    }

    const bemClassName = (className) => `${blockClassName}__${className}`;

    return classNames.split(',').map(bemClassName);
  };

  const classGen = bemClassGenerator(name);

  const createTag = (element) => {
    const { tag, isAccess, classAdd, className, children, ...addData } = element;

    const domElement = document.createElement(tag);

    if (className) {
      classGen(className).forEach((singleClassName) => {
        domElement.classList.add(singleClassName);
      });
    }

    if (classAdd) {
      classAdd.split(',').forEach((singleClassName) => {
        if (singleClassName !== '') {
          domElement.classList.add(singleClassName);
        }
      });
    }

    if (isAccess) {
      bemBlock[isAccess] = domElement;
    }

    if (children) {
      children.forEach((tagChildElement) => {
        const childElement = createTag(tagChildElement);
        domElement.append(childElement);
      });
    }

    const { innerText, dataSet, ...attributesList } = addData;

    if (innerText) {
      domElement.append(document.createTextNode(innerText));
    }

    if (dataSet) {
      const { value } = dataSet;
      domElement.dataset[dataSet.name] = value;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const attribute in attributesList) {
      domElement[attribute] = attributesList[attribute];
    }

    return domElement;
  };
  bemBlock.block = createTag(blockStruct);

  return bemBlock;
}

export function ElementGen(tag, className, parent) {
  const element = document.createElement(tag);
  element.className = className;

  if (parent) {
    parent.append(element);
  }

  return element;
}


