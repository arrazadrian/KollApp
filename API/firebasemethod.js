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

export const buatTransaksiPO = async (alamat, geo, catatan_lokasi, id_mitra, namamitra, namatoko, phonemitra, namapelanggan, kelompokProduk, catatan_produk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, jumlah_kuantitas, pembayaran) => {  
  const auth = getAuth();
  const db = getFirestore(app);

  const docRef = doc(db, "pelanggan", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    try{
    const docRef = await addDoc(collection(db, "transaksi"), {
        alamat_pelanggan: alamat,
        geo_alamat: geo,
        catatan_lokasi: catatan_lokasi,
        id_mitra: id_mitra, 
        namamitra: namamitra,
        namatoko: namatoko,
        phonemitra: phonemitra,
        namapelanggan: namapelanggan,
        phonepelanggan: docSnap.data().phone,
        id_pelanggan: auth.currentUser.uid,
        waktu_dipesan: serverTimestamp(),
        jenislayanan: 'Pre-Order',
        status_transaksi: 'Dalam Proses',
        produk: kelompokProduk,
        catatan_produk: catatan_produk,
        hargasubtotal: subtotalhargaKeranjang,
        hargalayanan: hargalayanan,
        hargatotalsemua: hargatotalsemua,
        jumlah_kuantitas: jumlah_kuantitas,
        pembayaran: pembayaran,
      });
      Alert.alert(
        'Pre-Order berhasil dibuat','Produk akan diantar paling lambat 1x24 jam.'
        );
      return docRef.id
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi.', err);
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// API 7: buatTransaksiPM
// MEMBUAT TRANSAKSI PM.

export const buatTransaksiPM = async (alamat, geo, catatan_lokasi, id_mitra, namalengkap_mitra, namatoko, phonemitra, namapelanggan, hargalayanan, pembayaran) => {  
  const auth = getAuth();
  const db = getFirestore(app);

  const docRef = doc(db, "pelanggan", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let phonepelanggan = docSnap.data().phone;
    try{
    const docRef = await addDoc(collection(db, "transaksi"), {
        alamat_pelanggan: alamat,
        geo_alamat: geo,
        catatan_lokasi: catatan_lokasi,
        id_mitra: id_mitra, 
        namamitra: namalengkap_mitra,
        namatoko: namatoko,
        phonemitra: phonemitra,
        namapelanggan: namapelanggan,
        phonepelanggan: phonepelanggan,
        id_pelanggan: auth.currentUser.uid,
        waktu_dipesan: serverTimestamp(),
        jenislayanan: 'Panggil Mitra',
        status_transaksi: 'Dalam Proses',
        panggilan: "Menunggu Respon",
        hargalayanan: hargalayanan,
        pembayaran: pembayaran,
        // produk: kelompokProduk,
        // hargasubtotal: subtotalhargaKeranjang,
        // hargalayanan: hargalayanan,
        // hargatotalsemua: hargatotalsemua,
        // jumlah_kuantitas: jumlah_kuantitas,
      }); 
      console.log("ID dokumennya: ", docRef.id)
      return docRef.id;
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi.', error);
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// API 8: noRespon
// UPDATE PANGGILAN PM JADI TIDAK ADA RESPON

export const noRespon = async (id_transaksi) => {
  const db = getFirestore(app);
  const docrefproduk = doc(db, "transaksi", id_transaksi);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docrefproduk, { 
            panggilan: "Tidak ada respon", 
            status_transaksi:  "Tidak ada respon",  
          });
      } catch (err) {
        Alert.alert('Ada error pada no respon PM!', err);
      }
    }
  })
};

// API 9: batalPMolehPelanggan
//  PELANGGAN MEMBATALKAN PANGGILAN SAAT OTW

export const batalPMolehPelanggan = async (id_transaksi) => {
  const db = getFirestore(app);
  const docrefproduk = doc(db, "transaksi", id_transaksi);
  getDoc(docrefproduk).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docrefproduk, { 
            panggilan: "Dibatalkan Pelanggan", 
            status_transaksi: "Dibatalkan Pelanggan",
            waktu_pembatalan: serverTimestamp(),  
          });
      } catch (err) {
        Alert.alert('Ada error merima PM!', err);
      }
    }
  })
};

