var _ = require('lodash');
var expect = require('chai').expect;

describe('Marty#serializeState()', function () {
  var Marty = require('../index');
  var Store1, Store2, Store3, store1ExpectedState, storeSerializedState, serializedState;

  beforeEach(function () {
    storeSerializedState = { bar: 'bar' };
    store1ExpectedState = { initial: 'store1' };

    Store1 = Marty.createStore({
      displayName: 'store1',
      getInitialState: _.noop,
      serialize: function () {
        return store1ExpectedState;
      }
    });

    Store2 = Marty.createStore({
      displayName: 'store2',
      getInitialState: _.noop,
      serialize: function () {
        return storeSerializedState;
      }
    });

    Store3 = Marty.createStore({
      getInitialState: _.noop
    });
    serializedState = Marty.serializeState();
  });

  it('should serialze all the stores', function () {
    expect(serializedState.toJSON()).to.eql({
      store1: store1ExpectedState,
      store2: storeSerializedState
    });
  });

  describe('#toString()', function () {
    it('should create a string that can be injected into the page', function () {
      expect(serializedState.toString()).to.equal('(window.__marty||(window.__marty={})).state=' + JSON.stringify({
        store1: store1ExpectedState,
        store2: storeSerializedState
      }));
    });
  });
});