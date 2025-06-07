// Comprehensive Error Tracking & Classification System
// for Paradox Engine Platform

export interface AppError {
  id: string
  type: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  category: 'AUTH' | 'CONTENT' | 'PERMISSION' | 'NETWORK' | 'UI' | 'DATA'
  message: string
  stack?: string
  url?: string
  userAgent?: string
  timestamp: string
  resolved: boolean
  context?: Record<string, any>
}

class ErrorTracker {
  private errors: AppError[] = []
  private listeners: ((error: AppError) => void)[] = []

  // Error Classification
  classifyError(error: Error, context?: Record<string, any>): AppError {
    const timestamp = new Date().toISOString()
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    let type: AppError['type'] = 'MEDIUM'
    let category: AppError['category'] = 'UI'

    // CRITICAL ERRORS (Break core functionality)
    if (error.message.includes('SessionProvider') || 
        error.message.includes('useSession') ||
        error.message.includes('NEXTAUTH')) {
      type = 'CRITICAL'
      category = 'AUTH'
    }
    
    if (error.message.includes('Cannot read properties of null') ||
        error.message.includes('Cannot read properties of undefined')) {
      type = 'CRITICAL'
      category = 'DATA'
    }

    // HIGH PRIORITY (Affects user experience)
    if (error.message.includes('404') || 
        error.message.includes('Not found') ||
        error.message.includes('Failed to load')) {
      type = 'HIGH'
      category = 'CONTENT'
    }

    if (error.message.includes('EPERM') || 
        error.message.includes('permission denied') ||
        error.message.includes('EACCES')) {
      type = 'HIGH'
      category = 'PERMISSION'
    }

    if (error.message.includes('fetch') || 
        error.message.includes('network') ||
        error.message.includes('timeout')) {
      type = 'HIGH'
      category = 'NETWORK'
    }

    // MEDIUM PRIORITY (Minor issues)
    if (error.message.includes('Warning') || 
        error.message.includes('deprecated')) {
      type = 'MEDIUM'
      category = 'UI'
    }

    return {
      id,
      type,
      category,
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      timestamp,
      resolved: false,
      context
    }
  }

  // Track error
  track(error: Error, context?: Record<string, any>) {
    const appError = this.classifyError(error, context)
    this.errors.push(appError)
    
    // Notify listeners
    this.listeners.forEach(listener => listener(appError))
    
    // Log to console with color coding
    this.logError(appError)
    
    return appError.id
  }

  // Color-coded console logging
  private logError(error: AppError) {
    const colors = {
      CRITICAL: '\x1b[41m\x1b[37m', // Red background, white text
      HIGH: '\x1b[31m',             // Red text
      MEDIUM: '\x1b[33m',           // Yellow text
      LOW: '\x1b[36m'               // Cyan text
    }
    
    const reset = '\x1b[0m'
    const color = colors[error.type]
    
    console.group(`${color}[${error.type}] ${error.category} Error${reset}`)
    console.log(`Message: ${error.message}`)
    console.log(`ID: ${error.id}`)
    console.log(`Time: ${error.timestamp}`)
    if (error.context) {
      console.log('Context:', error.context)
    }
    if (error.stack) {
      console.log('Stack:', error.stack)
    }
    console.groupEnd()
  }

