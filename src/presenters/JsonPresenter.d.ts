import PresenterResponse from './PresenterResponse';

export default class JsonPresenterd {
  presentRate(rate: number): PresenterResponse;

  presentMailingResult(notSent: string[]): PresenterResponse;
}
