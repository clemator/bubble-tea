// It is not openly-ready-to-be-reusable library
// - `storageName` should be handled
// - CRUD has been YAGNI to an oversimplifed `getAll()/setAll()`
// - avoid console.error for sole handling business of side effets,
//   consumers should have the feedback that a problem has happened

// The library handled async, which is the thing to do,
// however the asynchronous layer has not been handled in the UX implementation
// For example, if we switch `getAllStoredData()` with this business, we'll observe flickering:
// ```
// getAllStoredData() {
//   _storage || initStorage()

//   try { }
//   return new Promise((resolve, reject) => {
//     try {
//       const result = JSON.parse(_storage.getItem(storageName))
      
//       setTimeout(() => resolve(res), 5000)
//     } catch (e) {
//       reject(e)
//     }
//   })
// }
// ```

// At the moment the library blocks the DOM

// At the moment the library is not transactional


// It is KISS design to avoid a creational pattern here
// but it is KISSer to avoid `initStorage()` and just declare
// `_storage = window.localStorage`
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
  if (! _storage)
    initStorage()
  // - Never JSON.parse without handling its side effects
  return JSON.parse(_storage.getItem(storageName))
}

/**
 *  Get all stored data
 *  @private
 *  @param {object} data
 */
function setStorageData(data) {
  try {
    if (! _storage)
      initStorage()

    let parsedData = JSON.stringify(data)
    _storage.setItem(storageName, parsedData)
  }
  catch (e) {
    console.error('Storage API set error: ' + e.toString())
  }
}

export default {
  /**
   *  Getter method
   *  @public
   *  @return {Promise}
   */
  async get() {
    // return await getAllStoredData()
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