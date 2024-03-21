 var toggleStatus = JSON.parse(localStorage.getItem('toggleStatus'));
  if (toggleStatus === true) {
    // JSON-LD script
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = `
    {
      "@context": "https://schema.org/", 
      "@type": "Product", 
      "name": "{{ product.title }}",
      "image": "{{ shop.url }} {{ product.url }}",
        "description": "{{ page_description }}",
      "brand": {
        "@type": "Brand",
            "name": "{{product.brand}}"
      },
      "sku": "{{product.sku}}",
      "offers": {
        "@type": "Offer",
        "url": "",
        "priceCurrency": "{{shop.currency}}",
        "price": "{{ product.price }}",
        "priceValidUntil": "{{product.pricevalid}}",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      }
    }
    `;
    document.head.appendChild(script);
  }
