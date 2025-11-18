import React, {useState, useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import PlanPage from './pages/PlanPage'
import SubjectPage from './pages/SubjectPage'
import samplePlan from './sample/samplePlan'

const STORAGE_KEY = 'upsc_tracker_upgraded_v1'

export default function App(){
  const [plan, setPlan] = useState(()=> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch(e){}
    return samplePlan()
  })
  const [theme, setTheme] = useState(()=> localStorage.getItem('theme')||'light')

  useEffect(()=> {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(plan)) } catch(e){}
  },[plan])

  useEffect(()=> {
    document.documentElement.setAttribute('data-theme', theme==='dark'?'dark':'light')
    localStorage.setItem('theme', theme)
  },[theme])

  return (
    <div className="min-h-screen flex">
      <Sidebar theme={theme} setTheme={setTheme} />
      <div className="flex-1 p-6">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage plan={plan} setPlan={setPlan} />} />
          <Route path="/plan" element={<PlanPage plan={plan} setPlan={setPlan} />} />
          <Route path="/subject/:name" element={<SubjectPage plan={plan} setPlan={setPlan} />} />
        </Routes>
      </div>
    </div>
  )
}
