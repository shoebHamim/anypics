const galleryDiv = document.querySelector('.gallery')
const searchBtn = document.getElementById('search')
let next_page='';
const curatedPhotos = async (showPhoto) => {
  const res = await fetch('https://api.pexels.com/v1/curated', {
    headers: {
      Authorization: 'ycF28R1JlkLg9Lm3rJ6Q5IxToIeXStjY1Yzu5sxZP8OWtMZKjKWpc43D'
    }
  })
  const data = await res.json()
  next_page=data.next_page;
  console.log(next_page);
  for (photo of data.photos) {
    showPhoto(photo.src.large)
  }
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
  galleryDiv.innerHTML='';
  next_page=data.next_page;
  for (photo of data.photos) {
    showPhoto(photo.src.large)
  }
}

const showPhoto = (src) => {
  const imageDiv = document.createElement('div');
  imageDiv.className = 'single-image';
  const image = document.createElement('img')
  image.setAttribute('src', src)
  imageDiv.append(image)
  galleryDiv.append(imageDiv)

}

curatedPhotos(showPhoto)
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const query = document.getElementById('query').value;
  if (query) {
    searchPhotos(query)
  }
})

const moreBtn=document.querySelector('.more')
moreBtn.addEventListener('click',async()=>{
  const res= await fetch(next_page,{headers:{Authorization:
  'ycF28R1JlkLg9Lm3rJ6Q5IxToIeXStjY1Yzu5sxZP8OWtMZKjKWpc43D'}})
  const data= await res.json()
  next_page=data.next_page;
  for(photo of data.photos){
    showPhoto(photo.src.large)
  }
})
console.log(next_page);