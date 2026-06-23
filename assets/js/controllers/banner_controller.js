// TODO: Potentially move this code into the ak_bannerservice_client
// repo as an adapter to stimulus. However, we then need to figure out
// how to allow pinning this inside a rails app and use the
// correct stimulus version... (i.e. do we need to publish this to npm?)
import { Controller } from 'js/stimulus'
import '../external/ak_banner_service_client'

export default class extends Controller {
  static values = {
    // OPTIMIZE: Find a way to configure this value globally
    // per application, instead of per controller (just as before
    // with a rails initializer)
    client: String,
    category: String  
    // TODO: add tags, organisation options as well
  }
  
  initialize() {
    akBannerInit({
      "category": this.categoryValue,
      "client": this.clientValue,
    })
  }
}
