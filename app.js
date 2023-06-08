const galleryDiv = document.querySelector('.gallery')
const searchBtn = document.getElementById('search')
let loadingMorePics = false
let next_page = '';
const curatedPhotos = async (showPhoto) => {
  const res = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'ycF28R1JlkLg9Lm3rJ6Q5IxToIeXStjY1Yzu5sxZP8OWtMZKjKWpc43D'
    }
  })
  const data = await res.json()
  next_page = data.next_page;
  for (photo of data.photos) {
    showPhoto(photo.src)
  }
  downloadFeature()

}
const searchPhotos = async (query) => {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`,
    {
      headers: {
        Authorization: 'ycF28R1JlkLg9Lm3rJ6Q5IxToIeXStjY1Yzu5sxZP8OWtMZKjKWpc43D'
      }
    }
  )
  const data = await res.json()
  galleryDiv.innerHTML = '';
  next_page = data.next_page;
  for (photo of data.photos) {
    showPhoto(photo.src)
  }
  downloadFeature() 
}

const showPhoto = (src) => {

  const imageDiv = `<div class="single-image">
    <img src=${src.large} alt="">
    <a href=${src.original}>
    <button class="download-btn">
    <img src="./images/download(1).png" alt="">
    </button>
    </a>
</div>`


  galleryDiv.innerHTML += imageDiv;


}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const query = document.getElementById('query').value;
  if (query) {
    searchPhotos(query)
  }
})

const morePics = async () => {
  loadingMorePics = true
  const res = await fetch(next_page, {
    headers: {
      Authorization:
        'ycF28R1JlkLg9Lm3rJ6Q5IxToIeXStjY1Yzu5sxZP8OWtMZKjKWpc43D'
    }
  })
  const data = await res.json()
  next_page = data.next_page;
  for (photo of data.photos) {
    showPhoto(photo.src)
  }
  downloadFeature()
  loadingMorePics = false
}



function downloadFeature() {
  if (screen.width < 500) {
    return
  }
  const singleImgs = document.querySelectorAll('.single-image')
  singleImgs.forEach(singleImg => {
    singleImg.addEventListener('mouseover', () => {
      const downloadBtn = singleImg.children[1].children[0];
      downloadBtn.style.display = 'block'
    })
    singleImg.addEventListener('mouseout', (e) => {
      const downloadBtn = singleImg.children[1].children[0];
      downloadBtn.style.display = 'none'
    })
  })



}
curatedPhotos(showPhoto)
//  endless scrolling 
window.onscroll = function () {
  if (!loadingMorePics && (window.innerHeight + window.pageYOffset+50) >= document.body.offsetHeight) {
    morePics()
    setTimeout(() => {
    }, 2000);
  }

}
//  switching mode
const toggleBtn = document.querySelector('.toggle-mode')

toggleBtn.addEventListener('click', () => {
  if (document.body.classList.value == 'dark-mode') {
    toggleBtn.children[0].setAttribute('src', './images/moon.png')
    // previous state was dark.. as mode is toggled, storing mode value as light 
    localStorage.setItem('mode','light')
    
  } else {
    toggleBtn.children[0].setAttribute('src', './images/brightness.png')
    // previous state was light.. as mode is toggled, storing mode value as dark 
    localStorage.setItem('mode','dark')

  }
  document.querySelector('#query').classList.toggle('dark-mode-input')
  document.body.classList.toggle('dark-mode');
})

// changing the mode on load only if stored value of mode is dark... otherwise it's light by default
let stored_mode_value=localStorage.getItem('mode')
console.log(stored_mode_value);
if(stored_mode_value=='dark'){
  document.querySelector('#query').classList.add('dark-mode-input')
  document.body.classList.add('dark-mode');
  toggleBtn.children[0].setAttribute('src', './images/brightness.png')
}
