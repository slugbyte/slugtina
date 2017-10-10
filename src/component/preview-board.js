const previewBoard = document.getElementById('preview-board')
const ctx = previewBoard.getContext('2d')

export const refresh = () => {
  ctx.clearRect(0, 0, previewBoard.width, previewBoard.height);
}

export const resize = () => {
  previewBoard.width = window.innerWidth;
  previewBoard.height = window.innerHeight * 0.9;
  refresh()
}
