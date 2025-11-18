import React, {useMemo} from 'react'
import { ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts'

export default function DashboardPage({plan,setPlan}){
  const summary = useMemo(()=> {
    const total = plan.length
    const done = plan.filter(p=>p.status==='Done').length
    const bySubject = {}
    plan.forEach(p=> bySubject[p.subject]=(bySubject[p.subject]||0)+(p.status==='Done'?1:0))
    return {total,done,percent: Math.round(done/total*100)||0, bySubject}
  },[plan])

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-slate-500">Overall Progress</div>
          <div className="text-2xl font-semibold">{summary.percent}%</div>
          <div className="w-full bg-slate-100 h-3 rounded mt-2 overflow-hidden"><div style={{width:`${summary.percent}%`}} className="h-3 bg-emerald-400"/></div>
        </div>
        <div className="p-4 bg-white rounded shadow"><div className="text-sm text-slate-500">Days Completed</div><div className="text-2xl font-semibold">{summary.done}/{summary.total}</div></div>
        <div className="p-4 bg-white rounded shadow"><div className="text-sm text-slate-500">Subject Snapshot</div><div style={{height:120}}><ResponsiveContainer width="100%" height={100}><BarChart data={Object.keys(summary.bySubject).map(k=>({name:k,value:summary.bySubject[k]}))}><Tooltip/><Bar dataKey="value"/></BarChart></ResponsiveContainer></div></div>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <div className="flex gap-2">
          <button onClick={()=>{ const today = new Date().toISOString().slice(0,10); const idx=plan.findIndex(p=>p.date===today); if(idx>=0){ const copy=[...plan]; copy[idx].status = copy[idx].status==='Done'?'':'Done'; setPlan(copy);} }} className="px-3 py-2 bg-slate-800 text-white rounded">Toggle Today</button>
          <button onClick={()=>{ localStorage.removeItem('upsc_tracker_upgraded_v1'); window.location.reload(); }} className="px-3 py-2 border rounded">Reset Local</button>
        </div>
      </div>
    </div>
  )
}
