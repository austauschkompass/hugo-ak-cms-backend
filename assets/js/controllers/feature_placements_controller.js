import { Controller } from "js/stimulus"

export default class extends Controller {
  static values = {
    crmApiUrl: String,
    crmApiToken: String,
    context: String,
  }

  static targets = ["headline", "intro", "body", "logo", "image", "link"]

  connect() {
    fetchFeaturePlacements(this.crmApiUrlValue, this.crmApiTokenValue, this.contextValue).then(placements => {

      if (placements.length > 0) {
        const { data, organisation } = placements[0]
        // NOTE: we only render the first for now...
        this.headlineTarget.textContent = data.title
        this.introTarget.textContent = data.teaser
        this.bodyTarget.textContent = data.content
        this.linkTarget.href = data.link
        this.imageTarget.src = data.image_url
        this.logoTarget.src = organisation.logo_url
        this.logoTarget.alt = `${organisation.shortname} Logo`
      } else {
        // when empty response, hide ourselves
        this.element.style= "display: none";
      }
    }).catch(console.error)
  }
}

const fetchFeaturePlacements = async (url,  token, context) => {
  const apiUrl = url + "/api/feature_placements?context=" + context

  let res = await fetch(apiUrl, {
    headers: {
      'Authorization': 'Token token=' + token
    },
    mode: 'cors'
  })

  try {
    let featurePlacements = await res.json()
    if (res.ok) {
      return featurePlacements
    } else {
      throw new Error("Api Error: " + JSON.stringify(featurePlacements))
    }
  }

  catch (e) {
    throw new Error("content kein json: " + e.message)
  }
}