// API 10: kirimRating
// PELANGGAN MENILAI MITRA

export const kirimRating = async (pilihlayanan, pilihproduk, id_mitra, id_transaksi) => {
  const db = getFirestore(app);
  const docrefmitra = doc(db, "mitra", id_mitra);
  const docreftransaksi = doc(db, "transaksi", id_transaksi);
  
  const docSnap = await getDoc(docrefmitra);

  if(docSnap.exists()){
    //Pambilang Layanan -> jml_nilai_layanan
    let jml_nilai_layanan = docSnap.data().jml_nilai_layanan + pilihlayanan;
    //Pambilang Produk -> jml_nilai_produk
    let jml_nilai_produk = docSnap.data().jml_nilai_produk + pilihproduk;
    //Penyebut atau pembagi -> n_sekarang
    let n_sekarang =  docSnap.data().nilai_masuk + 1;
    //Hasil rating layanan -> rating_layanan
    let rating_layanan = jml_nilai_layanan/n_sekarang;
    //Hasil rating produk -> rating_produk
    let rating_produk = jml_nilai_produk/n_sekarang;
    
    getDoc(docrefmitra).then(docSnap => {
      if (docSnap.exists()) {
        try {
            updateDoc(docrefmitra, { 
              rating_layanan: rating_layanan, 
              rating_produk: rating_produk, 
              jml_nilai_layanan: jml_nilai_layanan,
              jml_nilai_produk: jml_nilai_produk,
              nilai_masuk: n_sekarang,  
            });
        } catch (err) {
          Alert.alert('Ada error kirim rating mitra!', err);
        }
      }
    }); 

    getDoc(docreftransaksi).then(docSnap => {
      if (docSnap.exists()) {
        try {
            updateDoc(docreftransaksi, { 
              rating_layanan: pilihlayanan, 
              rating_produk: pilihproduk, 
            });
        } catch (err) {
          Alert.alert('Ada error kirim rating transaksi!', err);
        }
      }
    }); 

  }
};


// API 11: buatKasbonBaru
// MEMBUAT KASBON BARU. 

export const buatKasbonBaru = async ( namamitra, namatoko, id_mitra, phonemitra, namapelanggan, hargatotalsemua, id_transaksi) => {  
  const auth = getAuth();
  const db = getFirestore(app);

  const docRef = doc(db, "pelanggan", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
    const docRef = await addDoc(collection(db, "kasbon"), {
        id_mitra: id_mitra, 
        namamitra: namamitra,
        namatoko: namatoko,
        phonemitra: phonemitra,
        phonepelanggan: docSnap.data().phone,
        id_pelanggan: auth.currentUser.uid,
        namapelanggan: namapelanggan,
        status_kasbon: "Belum Lunas",
        waktu_dibuat: serverTimestamp(),
        total_kasbon: hargatotalsemua,
      });
    const colRef = collection(docRef,"transaksi_kasbon")
    addDoc(colRef,{
      id_transaksi: id_transaksi,
      waktu_transaksi: serverTimestamp(),
      total_harga: hargatotalsemua,
    });
    }
  } catch(err){
    console.log('Ada Error Membuat Kasbon.', err);
  };
};

// API 12: tambahTransaksiKasbon
// MENAMBAH TRANSAKSI DALAM KASBON. 

export const tambahTransaksiKasbon = async (id_kasbon, hargatotalsemua, id_transaksi) => {  
  const db = getFirestore(app);
  const docRef = doc(db, "kasbon", id_kasbon);
  const docSnap = await getDoc(docRef);
  const colRef = collection(docRef, "transaksi_kasbon");
  try{
    if(docSnap.exists()){
        let total_kasbon = docSnap.data().total_kasbon + hargatotalsemua;

        updateDoc(docRef, { 
            total_kasbon: total_kasbon, 
          });
           
        addDoc(colRef,{
          id_transaksi: id_transaksi,
          total_harga: hargatotalsemua,
          waktu_transaksi: serverTimestamp(),
        });
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error manambah tranksaksi kasbon.', err);
  };
};