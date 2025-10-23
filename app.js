const STORAGE_KEY='testDashboard_v1';
function ensureData(){let d=localStorage.getItem(STORAGE_KEY);return d?JSON.parse(d):{tests:[]};}
function saveData(d){localStorage.setItem(STORAGE_KEY,JSON.stringify(d));}
function exportCSV(){
 const data=ensureData().tests;if(!data.length)return alert('No data');
 const csv=['id,title,maxScore,score,category,createdAt',...data.map(t=>[t.id,t.title,t.maxScore,t.score,t.category,t.createdAt].join(','))].join('\n');
 const blob=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='tests.csv';a.click();
}
function importCSV(file){const r=new FileReader();r.onload=e=>{const [head,...lines]=e.target.result.split(/\r?\n/);
 const tests=lines.filter(Boolean).map(l=>{const[v1,v2,v3,v4,v5,v6]=l.split(',');return{id:v1,title:v2,maxScore:+v3,score:v4?+v4:null,category:v5,createdAt:v6};});
 saveData({tests});alert('Imported '+tests.length+' tests');};r.readAsText(file);}
document.getElementById('exportCSV').onclick=exportCSV;
document.getElementById('importCSV').addEventListener('change',e=>{if(e.target.files[0])importCSV(e.target.files[0]);});
