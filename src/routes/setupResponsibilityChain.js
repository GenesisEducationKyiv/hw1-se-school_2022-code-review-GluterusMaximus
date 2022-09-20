import ResponsibilityChainCreator from '../decorators/ResponsibilityChainCreator.js';

const setupResponsibilityChain = (MainCreator, SecondaryCreators) => {
  const mainCreator = new ResponsibilityChainCreator(new MainCreator());
  let prev = mainCreator;

  for (const Creator of SecondaryCreators) {
    if (Creator === MainCreator) continue;

    const creator = new ResponsibilityChainCreator(new Creator());
    prev.setNext(creator);
    prev = creator;
  }

  prev.setNext(null);
  return mainCreator;
};

export default setupResponsibilityChain;
