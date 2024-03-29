import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
   } from "firebase/auth";
import { 
  getFirestore, collection, 
  addDoc, setDoc, doc, 
  serverTimestamp, getDoc, updateDoc,
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
                akun: "Aktif",
                id_pelanggan: auth.currentUser.uid,
                email: email,
                namalengkap: namalengkap,
                phone: phone,
                token_notif: "",
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
  
  const docrefakun = doc(db, "pelanggan", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      try{
        updateDoc(docrefakun, {
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
  
  const docrefakun = doc(db, "pelanggan", auth.currentUser.uid);
  getDoc(docrefakun).then(docSnap => {
    if (docSnap.exists()) {
      if(docSnap.data().foto_akun) {
        const imgURL =  docSnap.data().foto_akun;
        const storageRef = ref(storage, imgURL);
        try{
          deleteObject(storageRef);
          updateDoc(docrefakun, {
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
          updateDoc(docrefakun, {
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

export const buatTransaksiPO = async (
      alamat, geo, catatan_lokasi, id_mitra, namalengkap_mitra, namatoko, phonemitra, 
      namapelanggan, kelompokProduk, catatan_produk, subtotalhargaKeranjang, hargalayanan, 
      hargatotalsemua, id_voucher, potongan, jumlah_kuantitas, token_notifmitra) => {  
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
      notifPOmasuk(token_notifmitra)
      return docRef.id
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi.', err.message);
    };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// API 8: buatTransaksiPM
// MEMBUAT TRANSAKSI PM.

export const buatTransaksiPM = async (
  alamat, geo, catatan_lokasi, id_mitra, namalengkap_mitra, 
  namatoko, phonemitra, namapelanggan, hargalayanan, token_notifmitra) => {  
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
          pembayaran: "Belum Lunas",
        });
      notifPMmasuk(token_notifmitra) 
      console.log("ID dokumennya: ", docRef.id)
      return docRef.id;
    } catch(err){
      console.log('Ada Error Membuat Tranksaksi PM.', err.message);
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
  const docreftran = doc(db, "transaksi", id_transaksi);
  getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
          updateDoc(docreftran, { 
            panggilan: "Tidak ada respon", 
            status_transaksi:  "Tidak ada respon",  
          });
      } catch (err) {
        Alert.alert('Ada error pada no respon PM!', err.message);
      }
    }
  })
};

// API 10: batalPMolehPelanggan
//  PELANGGAN MEMBATALKAN PANGGILAN SAAT OTW

export const batalPMolehPelanggan = async (id_transaksi, id_mitra, token_notifmitra) => {
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  const docrefmit = doc(db, "mitra", id_mitra);
  await getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
        updateDoc(docreftran, {
          pembatalan: "Dibatalkan Pelanggan", 
          status_transaksi: "Selesai",
          waktu_selesai: serverTimestamp(),  
        });
        notifPMpelangganbatal(token_notifmitra)
      } catch (err) {
        Alert.alert('Ada error untuk membatalkan PO dari pelanggan!', err.message);
      }
    }
  })
  await getDoc(docrefmit).then(docSnap => {
    if (docSnap.exists()) {
      try {
        updateDoc(docrefmit, { 
          dipanggil: false, 
        });
      } catch (err) {
        Alert.alert('Ada error untuk update status dipanggil!', err.message);
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
          Alert.alert('Ada error kirim rating mitra!', err.message);
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
          Alert.alert('Ada error kirim rating transaksi!', err.message);
        }
      }
    }); 

  }
};

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
    console.log('Ada Error update voucher.', err.message);
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
    console.log('Ada Error update kesediaan voucher.', err.message);
  };
};

// API 14: batalkanPO
//  PELANGGAN MEMBATALKAN PO

export const batalkanPO = async (id_transaksi, id_mitra, potongan) => {
  const db = getFirestore(app);
  const docreftran = doc(db, "transaksi", id_transaksi);
  await getDoc(docreftran).then(docSnap => {
    if (docSnap.exists()) {
      try {
        if(potongan > 0){
          kurangiTersediaVoucher(id_voucher, potongan)
        }
        updateDoc(docreftran, {
          pembatalan: "Dibatalkan Pelanggan", 
          status_transaksi: "Selesai",
          waktu_selesai: serverTimestamp(),  
        });
        notifPOpelangganbatal(id_mitra)
      } catch (err) {
        Alert.alert('Ada error untuk membatalkan PO dari pelanggan!', err.message);
      }
    }
  })
};

// API 15: kurangVoucherMitra
// MENGURANGI JML DATA VOUCHER. 

export const kurangVoucherMitra = async (id_voucher, potongan) => {  
  const auth = getAuth();
  const db = getFirestore(app);
  const docRefVou = doc(db, "promosi", id_voucher);
  const docSnapVou = await getDoc(docRefVou);
  const docRefMit = doc(db, "mitra", auth.currentUser.uid);
  const docSnapMit= await getDoc(docRefMit);
  try{
    if(docSnapVou.exists() && docSnapMit.exists()){
      let awal_pengguna =  docSnapVou.data().jml_pengguna
      let awal_poin =  docSnapMit.data().poin_potongan
      let jml_terbaru = awal_pengguna - 1
      await updateDoc(docRefVou, { 
          jml_pengguna: awal_pengguna - 1, 
      });
      updateDoc(docRefMit, { 
          poin_potongan: awal_poin - potongan, 
      });
      return jml_terbaru
    } else {
      console.log("No such document!");
    }
   
  } catch(err){
    console.log('Ada Error update pengurangan voucher.', err.message);
  };
};

//API 16: kurangiTersediaVoucher
// VOUCHER SUDAH MEMENUHU KUOTA ATAU BELUM

export const kurangiTersediaVoucher = async (id_voucher, potongan) => {  
  const jml_terbaru = await kurangVoucherMitra(id_voucher, potongan)

  const db = getFirestore(app);
  const docRef = doc(db, "promosi", id_voucher);
  const docSnap = await getDoc(docRef);
  try{
    if(docSnap.exists()){
      if( jml_terbaru < docSnap.data().kuota){
        updateDoc(docRef, { 
          tersedia: true, 
        });
      }
    } else {
      console.log("No such document!");
    }
  } catch(err){
    console.log('Ada Error update kesediaan voucher.', err.message);
  };
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications

// API 17: notifPOmasuk
// NOTIF UNTUK MITRA BAHWA PO MASUK

async function notifPOmasuk(token_notifmitra) {
  const message = {
    to: token_notifmitra,
    sound: 'default',
    title: 'Ada pesanan Pre-Order',
    body: 'Pre-order baru telah masuk!',
    // data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// API 18: notifPMmasuk
// NOTIF UNTUK MITRA BAHWA ADA PANGGILAN

async function notifPMmasuk(token_notifmitra) {
  const message = {
    to: token_notifmitra,
    sound: 'default',
    title: 'Ada panggilan mitra',
    body: 'Pelanggan memanggil kamu untuk datang',
    // data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// API 19: notifPMpelangganbatal
// NOTIF UNTUK MITRA BAHWA PM DIBATALKAN PELANGGAN

async function notifPMpelangganbatal(token_notifmitra) {
  const message = {
    to: token_notifmitra,
    sound: 'default',
    title: 'Panggilan dibatalkan pelanggan',
    body: 'Mohon maaf, pelanggan membatalkan panggilan',
    // data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// API 20: notifPOpelangganbatal
// NOTIF UNTUK MITRA BAHWA PO DIBATALKAN PELANGGAN

async function notifPOpelangganbatal(id_mitra) {
  const db = getFirestore(app);
  const docrefmit = doc(db, "mitra", id_mitra);
  await getDoc(docrefmit).then(docSnap => {
    if (docSnap.exists()) {
      try{
        const message = {
          to: docSnap.data().token_notif,
          sound: 'default',
          title: 'Pre-Order dibatalkan pelanggan',
          body: 'Mohon maaf, pelanggan membatalkan pesanan',
          // data: { someData: 'goes here' },
        };

        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

      } catch (err){
        Alert.alert('Ada error untuk notif batal PO dari pelanggan!', err.message);
      }
    }
  })
};