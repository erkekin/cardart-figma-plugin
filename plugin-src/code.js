figma.showUI(__html__, { themeColors: true, height: 500 });

figma.on('drop', async (event) => {
  const { files, node, dropMetadata } = event;

 

  const response = await fetch(dropMetadata.url)
  const data = await response.arrayBuffer();
  const image = figma.createImage(new Uint8Array(data))
  const rect = figma.createRectangle()
  
  rect.x = 10
  rect.y = 10
  
  rect.resize(200, 100)
  
  rect.fills = [{type:"IMAGE", scaleMode:"FIT", imageHash: image.hash }]
  figma.currentPage.appendChild(rect);
  figma.currentPage.selection = [rect];

  return false;
});
