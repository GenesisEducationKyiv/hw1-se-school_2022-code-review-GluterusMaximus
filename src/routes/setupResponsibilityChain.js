import ResponsibilityChainCreator from '../decorators/ResponsibilityChainCreator.js';
import { logger } from './initLogger.js';
import LoggerCreator from '../decorators/LoggerCreator.js';

const wrapDecorators = (creator, logger) =>
  new ResponsibilityChainCreator(new LoggerCreator(creator, logger));

const setupResponsibilityChain = (MainCreator, SecondaryCreators) => {
  const mainCreator = wrapDecorators(new MainCreator(), logger);
  let prev = mainCreator;

  for (const Creator of SecondaryCreators) {
    if (Creator === MainCreator) continue;

    const creator = wrapDecorators(new Creator(), logger);
    prev.setNext(creator);
    prev = creator;
  }

  prev.setNext(null);
  return mainCreator;
};

export default setupResponsibilityChain;
