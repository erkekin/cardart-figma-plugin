figma.showUI(__html__, { themeColors: true, height: 500, width: 400 });

figma.on('drop', async (event) => {
  const { files, node, dropMetadata } = event;

  const response = await fetch(dropMetadata.url)
  const data = await response.arrayBuffer();
  const image = figma.createImage(new Uint8Array(data))
  const rect = figma.createRectangle()
  console.log(node)
  console.log(event)
  rect.x = event.x
  rect.y = event.y
  
  rect.resize(88, 140)
  
  rect.fills = [{type:"IMAGE", scaleMode:"FIT", imageHash: image.hash }]
  figma.currentPage.selection = [rect];
  node.appendChild(rect)
  return false;
});
