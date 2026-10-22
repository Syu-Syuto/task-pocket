export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export function selectTasks(tasks,{category='all',filter='open',query='',sort='due'}={}) {
  return tasks.filter(t => (category==='all'||t.categoryId===category) && (filter==='all'||(filter==='done'?t.status==='done':t.status!=='done')) && `${t.title} ${t.note}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())).sort((a,b)=>sort==='new'?b.createdAt-a.createdAt:(a.due||'9999').localeCompare(b.due||'9999')||b.createdAt-a.createdAt);
}
export function taskCounts(tasks,today=dayKey()) {const pending=tasks.filter(t=>t.status!=='done');return {pending:pending.length,today:pending.filter(t=>t.due===today).length,overdue:pending.filter(t=>t.due&&t.due<today).length};}
