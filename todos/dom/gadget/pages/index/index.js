import { render } from './todo'
console.log(render);
Page({
  data: {

  },
  onLoad: function () {
    console.log(this.pageElement)
    if (this.pageElement) {
      render(this.pageElement)
    } else {
      console.log('Cannot found')
    }
  },
})
