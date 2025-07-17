
import { setupWorker } from 'msw/browser'
import { handlers } from '@/mocks/handlers'


export const worker = setupWorker(...handlers)


if (process.env.NODE_ENV === 'development') {
  
  worker.start({
    onUnhandledRequest: 'warn', 
    serviceWorker: {
      url: '/mockServiceWorker.js' 
    }
  })
}


export const mockAPI = {
  
  start: () => worker.start(),
  
  
  stop: () => worker.stop(),
  
  
  reset: () => worker.resetHandlers(),
  
  
  use: (...newHandlers: any[]) => worker.use(...newHandlers),
  
  
  get isActive() {
    return (worker as any).context?.isMocking ?? false
  }
}


export default worker