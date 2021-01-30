let lightText = "#000";
export default (mySelf, MAKE, go) => {
  let nodeResizeAdornmentTemplate = MAKE(
    go.Adornment,
    "Spot",
    { locationSpot: go.Spot.Right },
    MAKE(go.Placeholder),
    MAKE(go.Shape, {
      alignment: go.Spot.TopLeft,
      cursor: "nw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    MAKE(go.Shape, {
      alignment: go.Spot.Top,
      cursor: "n-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    MAKE(go.Shape, {
      alignment: go.Spot.TopRight,
      cursor: "ne-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),

    MAKE(go.Shape, {
      alignment: go.Spot.Left,
      cursor: "w-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    MAKE(go.Shape, {
      alignment: go.Spot.Right,
      cursor: "e-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),

    MAKE(go.Shape, {
      alignment: go.Spot.BottomLeft,
      cursor: "se-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    MAKE(go.Shape, {
      alignment: go.Spot.Bottom,
      cursor: "s-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    }),
    MAKE(go.Shape, {
      alignment: go.Spot.BottomRight,
      cursor: "sw-resize",
      desiredSize: new go.Size(6, 6),
      fill: "lightblue",
      stroke: "deepskyblue"
    })
  );
  mySelf.myDiagram.nodeTemplateMap.add(
    "Text",
    MAKE(
      go.Node,
      "Spot",
      // nodeStyle(),
      // 记录保存时候的位置信息
      new go.Binding("location", "loc").makeTwoWay(),
      {
        resizable: true,
        resizeObjectName: "PANEL",
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate
      },
      MAKE(
        //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
        go.Panel, //表明需要创建一个panel面板对象
        "Auto", //页面布局为自动
        // new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
        //   go.Size.stringify
        // ),
        // { name: "PANEL" },
        // new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
        //   go.Size.stringify
        // ),

        // MAKE(
        //   //声明构建一个圆角矩形
        //   go.Shape,
        //   "RoundedRectangle",
        //   {
        //     fill: "#44CCFF",
        //     stroke: "#FFF",
        //     strokeWidth: 1,
        //     angle: 0
        //   },
        //   new go.Binding("figure", "figure") //声明并创建一个新的图形
        // ),
        MAKE(
          //声明一个可编辑文本域
          go.TextBlock,
          { name: "PANEL" },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          {
            font: "12pt Helvetica, Arial, sans-serif",
            stroke: lightText,
            width: 32,
            height: 32,
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(NaN, NaN),
            wrap: go.TextBlock.WrapFit, //文本域换行
            editable: true //是否可编辑
            // margin: 12,
            // eslint-disable-next-line no-dupe-keys
            // wrap: go.TextBlock.WrapDesiredSize
          },
          //   new go.Binding("text", "text"),
          new go.Binding("stroke", "color").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay(),
          new go.Binding("background", "background").makeTwoWay(),
          new go.Binding("text").makeTwoWay()
          //   new go.Binding("text", "text")
        )
      )
      // four named ports, one on each side:
      //   makePort("T", go.Spot.Top, false, true),
      //   makePort("L", go.Spot.Left, true, true),
      //   makePort("R", go.Spot.Right, true, true),
      //   makePort("B", go.Spot.Bottom, true, false)
    )
  );
};
