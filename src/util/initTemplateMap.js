export default (dataArr, mySelf, MAKE, go, makePort) => {
  dataArr.forEach(item => {
    mySelf.myDiagram.nodeTemplateMap.add(
      item.name,
      MAKE(
        go.Node,
        "Spot",
        // nodeStyle(),
        // 记录保存时候的位置信息
        new go.Binding("location", "loc").makeTwoWay(),
        MAKE(
          //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
          go.Panel, //表明需要创建一个panel面板对象
          "Auto", //页面布局为自动

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
          // MAKE(
          //   //声明一个可编辑文本域
          //   go.TextBlock,
          //   {
          //     font: "12pt Helvetica, Arial, sans-serif",
          //     stroke: lightText,
          //     width: 125,
          //     maxSize: new go.Size(360, NaN),
          //     wrap: go.TextBlock.WrapFit, //文本域换行
          //     editable: true, //是否可编辑
          //     margin: 12,
          //     // eslint-disable-next-line no-dupe-keys
          //     wrap: go.TextBlock.WrapDesiredSize
          //   },
          //   new go.Binding("text").makeTwoWay()
          // )

          // 背景图片与图标
          MAKE(
            go.Panel,
            go.Panel.Auto,
            // { position: new go.Point(0, 72) },
            // MAKE(
            //   go.Picture,
            //   {
            //     width: 128,
            //     height: 118,
            //     source: require("../assets/images/circle_1.png")
            //   }
            //   // new go.Binding("source", "bgSrc")
            // ),
            MAKE(
              go.Picture,
              {
                width: 32,
                height: 32,
                source: item.imgUrl
              }
              // new go.Binding("source", "iconSrc")
            ),
            MAKE(
              go.TextBlock,
              {
                margin: 4,
                stroke: "yellow",
                font: "14px sans-serif"
              },
              new go.Binding("text", "text")
            )
          )
        ),
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
      )
    );
  });
};
