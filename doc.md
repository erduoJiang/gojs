```html
 <!DOCTYPE html>
 <html>
 <head>
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Draggable Link</title>
     <meta name="description"
           content="Drag a link to reconnect it. Nodes have custom Adornments for selection, resizing, and reshaping."/>
     <meta charset="UTF-8">
     <script src="js/go/go1.js"></script>
      <!--<script src="../assets/js/goSamples.js"></script>  <!– this is only for the GoJS Samples framework –>-->
      <script id="code">
          function init() {
              if (window.goSamples) goSamples();  // 这些样本的init - 你不需要调用它
              var $ = go.GraphObject.make;  // 为了简洁定义模板
              myDiagram =
                  $(go.Diagram, "myDiagramDiv",  // 必须命名或引用div HTML元素
                      {
                          grid: $(go.Panel, "Grid",
                              $(go.Shape, "LineH", {stroke: "lightgray", strokeWidth: 0.5}),
                              $(go.Shape, "LineH", {stroke: "gray", strokeWidth: 0.5, interval: 10}),
                              $(go.Shape, "LineV", {stroke: "lightgray", strokeWidth: 0.5}),
                              $(go.Shape, "LineV", {stroke: "gray", strokeWidth: 0.5, interval: 10})
                          ),
                          allowDrop: true,  // 必须是真的才能接受调色板中的液滴
                          "draggingTool.dragsLink": true,
                          "draggingTool.isGridSnapEnabled": true,
                          "linkingTool.isUnconnectedLinkValid": true,
                          "linkingTool.portGravity": 20,
                          "relinkingTool.isUnconnectedLinkValid": true,
                          "relinkingTool.portGravity": 20,
                          "relinkingTool.fromHandleArchetype":
                              $(go.Shape, "Diamond", {
                                  segmentIndex: 0,
                                  cursor: "pointer",
                                  desiredSize: new go.Size(8, 8),
                                  fill: "tomato",
                                  stroke: "darkred"
                              }),
                          "relinkingTool.toHandleArchetype":
                              $(go.Shape, "Diamond", {
                                  segmentIndex: -1,
                                  cursor: "pointer",
                                  desiredSize: new go.Size(8, 8),
                                  fill: "darkred",
                                  stroke: "tomato"
                              }),
                          "linkReshapingTool.handleArchetype":
                              $(go.Shape, "Diamond", {
                                  desiredSize: new go.Size(7, 7),
                                  fill: "lightblue",
                                  stroke: "deepskyblue"
                              }),
                          rotatingTool: $(TopRotatingTool),  // 定义如下
                          "rotatingTool.snapAngleMultiple": 15,
                          "rotatingTool.snapAngleEpsilon": 15,
                          "undoManager.isEnabled": true
                      });
              // 当文档被修改时，为标题添加一个“*”并启用“保存”按钮
              myDiagram.addDiagramListener("Modified", function (e) {
                  var button = document.getElementById("SaveButton");
                  if (button) button.disabled = !myDiagram.isModified;
                  var idx = document.title.indexOf("*");
                  if (myDiagram.isModified) {
                      if (idx < 0) document.title += "*";
                  } else {
                      if (idx >= 0) document.title = document.title.substr(0, idx);
                  }
              });
              // 定义一个创建通常透明的“端口”的函数。
              //“name”用作GraphObject.portId，“spot”用于控制链接的连接方式
              // 以及端口在节点上的位置以及布尔型“输出”和“输入”参数
              // 控制用户是否可以从端口或从端口获取链接。
              function makePort(name, spot, output, input) {
                  // 港口基本上只是一个小透明的广场
                  return $(go.Shape, "Circle",
                      {
                          fill: null,  // 没有看到，默认情况下; 通过showSmallPorts设置为半透明灰色，如下定义
                          stroke: null,
                          desiredSize: new go.Size(7, 7),
                          alignment: spot,  // 对齐主Shape中的端口
                          alignmentFocus: spot,  // 只是在形状内
                          portId: name,  // 声明这个对象是一个“端口”
                          fromSpot: spot, toSpot: spot,  // 声明链接可能在此端口连接的位置
                          fromLinkable: output, toLinkable: input,  // 声明用户是否可以在此处绘制链接
                          cursor: "pointer"  // 显示不同的光标以指示潜在的链接点
                      });
              }
  
              var nodeSelectionAdornmentTemplate =
                  $(go.Adornment, "Auto",
                      $(go.Shape, {fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2]}),
                      $(go.Placeholder)
                  );
              var nodeResizeAdornmentTemplate =
                  $(go.Adornment, "Spot",
                      {locationSpot: go.Spot.Right},
                      $(go.Placeholder),
                      $(go.Shape, {
                         alignment: go.Spot.TopLeft,
                         cursor: "nw-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.Top,
                         cursor: "n-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.TopRight,
                         cursor: "ne-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.Left,
                         cursor: "w-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.Right,
                         cursor: "e-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.BottomLeft,
                         cursor: "se-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.Bottom,
                         cursor: "s-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         alignment: go.Spot.BottomRight,
                         cursor: "sw-resize",
                         desiredSize: new go.Size(6, 6),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     })
                 );
             var nodeRotateAdornmentTemplate =
                 $(go.Adornment,
                     {locationSpot: go.Spot.Center, locationObjectName: "CIRCLE"},
                     $(go.Shape, "Circle", {
                         name: "CIRCLE",
                         cursor: "pointer",
                         desiredSize: new go.Size(7, 7),
                         fill: "lightblue",
                         stroke: "deepskyblue"
                     }),
                     $(go.Shape, {
                         geometryString: "M3.5 7 L3.5 30",
                         isGeometryPositioned: true,
                         stroke: "deepskyblue",
                         strokeWidth: 1.5,
                         strokeDashArray: [4, 2]
                     })
                 );
             myDiagram.nodeTemplate =
                 $(go.Node, "Spot",
                     {locationSpot: go.Spot.Center},
                     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                     {selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate},
                     {resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate},
                     {rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate},
                     new go.Binding("angle").makeTwoWay(),
                     //主要对象是围绕具有形状的TextBlock的面板
                     $(go.Panel, "Auto",
                         {name: "PANEL"},
                         new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                         $(go.Shape, "Rectangle",  // 默认数字
                             {
                                 portId: "", // 默认端口：如果链接数据没有位置，请使用最近端
                                 fromLinkable: true, toLinkable: true, cursor: "pointer",
                                 fill: "white",  // default color
                                 strokeWidth: 2
                             },
                             new go.Binding("figure"),
                             new go.Binding("fill")),
                         $(go.TextBlock,
                             {
                                 font: "bold 11pt Helvetica, Arial, sans-serif",
                                 margin: 8,
                                 maxSize: new go.Size(160, NaN),
                                 wrap: go.TextBlock.WrapFit,
                                 editable: true
                             },
                             new go.Binding("text").makeTwoWay())
                     ),
                     // 四个小的有名港口，每边一个：
                     makePort("T", go.Spot.Top, false, true),
                     makePort("L", go.Spot.Left, true, true),
                     makePort("R", go.Spot.Right, true, true),
                     makePort("B", go.Spot.Bottom, true, false),
                     { // 处理鼠标进入/离开事件以显示/隐藏端口
                         mouseEnter: function (e, node) {
                             showSmallPorts(node, true);
                         },
                         mouseLeave: function (e, node) {
                             showSmallPorts(node, false);
                         }
                     }
                 );
 
             function showSmallPorts(node, show) {
                 node.ports.each(function (port) {
                     if (port.portId !== "") {  // 不要更改默认端口，这是一个很大的形状
                         port.fill = show ? "rgba(0,0,0,.3)" : null;
                     }
                 });
             }
 
             var linkSelectionAdornmentTemplate =
                 $(go.Adornment, "Link",
                     $(go.Shape,
                         // isPanelMain声明这个Shape共享Link.geometry
                         {isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0})  // 使用选择对象的strokeWidth
                 );
             myDiagram.linkTemplate =
                 $(go.Link,  // 整个链接面板
                     {selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate},
                     {relinkableFrom: true, relinkableTo: true, reshapable: true},
                     {
                         routing: go.Link.AvoidsNodes,
                         curve: go.Link.JumpOver,
                         corner: 5,
                         toShortLength: 4
                     },
                     new go.Binding("points").makeTwoWay(),
                     $(go.Shape,  // the link path shape
                         {isPanelMain: true, strokeWidth: 2}),
                     $(go.Shape,  // the arrowhead
                         {toArrow: "Standard", stroke: null}),
                     $(go.Panel, "Auto",
                         new go.Binding("visible", "isSelected").ofObject(),
                         $(go.Shape, "RoundedRectangle",  // 链接形状
                             {fill: "#F8F8F8", stroke: null}),
                         $(go.TextBlock,
                             {
                                 textAlign: "center",
                                 font: "10pt helvetica, arial, sans-serif",
                                 stroke: "#919191",
                                 margin: 2,
                                 minSize: new go.Size(10, NaN),
                                 editable: true
                             },
                             new go.Binding("text").makeTwoWay())
                     )
                 );
             load();  // 从一些JSON文本加载初始图
             // 初始化页面左侧的Palette
             myPalette =
                 $(go.Palette, "myPaletteDiv",  // 必须命名或引用DIV HTML元素
                     {
                         maxSelectionCount: 1,
                         nodeTemplateMap: myDiagram.nodeTemplateMap,  // 共享myDiagram使用的模板
                         linkTemplate: // 简化链接模板，就在这个调色板中
                             $(go.Link,
                                 { // 因为GridLayout.alignment是Location，并且节点具有locationSpot == Spot.Center，
                                     // 以相同的方式排列链接，我们必须假装链接具有相同的位置点
                                     locationSpot: go.Spot.Center,
                                     selectionAdornmentTemplate:
                                         $(go.Adornment, "Link",
                                             {locationSpot: go.Spot.Center},
                                             $(go.Shape,
                                                 {isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0}),
                                             $(go.Shape,  // the arrowhead
                                                 {toArrow: "Standard", stroke: null})
                                         )
                                 },
                                 {
                                     routing: go.Link.AvoidsNodes,
                                     curve: go.Link.JumpOver,
                                     corner: 5,
                                     toShortLength: 4
                                 },
                                 new go.Binding("points"),
                                 $(go.Shape,  // 链接路径形状
                                     {isPanelMain: true, strokeWidth: 2}),
                                 $(go.Shape,  // 箭头
                                     {toArrow: "Standard", stroke: null})
                             ),
                         model: new go.GraphLinksModel([  // 指定调色板的内容
                             //{text: "模块内容", figure: "形状", fill: "颜色"},值可以接受变量
                             {text: "接听",figure: "RoundedRectangle"},
                             {text: "确认身份"},
                             {text: "还款提醒"},
                             {text: "应答", figure: "Diamond"},
                             {text: "处理"},
                             {text: "挂机2", figure: "RoundedRectangle"}
                         ], [
                             // 调色板也有一个断开的链接，用户可以拖放
                             {points: new go.List(go.Point).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)])}
                         ])
                     });
         }
 
         function TopRotatingTool() {
             go.RotatingTool.call(this);
         }
 
         go.Diagram.inherit(TopRotatingTool, go.RotatingTool);
         /** @override */
         TopRotatingTool.prototype.updateAdornments = function (part) {
             go.RotatingTool.prototype.updateAdornments.call(this, part);
             var adornment = part.findAdornment("Rotating");
             if (adornment !== null) {
                 adornment.location = part.rotateObject.getDocumentPoint(new go.Spot(0.5, 0, 0, -30));  // 在中间顶部以上
             }
         };
         /** @override */
         TopRotatingTool.prototype.rotate = function (newangle) {
             go.RotatingTool.prototype.rotate.call(this, newangle + 90);
         };
         // TopRotatingTool类的结尾
         // 以JSON格式显示用户可编辑的图表模型
         function save() {
             saveDiagramProperties();  // 在写入JSON之前先执行此操作
             document.getElementById("mySavedModel").value = myDiagram.model.toJson();
             myDiagram.isModified = false;
         }
 
         function load() {
             myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
             loadDiagramProperties();  // 在Model.modelData被带入内存后执行此操作
         }
 
         function saveDiagramProperties() {
             myDiagram.model.modelData.position = go.Point.stringify(myDiagram.position);
         }
 
         function loadDiagramProperties(e) {
             // 设置Diagram.initialPosition而不是Diagram.position，以处理初始化副作用
             var pos = myDiagram.model.modelData.position;
             if (pos) myDiagram.initialPosition = go.Point.parse(pos);
         }
     </script>
 </head>
 <body onload="init()">
 <div id="sample">
     <div style="width: 100%; display: flex; justify-content: center">
         <div id="myPaletteDiv"
              style="width: 105px; margin-right: 2px; background-color: whitesmoke; border: solid 1px black"></div>
         <div id="myDiagramDiv" style="flex-grow: 1; height: 620px; border: solid 1px black"></div>
     </div>
     <p>
         此示例演示了用户像链接节点一样拖动链接的功能。当链接的任一端经过有效端口时，端口将突出显示。。
     </p>
     <p>
         此示例演示了用户像链接节点一样拖动链接的功能。当链接的任一端经过有效端口时，端口将突出显示。。
     </p>
     <p>
         通过设置部分或全部以下属性可启用链接拖动功能：
         <a>DraggingTool.dragsLink</a>, <a>LinkingTool.isUnconnectedLinkValid</a>,and
         <a>RelinkingTool.isUnconnectedLinkValid</a>.
     </p>
     <p>
         请注意，Link中存在<a>Palette</a>这样它也可以拖出来并放到主图上。
         因为当任何一端没有与节点连接时链路不会自动路由，所以在定义该组件选项时显式提供路由。
     </p>
     <p>
         这也演示了几个习惯修饰：
         <a>Part.selectionAdornmentTemplate</a>, <a>Part.resizeAdornmentTemplate</a>, and
         <a>Part.rotateAdornmentTemplate</a>.
     </p>
     <p>
         最后这个例子演示了保存和恢复<a>Diagram.position</a>作为财产<a>Model.modelData</a>调用时会自动保存并恢复的对象<a>Model.toJson</a>
         和<a>Model.fromJson</a>.
     </p>
     <div>
         <div>
             <button id="SaveButton" onclick="save()">Save</button>
             <button onclick="load()">Load</button>
             以JSON格式保存的图表模型：
         </div>
         <textarea id="mySavedModel" style="width:100%;height:300px">
 { "class": "go.GraphLinksModel",
   "linkFromPortIdProperty": "fromPort",
   "linkToPortIdProperty": "toPort",
   "nodeDataArray": [
  ],
   "linkDataArray": [
  ]}
     </textarea>
     </div>
 </div>
 </body>
 </html>

```
