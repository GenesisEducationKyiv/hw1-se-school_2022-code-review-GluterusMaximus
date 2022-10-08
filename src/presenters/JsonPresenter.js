export default class JsonPresenter {
  contentType = 'application/json';

  presentRate(rate) {
    return { payload: JSON.stringify(rate), contentType: this.contentType };
  }

  presentMailingResult(notSent) {
    return {
      payload: JSON.stringify({ notSent }),
      contentType: this.contentType,
    };
  }
}
