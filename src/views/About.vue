<template>
  <div class="about">
    <div
      id="diagram"
      style="width: 1000px; height: 500px;background:#000"
    ></div>
  </div>
</template>
<script>
import go from "gojs";
const MAKE = go.GraphObject.make;
export default {
  name: "About",
  data() {
    return {};
  },
  mounted() {
    var mySelf = this;
    mySelf.myDiagram = MAKE(go.Diagram, "diagram", {
      // 令绘制的元素相对画布居中
      initialContentAlignment: go.Spot.Center,

      // 是否可撤销编辑
      "undoManager.isEnabled": true
      // "grid.visible": true //显示网格
    });

    mySelf.myDiagram.nodeTemplateMap.add(
      "node1",
      MAKE(
        go.Node,
        go.Panel.Position,
        { width: 230, height: 240 },

        new go.Binding("position"),

        // 背景图片与图标
        MAKE(
          go.Panel,
          go.Panel.Auto,
          { position: new go.Point(0, 72) },
          MAKE(
            go.Picture,
            {
              width: 178,
              height: 168
            },
            new go.Binding("source", "bgSrc")
          ),
          MAKE(
            go.Picture,
            {
              width: 64,
              height: 64
            },
            new go.Binding("source", "iconSrc")
          )
        ),

        // 文字背景与文本信息
        MAKE(
          go.Panel,
          go.Panel.Position,
          { position: new go.Point(50, 0) },

          MAKE(
            go.Picture,
            { width: 178, height: 100 },
            new go.Binding("source", "textBgSrc")
          ),

          MAKE(
            go.TextBlock,
            {
              stroke: "#FFF",
              font: "normal bold 24px Serif",
              position: new go.Point(80, 20)
            },
            new go.Binding("text")
          )
        )
      )
    );

    mySelf.myDiagram.nodeTemplateMap.add(
      "node2",
      MAKE(
        go.Node,
        go.Panel.Vertical,
        { width: 120, height: 170 },
        new go.Binding("position"),

        // 背景图片与图标
        MAKE(
          go.Panel,
          go.Panel.Auto,
          MAKE(
            go.Picture,
            { width: 120, height: 120 },
            new go.Binding("source", "bgSrc")
          ),
          MAKE(
            go.Picture,
            { width: 30, height: 30 },
            new go.Binding("source", "iconSrc")
          )
        ),

        // 文字块
        MAKE(
          go.Panel,
          go.Panel.Auto,
          { margin: new go.Margin(8, 0, 0, 0) },
          MAKE(
            go.Picture,
            { width: 80, height: 30 },
            new go.Binding("source", "textBgSrc")
          ),
          MAKE(go.TextBlock, { stroke: "#FFF" }, new go.Binding("text"))
        )
      )
    );
    /******************** node template ********************/

    /******************** Link Template ********************/
    mySelf.myDiagram.linkTemplateMap.add(
      "link1",
      MAKE(
        go.Link,
        { routing: go.Link.Normal },
        new go.Binding("routing"),
        new go.Binding("fromSpot"),
        new go.Binding("toSpot"),

        // 线段模板
        MAKE(
          go.Shape,
          { strokeDashArray: [10, 20] },
          new go.Binding("stroke"),
          new go.Binding("strokeWidth")
        ),

        // 箭头模板
        MAKE(
          go.Shape,
          { stroke: "transparent", strokeWidth: 0 },
          new go.Binding("fromArrow"),
          new go.Binding("toArrow"),
          new go.Binding("scale", "arrowScale"),
          new go.Binding("fill", "arrowfill")
        ),

        // 文字块
        MAKE(
          go.Panel,
          go.Panel.Auto,
          new go.Binding("alignmentFocus", "textPos"),
          MAKE(go.Shape, { fill: "transparent" }, new go.Binding("stroke")),
          MAKE(
            go.TextBlock,
            { margin: 10 },
            new go.Binding("stroke"),
            new go.Binding("text")
          )
        )
      )
    );

    mySelf.myDiagram.linkTemplateMap.add(
      "link2",
      MAKE(
        go.Link,
        { routing: go.Link.Normal },
        new go.Binding("fromSpot"),
        new go.Binding("toSpot"),

        // 线段模板
        MAKE(go.Shape, { stroke: "transparent" }),

        // 线段图片
        MAKE(
          go.Picture,
          {
            width: 300,
            height: 20,

            // 使图片与连接线方向对齐
            segmentOrientation: go.Link.OrientUpright
          },
          new go.Binding("source", "arrowSrc")
        ),

        // 文字块
        MAKE(
          go.TextBlock,
          {
            stroke: "lightblue",
            alignmentFocus: new go.Spot(0.5, 2)
          },
          new go.Binding("text")
        )
      )
    );

    const nodeDataArray = [
      {
        position: new go.Point(0, 0),
        category: "node1",
        key: "apply",
        bgSrc: require("../assets/images/circle_1.png"),
        iconSrc: require("../assets/images/icon-apply.png"),
        textBgSrc: require("../assets/images/text-bg-1.png"),

        text: "申请"
      },

      {
        position: new go.Point(500, 0),
        category: "node1",
        key: "complete",
        bgSrc: require("../assets/images/circle_2.png"),
        iconSrc: require("../assets/images/icon-complete.png"),
        textBgSrc: require("../assets/images/text-bg-1.png"),

        text: "完成"
      },

      {
        position: new go.Point(300, 300),
        category: "node2",
        key: "coor",
        bgSrc: require("../assets/images/circle_3.png"),
        iconSrc: require("../assets/images/icon-feedback.png"),
        textBgSrc: require("../assets/images/text-bg-2.png"),

        text: "协调"
      }
    ];

    const linkDataArray = [
      {
        category: "link1",
        from: "coor",
        to: "apply",
        fromSpot: new go.Spot(0, 0.42),
        toSpot: new go.Spot(0.42, 1),

        routing: go.Link.Orthogonal,
        toArrow: "Standard",
        arrowfill: "orange",
        arrowScale: 2,

        stroke: "orange",
        strokeWidth: 2,

        text: "驳回操操操",
        textPos: new go.Spot(0, 1, -100, 20)
      },
      {
        category: "link1",
        from: "coor",
        to: "complete",
        fromSpot: new go.Spot(1, 0.42),
        toSpot: new go.Spot(0.42, 1),

        routing: go.Link.Orthogonal,
        toArrow: "Standard",
        arrowfill: "lightblue",
        arrowScale: 2,

        stroke: "lightblue",
        strokeWidth: 2,

        text: "通过",
        textPos: new go.Spot(0, 1, 130, 20)
      },
      {
        category: "link2",
        from: "apply",
        to: "complete",
        fromSpot: new go.Spot(0.8, 0.65),
        toSpot: new go.Spot(0, 0.65),
        arrowSrc: require("../assets/images/arrow.png"),

        text: "申请中"
      }
    ];

    mySelf.myDiagram.model = new go.GraphLinksModel(
      nodeDataArray,
      linkDataArray
    );

    /******************** link template ********************/

    //     //编写节点模板
    //     mySelf.myDiagram.nodeTemplateMap.add(
    //       "templateName", //模板的名字
    //       // 模板的具体配置
    //       MAKE(
    //         go.Node,
    //         go.Panel.Auto, //是指该节点的布局方式
    //         // 下边的参数，可以在改节点中无限嵌套元素, 文字块TextBlock 图形Shape 图片Picture 都可以作为元素添加
    //         MAKE(
    //           go.TextBlock,
    //           { text: "test" },
    //           /*[2]*/ new go.Binding("text", "text") //这是 gojs 中的数据绑定, 使用该方法实现了模板与真实数据之间的传递
    //           /**该方法 new go.Binding 能在任意构造器中使用
    //           origin: 该构造器中的属性名
    //           target: 需要绑定到数据集中的属性名
    //           filter: 过滤函数 */
    //         )
    //       )
    //     );

    //     // 定义一个节点数据集,
    //     /**key 属性是必填的且具有唯一性, 它将运用到连接线数据集中
    // category 属性即对应了节点模板中模板的名称, 若不填, 则会默认使用第一组模板
    // text 即 new go.Binding 绑定的数据 */
    //     const nodeDataArray = [
    //       { category: "templateName", key: "check", text: "审核" }
    //     ];

    //     // 连接线数据集, 这里为空, 暂不讨论
    //     const linkDataArray = [];

    //     /**
    //      * mySelf.myDiagram.model 决定了页面中呈现哪些元素,
    //      * 我们创建一个普通连线实例 new go.GraphLinksModel 该构造函数接收两个参数,
    //      *  即之前创建的 nodeDataArray 和 linkDataArray
    //      */
    //     mySelf.myDiagram.model = new go.GraphLinksModel(
    //       nodeDataArray,
    //       linkDataArray
    //     );
  }
};
</script>
