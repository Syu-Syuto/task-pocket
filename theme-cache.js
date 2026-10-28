(function(root){
  const prefix='task-pocket-palette-v2:',activeKey=prefix+'active';
  const ids=['graphite','navy','burgundy','cobalt','ochre','night'];
  const fields=['bg','surface','side','ink','muted','line','accent','hover','soft','danger'];
  function valid(v){return v&&ids.includes(v.theme)&&v.colors&&fields.every(k=>/^#[0-9a-f]{6}$/i.test(v.colors[k]));}
  function read(owner){try{const v=JSON.parse(root.localStorage.getItem(prefix+owner));return valid(v)?v:null;}catch{return null;}}
  function active(){try{const owner=root.localStorage.getItem(activeKey);return owner?read(owner):null;}catch{return null;}}
  function write(owner,theme,colors){if(!valid({theme,colors}))return false;try{root.localStorage.setItem(prefix+owner,JSON.stringify({theme,colors}));root.localStorage.setItem(activeKey,owner);return true;}catch{return false;}}
  function clearActive(){try{root.localStorage.removeItem(activeKey);}catch{}}
  root.TaskPocketThemeCache={read,active,write,clearActive};
  const v=root.document&&active();
  if(v){const e=root.document.documentElement;for(const k of fields)e.style.setProperty('--'+k,v.colors[k]);e.style.setProperty('--on-accent',v.theme==='night'?'#191c22':'#ffffff');e.dataset.theme=v.theme;e.style.colorScheme=v.theme==='night'?'dark':'light';root.document.querySelector('meta[name="theme-color"]')?.setAttribute('content',v.colors.accent);}
})(globalThis);