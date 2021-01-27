<template>
  <div id="wrap">
    <div style="textAlign:right">
      <a-button type="primary" @click="save">保存</a-button>
      <button @click="toogleBg">切换背景网格</button>
    </div>
    <div id="chart-wrap">
      <div class="sideBar">
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="基本元件">
            <div id="chart-palette"></div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="水电元件">
            <div id="chart-two"></div>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="高级元件">
            <div id="chart-three"></div>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <div id="chart-diagram"></div>
      <div id="chart-desc"></div>
    </div>
    <!-- <button @click="onSubmit"></button> -->
  </div>
</template>

<script>
// @ is an alias to /src
import go from "gojs";
import initTemplateMap from "../util/initTemplateMap";
const MAKE = go.GraphObject.make;
const dataArr = [
  {
    name: "Next",
    imgUrl: require("../assets/images/4.png")
  },
  {
    name: "Next2",
    imgUrl: require("../assets/images/1.png")
  },
  {
    name: "Next3",
    imgUrl: require("../assets/images/2.png")
  },
  {
    name: "Next4",
    imgUrl: require("../assets/images/3.png")
  },
  {
    name: "Next5",
    imgUrl: require("../assets/images/5.png")
  },
  {
    name: "Next6",
    imgUrl: require("../assets/images/6.png")
  },
  {
    name: "Next7",
    imgUrl: require("../assets/images/7.png")
  },
  {
    name: "Next2-1",
    imgUrl: require("../assets/images/2-1.png")
  },
  {
    name: "Next2-2",
    imgUrl: require("../assets/images/2-2.png")
  },
  {
    name: "Next2-3",
    imgUrl: require("../assets/images/2-3.png")
  },
  {
    name: "Next2-4",
    imgUrl: require("../assets/images/2-4.png")
  },
  {
    name: "Next2-5",
    imgUrl: require("../assets/images/2-5.png")
  },
  {
    name: "Next2-6",
    imgUrl: require("../assets/images/2-6.png")
  },
  {
    name: "Next2-7",
    imgUrl: require("../assets/images/2-7.png")
  },
  {
    name: "Next2-8",
    imgUrl: require("../assets/images/2-8.png")
  },
  {
    name: "Next2-9",
    imgUrl: require("../assets/images/2-9.png")
  },
  {
    name: "Next3-1",
    imgUrl: require("../assets/images/3-1.png")
  },
  {
    name: "Next3-2",
    imgUrl: require("../assets/images/3-2.png")
  }
];
export default {
  name: "Home",
  data() {
    return {
      showBg: true,
      activeKey: ["1", "2", "3"]
    };
  },
  mounted() {
    var mySelf = this;
    mySelf.myDiagram = MAKE(go.Diagram, "chart-diagram", {
      // initialContentAlignment: go.Spot.Center, // 居中显示
      "undoManager.isEnabled": true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      "toolManager.hoverDelay": 100, //tooltip提示显示延时
      "toolManager.toolTipDuration": 10000, //tooltip持续显示时间
      //isReadOnly:true,//只读
      "grid.visible": this.showBg, //显示网格
      // "grid.visible": true, //显示网格
      allowMove: true, //允许拖动
      // allowDragOut:true,
      allowDelete: true,
      allowCopy: true,
      allowClipboard: true,
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom //有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
      // layout: MAKE(go.TreeLayout, {
      //   angle: 0,
      //   layerSpacing: 35
      // })
    }); //构建gojs对象
    console.log(mySelf.myDiagram);
    mySelf.myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
      // debugger;
      console.log(e.subject.part);
    });

    mySelf.myDiagram.addDiagramListener("BackgroundSingleClicked", function(e) {
      // debugger;
      console.log("Double-clicked at" + e.diagram.lastInput.documentPoint);
    });

    mySelf.myDiagram.addDiagramListener("ClipboardPasted", function(e) {
      // debugger;
      console.log("Pasted" + e.diagram.selection.count + "parts");
    });

    mySelf.myDiagram.linkTemplate = MAKE(
      go.Link,
      {
        // curve: go.Link.Bezier
      }, // 贝塞尔曲线
      {
        // routing: go.Link.Orthogonal,
        routing: go.Link.AvoidsNodes,
        corner: 15
      },
      MAKE(
        go.Shape,
        {
          strokeWidth: 2,
          // stroke: "#F60"
          stroke: "green"
        },
        new go.Binding("stroke", "linkColor")
      ),
      MAKE(go.Shape, {
        toArrow: "Standard",
        // toArrow: "OpenTriangle",
        fill: "red",
        stroke: "blue"
      }), //箭头
      MAKE(
        go.TextBlock,
        {
          margin: 20,
          stroke: "yellow",
          font: "14px sans-serif",
          width: 50,
          text: "中国梦",
          wrap: go.TextBlock.WrapDesiredSize
        },
        new go.Binding("text", "linktext")
      ),
      {
        toolTip: MAKE(
          go.Adornment,
          "Auto",
          MAKE(go.Shape, {
            fill: "#FFFFCC"
          }),
          MAKE(
            go.TextBlock,
            {
              margin: 4,
              text: "克莱"
            },
            new go.Binding("text", "name1")
          )
        ) // end of Adornment
      }
    );
    let myModel = MAKE(go.GraphLinksModel); //也可以创建link model;需要配置myModel.linkDataArray 如下
    myModel.nodeDataArray = [];
    myModel.linkDataArray = [];

    // var lightText = "whitesmoke";
    initTemplateMap(dataArr, mySelf, MAKE, go, makePort);
    // mySelf.myDiagram.nodeTemplateMap.add(
    //   "Next",
    //   MAKE(
    //     go.Node,
    //     "Spot",
    //     // nodeStyle(),
    //     // 记录保存时候的位置信息
    //     new go.Binding("location", "loc").makeTwoWay(),
    //     MAKE(
    //       //声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
    //       go.Panel, //表明需要创建一个panel面板对象
    //       "Auto", //页面布局为自动

    //       // MAKE(
    //       //   //声明构建一个圆角矩形
    //       //   go.Shape,
    //       //   "RoundedRectangle",
    //       //   {
    //       //     fill: "#44CCFF",
    //       //     stroke: "#FFF",
    //       //     strokeWidth: 1,
    //       //     angle: 0
    //       //   },
    //       //   new go.Binding("figure", "figure") //声明并创建一个新的图形
    //       // ),
    //       // MAKE(
    //       //   //声明一个可编辑文本域
    //       //   go.TextBlock,
    //       //   {
    //       //     font: "12pt Helvetica, Arial, sans-serif",
    //       //     stroke: lightText,
    //       //     width: 125,
    //       //     maxSize: new go.Size(360, NaN),
    //       //     wrap: go.TextBlock.WrapFit, //文本域换行
    //       //     editable: true, //是否可编辑
    //       //     margin: 12,
    //       //     // eslint-disable-next-line no-dupe-keys
    //       //     wrap: go.TextBlock.WrapDesiredSize
    //       //   },
    //       //   new go.Binding("text").makeTwoWay()
    //       // )

    //       // 背景图片与图标
    //       MAKE(
    //         go.Panel,
    //         go.Panel.Auto,
    //         // { position: new go.Point(0, 72) },
    //         // MAKE(
    //         //   go.Picture,
    //         //   {
    //         //     width: 128,
    //         //     height: 118,
    //         //     source: require("../assets/images/circle_1.png")
    //         //   }
    //         //   // new go.Binding("source", "bgSrc")
    //         // ),
    //         MAKE(
    //           go.Picture,
    //           {
    //             width: 32,
    //             height: 32,
    //             source: require("../assets/images/icon-apply.png")
    //           }
    //           // new go.Binding("source", "iconSrc")
    //         )
    //         // MAKE(
    //         //   go.TextBlock,
    //         //   {
    //         //     margin: 4,
    //         //     stroke: "yellow",
    //         //     font: "14px sans-serif"
    //         //   },
    //         //   new go.Binding("text", "text")
    //         // )
    //       )
    //     ),
    //     // four named ports, one on each side:
    //     makePort("T", go.Spot.Top, false, true),
    //     makePort("L", go.Spot.Left, true, true),
    //     makePort("R", go.Spot.Right, true, true),
    //     makePort("B", go.Spot.Bottom, true, false)
    //   )
    // );

    //Node连接线
    function makePort(name, spot, output, input) {
      return MAKE(go.Shape, "Circle", {
        fill: "transparent",
        stroke: null, // this is changed to "white" in the showPorts function
        desiredSize: new go.Size(10, 10),
        alignment: spot,
        alignmentFocus: spot, // align the port on the main Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: "pointer" // show a different cursor to indicate potential link point
      });
    }
    mySelf.myDiagram.model = myModel;
    mySelf.init();
  },
  methods: {
    onSubmit() {},
    init() {
      var mySelf = this;
      window.myTwo = MAKE(
        go.Palette,
        "chart-two", // must name or refer to the DIV HTML element
        {
          scrollsPageOnFocus: false,
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            // specify the contents of the Palette
            {
              category: "Next2-1",
              text: "",
              loc: ""
            },
            {
              category: "Next2-2",
              text: "",
              loc: ""
            },
            {
              category: "Next2-3",
              text: "开关22",
              loc: ""
            },
            {
              category: "Next2-4",
              text: "",
              loc: ""
            },
            {
              category: "Next2-5",
              text: "",
              loc: ""
            },
            {
              category: "Next2-6",
              text: "",
              loc: ""
            },
            {
              category: "Next2-7",
              text: "",
              loc: ""
            },
            {
              category: "Next2-8",
              text: "",
              loc: ""
            },
            {
              category: "Next2-9",
              text: "",
              loc: ""
            }
          ])
        }
      );
      window.myThree = MAKE(
        go.Palette,
        "chart-three", // must name or refer to the DIV HTML element
        {
          scrollsPageOnFocus: false,
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            // specify the contents of the Palette
            {
              category: "Next3-1",
              text: "",
              loc: ""
            },
            {
              category: "Next3-2",
              text: "",
              loc: ""
            }
          ])
        }
      );
      window.myPalette = MAKE(
        go.Palette,
        "chart-palette", // must name or refer to the DIV HTML element
        {
          scrollsPageOnFocus: false,
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            // specify the contents of the Palette
            {
              category: "Next",
              text: "阀门",
              loc: ""
            },
            {
              category: "Next4",
              text: "你",
              loc: ""
            },
            {
              category: "Next2",
              text: "",
              loc: ""
            },
            {
              category: "Next5",
              text: "",
              loc: ""
            },
            {
              category: "Next6",
              text: "",
              loc: ""
            },
            {
              category: "Next7",
              text: "",
              loc: ""
            },
            {
              category: "Next3",
              text: "开关22",
              loc: ""
            }
          ])
        }
      );

      this.load();
    },
    load() {
      const dataJson = sessionStorage.getItem("goData");
      if (dataJson) {
        console.log("看下数据：", dataJson);
        console.log("看下go：", go);
        this.myDiagram.model = go.Model.fromJson(dataJson);
      } else {
        console.log("缓存没数据");
      }
    },
    save() {
      console.log("保存数据", this.myDiagram.model.toJson());
      const jsonResult = this.myDiagram.model.toJson();
      sessionStorage.setItem("goData", jsonResult);
    },
    toogleBg() {
      // 切换背景
      this.showBg = !this.showBg;
      this.myDiagram.grid.visible = this.showBg;
    }
  }
};
</script>
<style lang="less" scoped>
#form-wrap {
  padding: 20px 40px;
  // background-color: white;
  border: solid 1px rgb(244, 244, 244);
}

#submit {
  width: 102px;
  height: 40px;
  float: right;
  margin: 20px 5px 16px 0;
}

#chart-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;

  .sideBar {
    width: 200px;
    margin-right: 10px;
    // border: solid 3px rgb(238, 7, 7);
    #chart-palette {
      height: 200px;
    }
    #chart-two {
      height: 200px;
    }
    #chart-three {
      height: 200px;
    }
  }

  #chart-diagram {
    flex-grow: 1;
    height: 720px;
    background-color: #000;
    border: solid 1px rgb(244, 244, 244);
  }

  #chart-desc {
    width: 180px;
    margin-right: 10px;
    background-color: gray;
    border: solid 1px rgb(244, 244, 244);
  }
}

#lateEntry {
  clear: both;
  background-color: rgb(255, 255, 255);
  border: solid 1px rgb(244, 244, 244);

  > span {
    display: inline-block;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-indent: 30px;
    letter-spacing: 0.8px;
    text-align: left;
    color: rgb(35, 35, 35);
    // border-bottom: 1px solid rgb(234, 234, 234);
  }
}
</style>
