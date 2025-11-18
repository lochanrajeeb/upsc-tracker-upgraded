import React from 'react'
import { NavLink } from 'react-router-dom'

const subjects = ["Master","History","Geography","Polity","Economy","Environment","S&T","CSAT","Sociology"]

export default function Sidebar({theme,setTheme}){
  return (
    <aside className="w-64 bg-white p-4 shadow-sm h-full">
      <div className="mb-4"><div className="text-lg font-semibold">UPSC Tracker</div><div className="text-sm text-slate-500">Upgraded</div></div>
      <nav className="flex flex-col gap-2 mb-4">
        <NavLink to="/plan" className={({isActive})=>`p-2 rounded ${isActive? 'bg-slate-100':''}`}>Master</NavLink>
        {subjects.filter(s=>s!=='Master').map(s=> (<NavLink key={s} to={`/subject/${s}`} className={({isActive})=>`p-2 rounded ${isActive? 'bg-slate-100':''}`}>{s}</NavLink>))}
      </nav>
      <div className="mt-4">
        <label className="flex items-center gap-2"><input type="checkbox" checked={theme==='dark'} onChange={e=>setTheme(e.target.checked?'dark':'light')} /> Dark mode</label>
      </div>
      <div className="mt-4 text-xs text-slate-500">Firebase: add your config in src/firebaseConfig.js</div>
    </aside>
  )
}
