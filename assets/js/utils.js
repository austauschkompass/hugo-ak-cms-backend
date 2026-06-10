import * as bootstrap from 'js/bootstrap'

export const setup = () => {
  setupPopovers()
  setupCarousels()
  setupToasts()
}

export const setupPopovers = () => {
  let popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  )
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })
}

export const setupCarousels = () => {
  const carouselsList = [].slice.call(document.querySelectorAll('.carousel'))

  carouselsList.map((carousel) => new bootstrap.Carousel(carousel))
}

export const setupToasts = () => {
  let toastElList = [].slice.call(document.querySelectorAll('.toast'))
  let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })

  toastList.forEach(function (toast) {
    toast.show()
  })
}
