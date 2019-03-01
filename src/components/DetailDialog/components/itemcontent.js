export const Key = {

  props: {
    value: {
      type: [String],
      default: '-'
    }
  },

  render(h) {
    const value = this.value
    return (
      <div class='omega-detail-dialog-item-key'>
        { value }
      </div>
    )
  }
}

export const Value = {

  props: {
    value: {
      type: [Function, String, Number],
      default: '-'
    }
  },

  render(h) {
    const value = this.value
    if (typeof value === 'object' || typeof value === 'function') {
      return (
        value
      )
    }
    return (
      <div class='omega-detail-dialog-item-value'>
        { value }
      </div>)
  }
}
