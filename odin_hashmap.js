class HashMap {
  constructor(size = 16) {
    this.size = size;
    this.arr = new Array(this.size);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  loadingfactor() {
    let loadfactor = this.length() / this.size;
    if (loadfactor >= 0.75) {
      this.rehashing();
    }
  }

  rehashing() {
    let tmparr = this.entries();
    this.size = this.size * 2;
    this.arr = new Array(this.size);
    for (let i = 0; i < tmparr.length; i++) {
      this.set(tmparr[i][0], tmparr[i][1]);
    }
  }

  set(key, value) {
    //implement the loading factor
    this.loadingfactor();

    let index = this.hash(key) % this.size;
    let next = null;
    let nodeset = { key, value, next };
    let tmp = this.arr[index];

    if (this.has(key)) {
      while (tmp.key != key) {
        tmp = tmp.next;
      }
      tmp.value = value;
      return;
    }
    if (this.arr[index] === undefined) {
      this.arr[index] = nodeset;
    } else {
      while (tmp.next != null) {
        tmp = tmp.next;
      }
      tmp.next = nodeset;
    }
  }

  get(key) {
    let index = this.hash(key) % this.size;
    //error cannot read properties of undefined
    //find the index if not undefined then traverse the nodelist till null
    if (this.arr[index] !== undefined) {
      let tmp = this.arr[index];
      while (tmp.key != key) {
        if (tmp.next == null) {
          return null;
        }
        tmp = tmp.next;
      }
      return tmp.value;
    } else {
      return null;
    }
  }

  has(key) {
    let ithas = this.get(key);
    return ithas ? true : false;
  }

  length() {
    let numkeys = 0;
    for (let i = 0; i < this.arr.length - 1; i++) {
      let tmp = this.arr[i];
      while (tmp !== undefined && tmp != null) {
        numkeys++;
        tmp = tmp.next;
      }
    }
    return numkeys;
  }

  keys() {
    let keys = [];
    let tmp = this.arr;
    for (let i = 0; i < this.arr.length; i++) {
      while (tmp[i] !== undefined && tmp[i] != null) {
        //not null -> and this.arr[i].next != null
        keys.push(tmp[i].key);
        tmp[i] = tmp[i].next;
      }
      tmp = this.arr;
    }
    return keys;
  }

  values() {
    let keys = [];
    let tmp = this.arr;
    for (let i = 0; i < this.arr.length; i++) {
      while (tmp[i] !== undefined && tmp[i] != null) {
        //not null -> and this.arr[i].next != null
        keys.push(tmp[i].value);
        tmp[i] = tmp[i].next;
      }
      tmp = this.arr;
    }
    return keys;
  }

  entries() {
    let keys = [];

    let tmp = this.arr;

    //if empty then return message the hashmap's array does not contain anything
    for (let i = 0; i < this.arr.length; i++) {
      while (tmp[i] !== undefined && tmp[i] != null) {
        //not null -> and this.arr[i].next != null
        keys.push([tmp[i].key, tmp[i].value]);
        tmp[i] = tmp[i].next;
      }
      tmp = this.arr;
    }
    return keys.length > 0 ? keys : console.log("The hashmap has no keys!"); // if length of keys not positive return message
  }

  clear() {
    this.arr = new Array();
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      let index = this.hash(key) % this.size;
      let tmp = this.arr[index];
      let previous = this.arr[index];
      let current = this.arr[index];

      if (current.key == key && previous === current) {
        this.arr[index] = undefined;
        return;
      }

      while (current.key != key) {
        current = current.next;
        if (previous.next != current) {
          previous = previous.next;
        } else {
          previous.next = current.next;
        }
      }
    }
  }
}

let hashmap1 = new HashMap();
hashmap1.set("ornithologist", 34);
hashmap1.set("carpool", 29);
hashmap1.set("scientist", 24);
