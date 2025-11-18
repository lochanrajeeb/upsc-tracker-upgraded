import React, {useState} from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function PlanPage({plan,setPlan}){
  const [filter,setFilter] = useState('All')

  function toggleDone(id){
    const copy = plan.map(p=> p.id===id? {...p, status: p.status==='Done'?'':'Done'}:p)
    setPlan(copy)
  }

  function updateField(id, field, value){
    const copy = plan.map(p=> p.id===id? {...p, [field]: value}:p)
    setPlan(copy)
  }

  function exportExcel(){
    const ws = XLSX.utils.json_to_sheet(plan)
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Tracker')
    const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'})
    const blob = new Blob([wbout], {type:'application/octet-stream'})
    saveAs(blob, 'upsc_tracker_export.xlsx')
  }

  function importExcel(e){
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (evt)=> {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, {type:'array'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, {defval:''});
      if(json.length) setPlan(json.map((r,i)=>({...r, id:i+1})));
    };
    reader.readAsArrayBuffer(file);
  }

  const filtered = filter==='All' ? plan : plan.filter(p=>p.subject===filter)

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 border rounded">
          <option>All</option><option>History</option><option>Geography</option><option>Polity</option><option>Economy</option><option>Environment</option><option>S&T</option><option>CSAT</option>
        </select>
        <button onClick={exportExcel} className="px-3 py-2 bg-slate-800 text-white rounded">Export Excel</button>
        <label className="px-3 py-2 bg-white border rounded cursor-pointer">Import Excel <input type="file" accept=".xlsx,.xls" onChange={importExcel} className="hidden" /></label>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead className="text-sm text-slate-600"><tr><th className="p-2">Date</th><th>Day</th><th>Subject</th><th>Topic</th><th>MCQs</th><th>CSAT</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(row=> (
              <tr key={row.id} className="border-t">
                <td className="p-2">{row.date}</td>
                <td>{row.day}</td>
                <td>{row.subject}</td>
                <td><input value={row.topic} onChange={e=>updateField(row.id,'topic',e.target.value)} className="w-full p-1 border rounded" /></td>
                <td><input value={row.mcqs} onChange={e=>updateField(row.id,'mcqs',e.target.value)} className="w-24 p-1 border rounded" /></td>
                <td><input value={row.csat} onChange={e=>updateField(row.id,'csat',e.target.value)} className="w-28 p-1 border rounded" /></td>
                <td><label className="inline-flex items-center"><input type="checkbox" checked={row.status==='Done'} onChange={()=>toggleDone(row.id)} className="mr-2" />Done</label></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
