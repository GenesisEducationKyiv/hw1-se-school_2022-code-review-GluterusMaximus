import PresenterResponse from './PresenterResponse';

export default class XmlPresenter {
  presentRate(rate: number): PresenterResponse;

  presentMailingResult(notSent: string[]): PresenterResponse;
}
