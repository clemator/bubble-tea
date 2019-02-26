/**
 * /!\ While it's working the instructions has not been followed properly on this part
 *     maybe it was due to a mis understanding ? or a bad writing from my part ? 
 *     or maybe you forget it during the rush dunno.
 * 
 *     But it should have been a simple CRUD Storage API with methods such as get, set, delete, post, update...
 * 
 *     Regarding the promisififcation. I thinkt that it should have been the CRUD operation needed to be firstly promisify
 *     in a specific macro operation. E.g, post(Array<T>): each insert could be done like a Bulk which one operation can be a promise
 *     e.g Promise.all(Insert<T>)
 * 
 * Maybe it could have been useful to make a Singleton. Indeed initStorage is called many times.
 * Futhermore if you'll need to add other method you'll need to check the initStorage method again...
 * By doing a Singleton you could avoid this issue create a Class or a Function Constructor where you'll set your
 * _storage reference in the prototype.
 */
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

  // Parse can throw an error it should have been wrapped in a try / catch
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

    // same as above
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
    // you could do return await method
    // or more simply just return the method as it is and the promisification will be above
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
    // same as above commentary
    const res = await setStorageData(data)
    return res
  }
}