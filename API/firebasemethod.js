import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { 
  getFirestore, collection, 
  addDoc, setDoc, doc, 
  serverTimestamp, onSnapshot,
  deleteDoc, getDoc, updateDoc,
  } from 'firebase/firestore/lite';
import { 
  getStorage, ref, 
  getDownloadURL, uploadBytes, 
  deleteObject,
  } from "firebase/storage";
import { app } from "../Firebase/config";
import {Alert} from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


// API 1: registration
// MEMBUAT AKUN BARU DENGAN EMAIL DAN PASSWORD, 
// LALU MEMBUAT DOKUMEN BARU PADA COLLECTION PELANGGAN

export async function registration(email, password, namalengkap, phone) {
    const auth = getAuth();
    const db = getFirestore(app);
  try {
    await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setDoc(doc(db, "pelanggan", auth.currentUser.uid),{
                id_pelanggan: auth.currentUser.uid,
                email: email,
                namalengkap: namalengkap,
                phone: phone,
            })
        })
  } catch (err) {
    Alert.alert("Ada error membuat akun pelanggan!", err.message);
  }
};

// API 2: signIn
// MELAKUKAN LOGIN DENGAN EMAIL DAN PASSWORD,
// AKAN ERROR KALO SALAH TULIS/AKUN TIDAK ADA

export async function signIn(email, password) {
  const auth = getAuth();
  try { 
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    Alert.alert("User tidak ditemukan!", "Salah menulis email/kata sandi.");
    }
};

// API 3: handleSignOut
// KELUAR DARI DALAM AKUN YG SEDANG LOGIN,
// MENGUBAH AUTHSTATECHANGE DAN KELUAR

export async function handleSignOut() {
  const auth = getAuth();
  const db = getFirestore(app);
  try {
      signOut(auth);
  } catch (err) {
    Alert.alert('Ada error untuk keluar!', 'Tidak bisa keluar.');
  }
};

// API 4: updateakunTanpafoto
// PERBARUI DATA AKUN
// DI FIRESTORE TANPA FOTO DI STORAGE

export async function updateakunTanpafoto(namaakun, phoneakun){

  const auth = getAuth();
  const db = getFirestore(app);
  // const docRef = doc(db, "pelanggan", auth.currentUser.uid);
  // const colRef = collection(docRef, "produk")
  // const storage = getStorage();
  
  const docrefproduk = doc(db, "pelanggan", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try{
        updateDoc(docrefproduk, {
          namalengkap: namaakun,
          phone: phoneakun,
        });
        Alert.alert(
          'Data akun berhasil diperbarui','Data akunmu sudah terbarui.'
        );
      } catch (err) {
        Alert.alert('Ada error untuk memperbarui data akunmu!', err.message);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
}; 

// API 5: updateakunDenganfoto
// PERBARUI DATA AKUN
// DI FIRESTORE DENGAN FOTO DI STORAGE

export async function updateakunDenganfoto(fotoakun, namaakun, phoneakun){
  const urlgambarbaru = await uploadgambarakun(fotoakun);

  const auth = getAuth();
  const db = getFirestore(app);

  const storage = getStorage();
  
  const docrefproduk = doc(db, "pelanggan", auth.currentUser.uid);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      if(docSnap.data().foto_akun) {
        const imgURL =  docSnap.data().foto_akun;
        const storageRef = ref(storage, imgURL);
        try{
          deleteObject(storageRef);
          updateDoc(docrefproduk, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            phone: phoneakun,
          });
          Alert.alert(
            'Data akun berhasil diperbarui','Foto lama kamu juga sudah yang terbaru.'
          );
        } catch (err) {
          Alert.alert('Ada error untuk memperbarui data akun dengan ganti foto!', err.message);
        };
      } else{
        try{
          updateDoc(docrefproduk, {
            foto_akun: urlgambarbaru,
            namalengkap: namaakun,
            phone: phoneakun,
          });
          Alert.alert(
            'Data akun berhasil diperbarui','Data akunmu sudah terbarui.'
          );
        } catch (err) {
          Alert.alert('Ada error untuk memperbarui data akun foto terbaru!', err.message);
        };
      }
      
    } else {
      // doc.data() will be undefined in this case
      console.log("Tidak ada dokumen tersebut!");
    }
  })
};

// API 6: uploadgambarakun
// UPLOAD FOTO AKUN YANG DIOPER KE
// FUNGSI FIRESTORE SELANJUTNYA

async function uploadgambarakun(uri) {
  try{
    const uploadUri = uri;
    let extension = uploadUri.substring(uploadUri.lastIndexOf('.') + 1);

    // Add uuid to File Name
    filename = uuidv4() + '.' + extension;

    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
    });
    const fileRef = ref(getStorage(app), `pelanggan/${filename}`);
    const result = await uploadBytes(fileRef, blob);
    
    // We're done with the blob, close and release it
    blob.close();
    
    return await getDownloadURL(fileRef);
  } catch (err) {
    Alert.alert('Ada error pada foto akun!', err.message);
  }
};

// API 7: buatTransaksiPO
// MEMBUAT TRANSAKSI PO. 

export const buatTransaksiPO = async (alamat, geo, catatan, id_mitra, namalengkap_mitra, namatoko, namapelanggan, kelompokProduk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, jumlah_kuantitas) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  try{
    addDoc(collection(db, "transaksi"), {
      alamat_pelanggan: alamat,
      geo_alamat: geo,
      catatan: catatan,
      id_mitra: id_mitra, 
      namamitra: namalengkap_mitra,
      namatoko: namatoko,
      namapelanggan: namapelanggan,
      id_pelanggan: auth.currentUser.uid,
      waktu_dipesan: serverTimestamp(),
      jenislayanan: 'Pre-Order',
      status_transaksi: 'Dalam Proses',
      produk: kelompokProduk,
      hargasubtotal: subtotalhargaKeranjang,
      hargalayanan: hargalayanan,
      hargatotalsemua: hargatotalsemua,
      jumlah_kuantitas: jumlah_kuantitas,
    });
    Alert.alert(
      'Pre-Order berhasil dibuat','Produk akan diantar paling lambat 2x24 jam.'
    );
  } catch(err){
    console.log('Ada Error Membuat Tranksaksi.', error);
  };
};