function toggleContent(button) {
    const currentContent = button.nextElementSibling;
    const currentArrow = button.querySelector('.arrow');

    const parent = button.closest('.category, .nested-section');
    const siblings = parent.parentNode.querySelectorAll(':scope > .category, :scope > .nested-section');

    siblings.forEach(sibling => {
      const btn = sibling.querySelector('.toggle-btn');
      const content = sibling.querySelector('.content');
      const arrow = btn.querySelector('.arrow');

      if (content !== currentContent) {
        content.classList.remove('open');
        if (arrow) arrow.classList.remove('rotate');
      }
    });

    currentContent.classList.toggle('open');
    if (currentArrow) currentArrow.classList.toggle('rotate');
  }

// Store picture group sets for each ingredient by ingredient ID
const imageSet = {
    egg: [
      "/image/egg/egg1.jpg",
      "/image/egg/egg2.jpg",
      "/image/egg/egg3.jpg",
      "/image/egg/egg4.jpg",
      "/image/egg/egg5.jpg"
    ],
    onion: [
      "images/onion1.jpg",
      "images/onion2.jpg",
      "images/onion3.jpg"
    ],
    lettuce: [
      "images/lettuce1.jpg",
      "images/lettuce2.jpg",
      "images/lettuce3.jpg"
    ]
  };
  
  // Initialize current index per ingredient
  const imageIndex = {
    egg: 0,
    onion: 0,
    lettuce: 0
  };
  
  // Universal cycling function
  function cycleImage(id) {
    const image = imageSet[id];
    let currentIndex = imageIndex[id];
  
    // Move to next image, loop if needed
    currentIndex = (currentIndex + 1) % image.length;
  
    // Change the image source
    document.getElementById(id).src = image[currentIndex];
  
    // Save the new index
    imageIndex[id] = currentIndex;
  }
