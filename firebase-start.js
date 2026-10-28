const base='https://www.gstatic.com/firebasejs/12.4.0/';
// Authentication becomes available before the larger Firestore module is loaded.
export async function startFirebase(config,loadModule=url=>import(url)){
  const [app,auth]=await Promise.all([loadModule(base+'firebase-app.js'),loadModule(base+'firebase-auth.js')]);
  const instance=app.initializeApp(config),session=auth.getAuth(instance);
  let storePromise;
  return {auth,session,loadStore(){
    return storePromise??=(loadModule(base+'firebase-firestore.js').then(db=>({...db,db:db.getFirestore(instance)})));
  }};
}