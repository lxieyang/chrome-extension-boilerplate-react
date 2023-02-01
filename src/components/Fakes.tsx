function fakeGetStorage(defaults, callback) {
    callback(defaults);
  }
  
export function fakeSetStorage(callback) {
    callback();
  }

export const fakeStorage = {
    get: fakeGetStorage,
    set: fakeSetStorage
}

export const fakeRuntime = {
    onMessage: {
        addListener: () => null
    },
    sendMessage: () => null
}