import * as firebase from "firebase";

class Database {

  static connect() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  static changeOwnerInfo(name, address) {
    firebase.database().ref("owners").child(address).set({
      name: name,
    })
  }

  static addSampleOwner(hash, info) {
    const list = firebase.database().ref("samples");

    list.once("value").then(snapshot => {
      return snapshot.hasChild(hash);
    }).then(exist => {
      if(exist === false)
        list.child(hash).set({
          owner: info.address,
          name: info.name,
        })
    })
  }

  static uploadSample(file, hash, address) {
    firebase.storage().ref().child(address + "/" + hash).put(file).then(snapshot => {
      console.log("Upload com sucesso");
    });
  }

  static async getAddressName(address) {
    let name = "";

    await firebase.database().ref("owners").child(address).once("value").then(snapshot => {
      name = snapshot.child("name").val();
    });

    return name;
  }

  static async getSampleName(hash) {
    let name = "";

    await firebase.database().ref("samples").child(hash).once("value").then(snapshot => {
      name = snapshot.child("name").val();
    })

    return name;
  }

  static async getAllSamplesInfo() {
    let sample_list;

    await firebase.database().ref("samples").once("value").then(async snapshot => {
      const value = await snapshot.val();
      sample_list = Object.entries(value);
    })

    await sample_list.forEach(async sample => {
      const owner_name = await this.getAddressName(sample[1].owner);

      sample[1] = {
        owner: sample[1].owner,
        name: sample[1].name,
        owner_name: owner_name,
      };
    })

    return sample_list;
  }
}

export default Database;
