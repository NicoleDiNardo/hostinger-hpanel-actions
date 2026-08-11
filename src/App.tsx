import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ActionsProvider } from './context/ActionsContext'
import { AppShell } from './components/layout/AppShell'
import { Home } from './pages/Home'
import { ActionCentre } from './pages/ActionCentre'
import { WorksheetFraming } from './pages/worksheet/Framing'
import { WorksheetModel } from './pages/worksheet/Model'
import { WorksheetFlows } from './pages/worksheet/Flows'
import { WorksheetUI } from './pages/worksheet/UI'
import { WorksheetRationale } from './pages/worksheet/Rationale'

export default function App() {
  return (
    <BrowserRouter>
      <ActionsProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="actions" element={<ActionCentre />} />
            <Route path="worksheet" element={<WorksheetFraming />} />
            <Route path="worksheet/model" element={<WorksheetModel />} />
            <Route path="worksheet/flows" element={<WorksheetFlows />} />
            <Route path="worksheet/ui" element={<WorksheetUI />} />
            <Route path="worksheet/rationale" element={<WorksheetRationale />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ActionsProvider>
    </BrowserRouter>
  )
}
