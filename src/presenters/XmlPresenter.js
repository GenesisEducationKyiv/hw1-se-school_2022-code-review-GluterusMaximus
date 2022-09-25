import xml2js from 'xml2js';

export default class XmlPresenter {
  contentType = 'application/xml';

  presentRate(rate) {
    const builder = new xml2js.Builder();
    return {
      payload: builder.buildObject({ rate }),
      contentType: this.contentType,
    };
  }

  presentMailingResult(notSent) {
    const builder = new xml2js.Builder();
    return {
      payload: builder.buildObject({ notSent }),
      contentType: this.contentType,
    };
  }
}
