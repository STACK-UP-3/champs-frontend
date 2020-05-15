import store from '../../src/Redux/store';
import dummyAction from '../../src/Redux/Actions/dummyAction';


describe('Store test suite', () => {
  it('should test new state in the store', () => {
    const expectedStore = {
      dummy: {
        isDummy: true,
      },
    };
    store.dispatch(dummyAction());
    const newStore = store.getState();
    expect(newStore).toStrictEqual(expectedStore);
  });
});
