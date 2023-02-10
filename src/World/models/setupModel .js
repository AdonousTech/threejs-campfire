function setupModel(data) {

    // This particular scene includes a camera which occupies the 0 ordinal index
    const model = data.scene.children[1];
  
    return model;
  }
  
export { setupModel };