export const themes = [
  {id:'graphite',name:'グラファイト',description:'白 × チャコール',colors:{bg:'#f4f4f5',surface:'#ffffff',side:'#e9e9ec',ink:'#242429',muted:'#606069',line:'#d4d4da',accent:'#303039',hover:'#484852',soft:'#e5e5ea',danger:'#a73535'}},
  {id:'navy',name:'ネイビー',description:'白 × ネイビー × ブルー',colors:{bg:'#f1f4f8',surface:'#ffffff',side:'#e5ebf3',ink:'#17263d',muted:'#55667c',line:'#ccd6e3',accent:'#234b7b',hover:'#17365c',soft:'#dce7f5',danger:'#a73535'}},
  {id:'burgundy',name:'ボルドー',description:'アイボリー × ボルドー',colors:{bg:'#faf6f1',surface:'#fffdf9',side:'#f0e6df',ink:'#382b2c',muted:'#72605f',line:'#dfcfc8',accent:'#79364a',hover:'#5e2738',soft:'#efdee1',danger:'#a33126'}},
  {id:'cobalt',name:'コバルト',description:'白 × 鮮やかな青',colors:{bg:'#f4f6fc',surface:'#ffffff',side:'#e7ecfa',ink:'#20263d',muted:'#5c637b',line:'#d0d7eb',accent:'#244cd2',hover:'#1937a3',soft:'#e0e7ff',danger:'#ad303e'}},
  {id:'ochre',name:'マスタード',description:'生成り × 墨色 × 黄土色',colors:{bg:'#f7f4e9',surface:'#fffef8',side:'#eee7d3',ink:'#332e21',muted:'#6d6450',line:'#d8cfb4',accent:'#755414',hover:'#583d0b',soft:'#f0e3b9',danger:'#a33329'}},
  {id:'night',name:'ナイト',description:'ダークグレー × アイスブルー',colors:{bg:'#191c22',surface:'#232730',side:'#20242b',ink:'#eef0f5',muted:'#b2bac8',line:'#444c5c',accent:'#b7d5fb',hover:'#d3e5ff',soft:'#354459',danger:'#ffb3b3'}}
];
export const defaultTheme='graphite';
export function getTheme(id){return themes.find(t=>t.id===id)||themes[0];}
export function applyTheme(id){const t=getTheme(id);for(const [key,value] of Object.entries(t.colors))document.documentElement.style.setProperty(`--${key}`,value);document.documentElement.style.setProperty('--on-accent',t.id==='night'?'#191c22':'#ffffff');document.documentElement.dataset.theme=t.id;document.documentElement.style.colorScheme=t.id==='night'?'dark':'light';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',t.colors.accent);return t.id;}
