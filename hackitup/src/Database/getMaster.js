import { getDatabase, ref, set,onValue } from "firebase/database";
import { app } from "../config/firebase";



export const getAllData = (path, setData) => {
  const db = getDatabase(app);
  const allDataRef = ref(db, 'v1/' + path);
  onValue(allDataRef, (snapshot) => {
    const data = snapshot.val();
    setData(data);
    console.log('database wala',data);
  });
};

export const setAllData = (path, data) => {
  const db = getDatabase(app);
  const allDataRef = ref(db, 'v1/' + path);
  set(allDataRef, data);
};
