import './index.scss';

document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', event => {
    event.dataTransfer.setData('text/plain', getComputedStyle(item).backgroundColor)
  })
})

document.querySelectorAll('.droptarget').forEach(item => {
  item.addEventListener('dragover', event => {
    event.preventDefault()
  })
  item.addEventListener('dragleave', event => {
    item.classList.remove('hover')
  })
  item.addEventListener('dragenter', event => {
    item.classList.add('hover')
  })

  item.addEventListener('drop', event => {
    item.style.backgroundColor = event.dataTransfer.getData('text/plain')
  })
})

require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);
