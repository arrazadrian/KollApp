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

export const buatTransaksiPO = async (alamat, geo, catatan_lokasi, id_mitra, namalengkap_mitra, namatoko, phonemitra, namapelanggan, kelompokProduk, catatan_produk, subtotalhargaKeranjang, hargalayanan, hargatotalsemua, id_voucher, potongan, jumlah_kuantitas) => {  
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
        namamitra: namalengkap_mitra,
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
        id_voucher: id_voucher,
        potongan: potongan,
        pembayaran: 'Belum Lunas',
      });
      return docRef.id
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi.', err);
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// API 8: buatTransaksiPM
// MEMBUAT TRANSAKSI PM.

export const buatTransaksiPM = async (alamat, geo, catatan_lokasi, id_mitra, namalengkap_mitra, namatoko, phonemitra, namapelanggan, hargalayanan) => {  
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
        // produk: kelompokProduk,
        // hargasubtotal: subtotalhargaKeranjang,
        // hargalayanan: hargalayanan,
        // hargatotalsemua: hargatotalsemua,
        // jumlah_kuantitas: jumlah_kuantitas,
      }); 
      console.log("ID dokumennya: ", docRef.id)
      return docRef.id;
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi.', err);
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// API 9: noRespon
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

// API 10: batalPMolehPelanggan
//  PELANGGAN MEMBATALKAN PANGGILAN SAAT OTW

export const batalPMolehPelanggan = async (id_transaksi) => {
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docreftran, { 
            pembatalan: "Dibatalkan Pelanggan", 
            status_transaksi: "Selesai",
            waktu_pembatalan: serverTimestamp(),  
          });
      } catch (err) {
        Alert.alert('Ada error batalin PM!', err);
      }
    }
  })
};

// API 11: kirimRating
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

// // API 12: updatePoinPotongan
// // POTONGAN PELANGGAN MASUK POIN POTONGAN MITRA

// export const updatePoinPotongan = async (id_mitra, potongan) => {
//   const db = getFirestore(app);
//   const docrefmitra = doc(db, "mitra", id_mitra);
//   getDoc(docrefmitra).then(docSnap => {
//     if (docSnap.exists()) {
//       try {
//           let awal = docSnap.data().poin_potongan
//           updateDoc(docrefmitra, { 
//             poin_potongan: awal + potongan, 
//           });
//       } catch (err) {
//         Alert.alert('Ada error masuk poin mitra!', err);
//       }
//     }
//   })
// };

// // API 13: updateJmlVoucher
// // POTONGAN PELANGGAN MASUK POIN POTONGAN MITRA

// export const updateJmlVoucher = async (id_voucher) => {
//   const db = getFirestore(app);
//   const docrefmitra = doc(db, "promosi", id_voucher);
//   getDoc(docrefmitra).then(docSnap => {
//     if (docSnap.exists()) {
//       try {
//           let awal = docSnap.data().jml_pengguna
//           updateDoc(docrefmitra, { 
//             jml_pengguna: awal + 1, 
//           });
//       } catch (err) {
//         Alert.alert('Ada error update voucher!', err);
//       }
//     }
//   })
// };

// API 12: updateVoucherMitra
// MENAMBAH TRANSAKSI DALAM KASBON. 

export const updateVoucherMitra = async (id_mitra, id_voucher, potongan) => {  
  const db = getFirestore(app);
  const docRefVou = doc(db, "promosi", id_voucher);
  const docSnapVou = await getDoc(docRefVou);
  const docRefMit = doc(db, "mitra", id_mitra);
  const docSnapMit= await getDoc(docRefMit);
  try{
    if(docSnapVou.exists() && docSnapMit.exists()){
      let awal_pengguna =  docSnapVou.data().jml_pengguna
      let awal_poin =  docSnapMit.data().poin_potongan
      let jml_terbaru = awal_pengguna + 1
      await updateDoc(docRefVou, { 
          jml_pengguna: awal_pengguna + 1, 
      });
      updateDoc(docRefMit, { 
          poin_potongan: awal_poin + potongan, 
      });
      return jml_terbaru
    } else {
      console.log("No such document!");
    }
   
  } catch(err){
    console.log('Ada Error update voucher.', err);
  };
};


// API 13: updateTersediaVoucher
// VOUCHER SUDAH MEMENUHU KUOTA ATAU BELUM

export const updateTersediaVoucher = async (id_mitra, id_voucher, potongan) => {  
  const jml_terbaru = await updateVoucherMitra(id_mitra, id_voucher, potongan)

  const db = getFirestore(app);
  const docRef = doc(db, "promosi", id_voucher);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
      if( jml_terbaru >= docSnap.data().kuota){
        updateDoc(docRef, { 
          tersedia: false, 
        });
      }
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error update kesediaan voucher.', err);
  };
};