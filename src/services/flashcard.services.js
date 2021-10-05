import firebase from "../firebase";

const db = firebase.ref("/flashcards");

class FCDataService {
  getAll() {
    return db;
  }

  create(fc) {
    return db.push(fc);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new FCDataService();