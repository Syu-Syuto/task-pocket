import test from 'node:test';
import assert from 'node:assert/strict';
import {startFirebase} from '../firebase-start.js';

test('Firestoreの読み込みを待たずにログイン処理を使える',async()=>{
  const requested=[],instance={},session={};let resolveStore;
  const store=new Promise(resolve=>resolveStore=resolve);
  const started=await startFirebase({},async url=>{
    requested.push(url);
    if(url.endsWith('firebase-app.js'))return {initializeApp:()=>instance};
    if(url.endsWith('firebase-auth.js'))return {getAuth:app=>{assert.equal(app,instance);return session;}};
    return store;
  });
  assert.equal(started.session,session);
  assert.equal(requested.some(url=>url.includes('firestore')),false);
  const first=started.loadStore(),second=started.loadStore();
  assert.equal(first,second);
  assert.equal(requested.filter(url=>url.includes('firestore')).length,1);
  resolveStore({getFirestore:app=>{assert.equal(app,instance);return 'database';}});
  assert.equal((await first).db,'database');
});
test('Firestoreの取得失敗は認証の初期化を妨げない',async()=>{
  const session={};
  const started=await startFirebase({},async url=>{
    if(url.endsWith('firebase-app.js'))return {initializeApp:()=>({})};
    if(url.endsWith('firebase-auth.js'))return {getAuth:()=>session};
    throw Error('network unavailable');
  });
  assert.equal(started.session,session);
  await assert.rejects(started.loadStore(),/network unavailable/);
  assert.equal(started.session,session);
});