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
  galleryDiv.innerHTML='';
  next_page=data.next_page;
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
    <img src="./download.png" alt="">
    </button>
    </a>
</div>`

  
  galleryDiv.innerHTML+=imageDiv;
  

}

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
    showPhoto(photo.src)
  }
  downloadFeature()

})
// console.log(next_page);

function downloadFeature(){
  if(screen.width<500){
    return
  }
  const singleImgs=document.querySelectorAll('.single-image')
  singleImgs.forEach(singleImg=>{
    singleImg.addEventListener('mouseover',()=>{
      const downloadBtn=singleImg.children[1].children[0];
      downloadBtn.style.display='block'
    }) 
    singleImg.addEventListener('mouseout',(e)=>{
      const downloadBtn=singleImg.children[1].children[0];
      downloadBtn.style.display='none'
    })
  })


  
}

curatedPhotos(showPhoto)


