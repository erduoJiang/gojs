<template>
  <div id="mountNode"></div>
</template>
<script>
import G6 from "@antv/g6";
export default {
  //  this.$http({
  //   method: 'post',
  //   url: '/user',
  //   data: {
  //     name: 'xiaoming',
  //     info: '12'
  //   }
  data() {
    return {
      initData: {
        // 点集
        nodes: [
          {
            id: "node1", // 节点的唯一标识
            x: 100, // 节点横坐标
            y: 200, // 节点纵坐标
            label: "起始点" // 节点文本
          },
          {
            id: "node2",
            x: 300,
            y: 200,
            label: "目标点"
          }
        ],
        // 边集
        edges: [
          // 表示一条从 node1 节点连接到 node2 节点的边
          {
            source: "node1", // 起始点 id
            target: "node2", // 目标点 id
            label: "我是连线" // 边的文本
          }
        ]
      }
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    async getDatas() {
      const response = await this.$http({
        method: "get",
        url:
          "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
        //   "https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json"
      });
      console.log("热，", response);
      console.log("JSONNN，", response.data);
      this.initData = response.data;
      this.initData.edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
        // 移到此处
        edge.style.opacity = 0.6;
        edge.style.stroke = "grey";
      });
      this.initData.nodes.forEach(node => {
        if (!node.style) {
          node.style = {};
        }
        switch (
          node.class // 根据节点数据中的 class 属性配置图形
        ) {
          case "c0": {
            node.type = "circle"; // class = 'c0' 时节点图形为 circle
            break;
          }
          case "c1": {
            node.type = "rect"; // class = 'c1' 时节点图形为 rect
            // node.size = [35, 20]; // class = 'c1' 时节点大小
            break;
          }
          case "c2": {
            node.type = "ellipse"; // class = 'c2' 时节点图形为 ellipse
            // node.size = [35, 20]; // class = 'c2' 时节点大小
            break;
          }
        }
      });

      const graph = new G6.Graph({
        container: "mountNode", // 指定挂载容器
        width: 800, // 图的宽度
        height: 800, // 图的高度
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"]
        },
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: 200 // 指定边距离为100
        },
        defaultNode: {
          size: 30,
          style: {
            fill: "green",
            stroke: "red",
            lineWidth: 4
          },
          labelCfg: {
            style: {
              fontSize: 14,
              fill: "#fff"
            }
          }
        },
        defaultEdge: {
          //   style: {
          //     stroke: "green",
          //     opacity: 0.6
          //   },
          labelCfg: {
            autoRotate: true,
            style: {
              fontSize: 14
            }
          }
        }
      });
      graph.data(this.initData); // 加载数据
      graph.render(); // 渲染
    }
  }
};
</script>
