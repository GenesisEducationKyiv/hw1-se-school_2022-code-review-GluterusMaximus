import { SagaBuilder } from 'node-sagas';

export default class UserSaga {
  constructor(emailService, customersFacade) {
    const builder = new SagaBuilder();

    return builder
      .step('Save email')
      .invoke(async (params) => {
        await emailService.subscribe(params.email);
      })
      .withCompensation(async (params) => {
        await emailService.unsubscribe(params.email);
      })
      .step('Create customer')
      .invoke(async (params) => {
        await customersFacade.add(params.email);
      })
      .withCompensation(async (params) => {
        await customersFacade.remove(params.email);
      })
      .build();
  }
}
