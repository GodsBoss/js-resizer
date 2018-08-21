class Resizer {
  constructor(registerer, size) {
    this.registerer = registerer
    this.registeredListener = null
    this.size = size
    this.listeners = []
    this.margin = {
      horizontal: 0,
      vertical: 0
    }
    this.minimalFactor = 1
    this.factor = 1
  }

  register() {
    if (this.registeredListener === null) {
      this.registeredListener = (size) => this.resize(size)
      this.registerer.register(registeredListener)
    }
    return this
  }

  deregister() {
    if (this.registeredListener !== null) {
      this.registerer.unregister(this.registeredListener)
      this.registeredListener = null
    }
    return this
  }

  setMargin(horizontal, vertical) {
    this.margin = {
      horizontal: horizontal,
      vertical: vertical
    }
    return this
  }

  setMinimalFactor(f) {
    this.minimalFactor = f
    if (this.factor < this.minimalFactor) {
      setFactor(this, this.minimalFactor)
    }
    return this
  }

  addListener(listener) {
    this.listeners.push(listener)
    return this
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(
      (registeredListener) => listener === registeredListener
    )
    return this
  }

  resize(size) {
    const hFactor = Math.max(1, Math.floor((size.width - this.margin.horizontal) / this.size.width))
    const vFactor = Math.max(1, Math.floor((size.height - this.margin.vertical) / this.size.height))
    const factor = Math.max(this.minimalFactor, Math.min(hFactor, vFactor))
    setFactor(this, factor)
  }
}

function setFactor(resizer, factor) {
  if (resizer.factor == factor) {
    return
  }
  this.listeners.forEach(
    (listener) => listener(factor)
  )
}

function canvasResizeListener(canvasElement) {
  const initialWidth = canvasElement.width
  const initialHeight = canvasElement.height
  return function(factor) {
    canvasElement.width = initialWidth * factor
    canvasElement.height = initialHeight * factor
  }
}

class WindowRegisterer {
  constructor(window) {
    this.window = window
    this.listener = null
  }

  register(listener) {
    this.listener = (ev) => {
      listener.resize(
        {
          width: ev.target.innerWidth,
          height: ev.target.innerHeight
        }
      )
    }
    this.window.addEventListener('resize', this.listener, false)
  }

  deregister(listener) {
    this.window.removeListener('resize', this.listener)
    this.listener = null
  }
}

export {
  canvasResizeListener,
  Resizer,
  WindowRegisterer
}
