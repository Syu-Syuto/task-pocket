import test from 'node:test';
import assert from 'node:assert/strict';
import {dayKey,selectTasks,taskCounts} from '../model.js';
const tasks=[{id:'a',title:'レポート',note:'数学',categoryId:'school',status:'todo',due:'2026-10-22',createdAt:1},{id:'b',title:'買い物',note:'',categoryId:'',status:'done',due:'2026-10-20',createdAt:2},{id:'c',title:'準備',note:'',categoryId:'school',status:'doing',due:'2026-10-21',createdAt:3},{id:'d',title:'予約',note:'',categoryId:'',status:'todo',due:'',createdAt:4}];
test('締切順で日付のない課題は最後、完了は除外',()=>assert.deepEqual(selectTasks(tasks).map(t=>t.id),['c','a','d']));
test('カテゴリー・検索・完了の絞り込み',()=>{assert.deepEqual(selectTasks(tasks,{category:'school',query:'数学'}).map(t=>t.id),['a']);assert.deepEqual(selectTasks(tasks,{filter:'done'}).map(t=>t.id),['b']);});
test('完了課題を期限切れに数えない',()=>assert.deepEqual(taskCounts(tasks,'2026-10-22'),{pending:3,today:1,overdue:1}));
test('現地のカレンダー日付を使う',()=>assert.equal(dayKey(new Date(2026,9,22,0,1)),'2026-10-22'));
