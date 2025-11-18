export default function samplePlan(){
  const start = new Date('2025-11-18')
  const end = new Date('2026-05-25')
  const subjects = ['History','Geography','Polity','Economy','Environment','S&T','CSAT','Revision']
  const arr = []
  let id = 1
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const copy = new Date(d)
    arr.push({
      id: id++,
      date: copy.toISOString().slice(0,10),
      day: copy.toLocaleDateString(undefined,{weekday:'short'}),
      subject: subjects[(id-2)%subjects.length],
      topic: 'Daily Target',
      mcqs: (copy.getDay()===0||copy.getDay()===6)?80:50,
      csat: (copy.getDay()===0||copy.getDay()===6)?'30 min':'15 min',
      sociology: (copy.getDay()===0)?'Light Revision':'',
      status: ''
    })
  }
  return arr
}