  // Subscribe to errors
  subscribe(listener: (error: AppError) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Get errors by type
  getErrors(type?: AppError['type'], category?: AppError['category']) {
    return this.errors.filter(error => 
      (!type || error.type === type) &&
      (!category || error.category === category) &&
      !error.resolved
    )
  }

  // Mark error as resolved
  resolve(id: string) {
    const error = this.errors.find(e => e.id === id)
    if (error) {
      error.resolved = true
    }
  }

  // Get error summary
  getSummary() {
    const unresolvedErrors = this.errors.filter(e => !e.resolved)
    
    return {
      total: unresolvedErrors.length,
      critical: unresolvedErrors.filter(e => e.type === 'CRITICAL').length,
      high: unresolvedErrors.filter(e => e.type === 'HIGH').length,
      medium: unresolvedErrors.filter(e => e.type === 'MEDIUM').length,
      low: unresolvedErrors.filter(e => e.type === 'LOW').length,
      byCategory: {
        auth: unresolvedErrors.filter(e => e.category === 'AUTH').length,
        content: unresolvedErrors.filter(e => e.category === 'CONTENT').length,
        permission: unresolvedErrors.filter(e => e.category === 'PERMISSION').length,
        network: unresolvedErrors.filter(e => e.category === 'NETWORK').length,
        ui: unresolvedErrors.filter(e => e.category === 'UI').length,
        data: unresolvedErrors.filter(e => e.category === 'DATA').length,
      }
    }
  }

  // Clear all resolved errors
  clearResolved() {
    this.errors = this.errors.filter(e => !e.resolved)
  }

  // Export errors for analysis
  export() {
    return {
      errors: this.errors,
      summary: this.getSummary(),
      exportedAt: new Date().toISOString()
    }
  }
}

// Global error tracker instance
export const errorTracker = new ErrorTracker()

// Global error handlers
if (typeof window !== 'undefined') {
  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.track(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      type: 'unhandledrejection',
      reason: event.reason
    })
  })

  // Catch JavaScript errors
  window.addEventListener('error', (event) => {
    errorTracker.track(event.error || new Error(event.message), {
      type: 'javascript',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })
}

// Development mode error display
export function createErrorDisplay() {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return null
  }

  const display = document.createElement('div')
  display.id = 'error-tracker-display'
  display.style.cssText = `
    position: fixed;
    top: 60px;
    right: 20px;
    width: 300px;
    max-height: 400px;
    background: #1a1a1a;
    color: #fff;
    border-radius: 8px;
    padding: 16px;
    font-family: monospace;
    font-size: 12px;
    z-index: 10000;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    border: 1px solid #333;
  `

  const updateDisplay = () => {
    const summary = errorTracker.getSummary()
    const criticalErrors = errorTracker.getErrors('CRITICAL')
    const highErrors = errorTracker.getErrors('HIGH')
    
    display.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px; color: #ffd700;">
        🚨 Error Tracker
      </div>
      <div style="margin-bottom: 8px;">
        Total: ${summary.total} | 
        <span style="color: #ff4444;">Critical: ${summary.critical}</span> | 
        <span style="color: #ff8800;">High: ${summary.high}</span>
      </div>
      ${criticalErrors.length > 0 ? `
        <div style="margin-bottom: 8px;">
          <div style="color: #ff4444; font-weight: bold;">CRITICAL:</div>
          ${criticalErrors.slice(0, 3).map(e => `
            <div style="margin: 4px 0; padding: 4px; background: #330000; border-radius: 4px;">
              ${e.category}: ${e.message.substring(0, 50)}...
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${highErrors.length > 0 ? `
        <div style="margin-bottom: 8px;">
          <div style="color: #ff8800; font-weight: bold;">HIGH:</div>
          ${highErrors.slice(0, 2).map(e => `
            <div style="margin: 4px 0; padding: 4px; background: #332200; border-radius: 4px;">
              ${e.category}: ${e.message.substring(0, 50)}...
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div style="text-align: center; margin-top: 8px;">
        <button onclick="errorTracker.clearResolved()" style="
          background: #333; 
          color: #fff; 
          border: 1px solid #555; 
          padding: 4px 8px; 
          border-radius: 4px; 
          cursor: pointer;
        ">
          Clear Resolved
        </button>
      </div>
    `
  }

  errorTracker.subscribe(updateDisplay)
  updateDisplay()

  document.body.appendChild(display)
  return display
}

// Utility function for Next.js error boundaries
export function withErrorTracking<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    try {
      const result = fn(...args)
      
      // Handle async functions
      if (result && typeof result.catch === 'function') {
        return result.catch((error: Error) => {
          errorTracker.track(error, {
            function: fn.name,
            args: args.map(arg => typeof arg === 'object' ? '[Object]' : String(arg))
          })
          throw error
        })
      }
      
      return result
    } catch (error) {
      errorTracker.track(error as Error, {
        function: fn.name,
        args: args.map(arg => typeof arg === 'object' ? '[Object]' : String(arg))
      })
      throw error
    }
  }) as T
} 