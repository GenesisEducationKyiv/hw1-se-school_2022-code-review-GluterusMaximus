import ResponsibilityChainCreator from '../decorators/ResponsibilityChainCreator.js';
import { logger } from './initLogger.js';
import LoggerCreator from '../decorators/LoggerCreator.js';
import CachedCreator from '../proxies/CachedCreator.js';
import NodeCache from 'node-cache';

export const wrapDecorators = (Creators, logger) => {
  if (Creators.length === 0) return null;

  const creator = new ResponsibilityChainCreator(
    new LoggerCreator(new Creators[0](), logger)
  );
  creator.initNextCreator = wrapDecorators.bind(
    null,
    Creators.slice(1),
    logger
  );

  return creator;
};

export const cacheCreator = (creator) => new CachedCreator(creator, NodeCache);

export const setupResponsibilityChain = (MainCreator, SecondaryCreators) => {
  const UniqueCreators = [...new Set([MainCreator, ...SecondaryCreators])];
  const mainCreator = wrapDecorators(UniqueCreators, logger);

  return cacheCreator(mainCreator);
};
