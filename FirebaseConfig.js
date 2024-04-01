import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBxvGBa3Mb5OZSE0QKpiS8zkxESAR9FdHQ",
  authDomain: "controledegastosrn.firebaseapp.com",
  projectId: "controledegastosrn",
  storageBucket: "controledegastosrn.appspot.com",
  messagingSenderId: "722444328197",
  appId: "1:722444328197:web:00b2a6721e1722b0e12b6c"
};

// Inicialização do Firebase com a configuração definida acima
export const FIREBASE_APP = initializeApp(firebaseConfig);
// Obtenção da instância de autenticação do Firebase
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// Obtenção da instância do banco de dados em tempo real do Firebase
export const REALTIME_DB = getDatabase(FIREBASE_APP);