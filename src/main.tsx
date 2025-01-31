import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster as Sonner } from "@/components/ui/sonner"
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find the root element')
}

const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <App />
    </TooltipProvider>
  </QueryClientProvider>
)