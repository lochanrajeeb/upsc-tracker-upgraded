import React from 'react'
import { useParams } from 'react-router-dom'

export default function SubjectPage({plan,setPlan}){
  const {name} = useParams()
  const filtered = name==='Master' ? plan : plan.filter(p=>p.subject===name)
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{name} Plan</h2>
      <div className="grid grid-cols-1 gap-2">
        {filtered.slice(0,60).map(p=> (<div key={p.id} className="p-3 bg-white rounded shadow">{p.date} • {p.subject} • {p.topic} • {p.status}</div>))}
      </div>
    </div>
  )
}
