import test from 'node:test';
import assert from 'node:assert/strict';
import {themes,getTheme} from '../themes.js';
function luminance(hex){const channels=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;}
function contrast(a,b){const values=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (values[0]+0.05)/(values[1]+0.05);}
test('全配色で本文・補助文字・ボタンのコントラストを確保',()=>{
  for(const t of themes){const c=t.colors;for(const bg of [c.bg,c.surface,c.side,c.soft]){assert.ok(contrast(c.ink,bg)>=4.5,`${t.id}: text on ${bg}`);assert.ok(contrast(c.muted,bg)>=4.5,`${t.id}: muted on ${bg}`);}assert.ok(contrast(t.id==='night'?'#191c22':'#ffffff',c.accent)>=4.5,t.id);}
});
test('未知の保存値は初期配色へ戻す',()=>assert.equal(getTheme('unknown').id,'graphite'));
