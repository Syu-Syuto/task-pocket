import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {themes} from '../themes.js';
const source=readFileSync(new URL('../theme-cache.js',import.meta.url),'utf8');
function environment(values=new Map(),blocked=false){
  const properties={},element={style:{setProperty:(k,v)=>properties[k]=v},dataset:{}};
  const context={localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return values.get(k)??null;},setItem:(k,v)=>{if(blocked)throw Error('blocked');values.set(k,v);},removeItem:k=>values.delete(k)},document:{documentElement:element,querySelector:()=>({setAttribute(){}})}};
  vm.runInNewContext(source,context);
  return {cache:context.TaskPocketThemeCache,properties,element,values};
}

test('Firebaseなしで次回起動の最初に保存色を適用する',()=>{
  const first=environment(),night=themes.find(t=>t.id==='night');
  assert.equal(first.cache.write('user-A',night.id,night.colors),true);
  const reopened=environment(first.values);
  assert.equal(reopened.properties['--bg'],night.colors.bg);
  assert.equal(reopened.element.dataset.theme,'night');
});
test('複数アカウントの配色を分け、ログアウトで自動復元を解除する',()=>{
  const {cache,values}=environment();
  cache.write('user-A',themes[1].id,themes[1].colors);
  cache.write('user-B',themes[2].id,themes[2].colors);
  assert.equal(cache.read('user-A').theme,'navy');
  assert.equal(cache.read('user-B').theme,'burgundy');
  cache.clearActive();
  assert.equal(environment(values).element.dataset.theme,undefined);
  assert.equal(cache.read('user-A').theme,'navy');
});
test('破損したキャッシュや保存禁止でも起動を妨げない',()=>{
  const values=new Map([['task-pocket-palette-v2:active','broken'],['task-pocket-palette-v2:broken','{']]);
  assert.equal(environment(values).cache.active(),null);
  const blocked=environment(new Map(),true);
  assert.equal(blocked.cache.active(),null);
  assert.equal(blocked.cache.write('A',themes[0].id,themes[0].colors),false);
});