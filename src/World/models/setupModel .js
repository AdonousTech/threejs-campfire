function setupModel(data) {

    // Typically we will not have a camera in the children heirarchy
    const model = data.scene.children[1];
  
    return model;
  }
  
export { setupModel };