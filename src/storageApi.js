let _storage;
const storageName = 'bubble-shop'

/**
 *  Initialize the internal storage
 *  @private
 */
function initStorage() {
  _storage = localStorage;
}

/**
 *  Get all stored data
 *  @private
 *  @return {object}
 */
function getAllStoredData() {
  return JSON.parse(_storage.getItem(storageName))
}

/**
 *  Get all stored data
 *  @private
 *  @param {object} data
 */
function setStorageData(data) {
  try {
    let parsedData = JSON.stringify(data)
    _storage.setItem(storageName, parsedData)
  }
  catch (e) {
    console.error('Storage API set error: ' + e.toString())
  }
}

export default {
  /**
   *  Initialization method
   *  @public
   */
  init() {
    initStorage()
  },
  /**
   *  Getter method
   *  @public
   *  @return {Promise}
   */
  async get() {
    const res = await getAllStoredData()
    return res
  },
  /**
   *  Setter method
   *  @public
   *  @param {object} data
   *  @return {Promise}
   */
  async set(data) {
    const res = await setStorageData(data)
    return res
  }
}