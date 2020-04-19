addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    if(element.tagName == 'title')
    {
      element.setInnerContent('Gripenstraw');
    }

    else if(element.tagName ==  'h1' && element.getAttribute('id')== 'title')
    {
      element.setInnerContent('Nashville, TN');
    }

    else if(element.tagName ==  'p' && element.getAttribute('id')== 'description')
    {
      element.setInnerContent('The University of Notre Dame');
    }

    else if(element.tagName ==  'a' && element.getAttribute('id')== 'url')
    {
      element.setInnerContent('https://github.com/joegrip');
    }

  }

}
/**
 * Respond with hello worker text
 * @param {Request} request
 */


async function handleRequest(request) {
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let result = await response.json(); 
  let urls = await result['variants'];
  variant = Math.round(Math.random());

  let randResp = await fetch(urls[variant]);
  return new HTMLRewriter().on('*', new ElementHandler()).transform(randResp)

}
