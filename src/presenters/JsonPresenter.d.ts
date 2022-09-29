import PresenterResponse from './PresenterResponse';

export default class JsonPresenter {
  presentRate(rate: number): PresenterResponse;

  presentMailingResult(notSent: string[]): PresenterResponse;
}
