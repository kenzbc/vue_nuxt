<template>
  <div class="rank-list" :class="[type, {'scroll': scrollTop > 0}]">
    <div class="top">
      <div class="title">{{title}}</div>
      <div class="user left" >
        <svg class="icon rank-icon" aria-hidden="true"><use xlink:href="#icon-NO-"></use></svg>
        <img class="avatar" :src="topList[2].avatar || '/static/images/tx_pic.jpg'" />
        <div class="nickname">{{topList[2].nickname}}</div>
        <div class="fruit">
          <svg class="icon icon-guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
          {{topList[2].profit}}
        </div>
        <div class="percentage">中奖率：{{topList[2].win_num}}</div>
      </div>
      <div class="user mid">
        <svg class="icon rank-icon" aria-hidden="true"><use xlink:href="#icon-NO-2"></use></svg>
        <img class="avatar" :src="topList[0].avatar || '/static/images/tx_pic.jpg'" />
        <div class="nickname">{{topList[0].nickname}}</div>
        <div class="fruit">
          <svg class="icon icon-guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
          {{topList[0].profit}}
        </div>
        <div class="percentage">中奖率：{{topList[0].win_num}}</div>
      </div>
      <div class="user right">
        <svg class="icon rank-icon" aria-hidden="true"><use xlink:href="#icon-NO-1"></use></svg>
        <img class="avatar" :src="topList[1].avatar || '/static/images/tx_pic.jpg'" />
        <div class="nickname">{{topList[1].nickname}}</div>
        <div class="fruit">
          <svg class="icon icon-guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
          {{topList[1].profit}}
        </div>
        <div class="percentage">中奖率：{{topList[1].win_num}}</div>
      </div>
    </div>
    <div class="list">
      <div class="head">
        <div class="col">排名</div>
        <div class="col user">用户</div>
        <div class="col">收益</div>
        <div class="col">中奖率</div>
      </div>
      <div class="body">
        <div class="scrollbar">
          <div class="row" v-if="data.list.length && index > 2" v-for="(item,index) in data.list" :key="index">
            <div class="col index">{{item.position}}</div>
            <div class="col user"><img :src="item.avatar || '/static/images/tx_pic.jpg'" /><span :title="item.nickname">{{item.nickname}}</span></div>
            <div class="col fruit">{{item.profit}}<svg class="icon icon-guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>
            <div class="col percentage">{{item.win_num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="remark" v-if="data.update">{{data.update}}（{{data.period}}）</div>
  </div>
</template>

<script>

  export default {
    name: "rank-list",
    props: {
      title: {
        title: String,
        required: true
      },
      type: {
        title: String,
        required: true
      },
      data: {
        type: Object,
        default: function () {
          return {
            // me: {},
            list: []
          }
        }
      },
      // loading: {
      //   type: Boolean,
      //   default: false
      // }
    },
    computed: {
      topList () {
        let list = []
        for (let i = 0;i < 3;i++) {
          list.push(this.data.list[i] || {
            avatar: '/static/images/tx_pic.jpg',
            nickname: '',
            profit: '-',
            win_num: '-'
          })
        }
        return list
      }
    },
    data () {
      return {
        scrollSettings: {

        },
        scrollTop: 0,
        scrollTimeout: null
      }
    },
    methods: {
      scrollEvent (event) {
        let _this = this
        if (this.scrollTimeout) return
        this.scrollTimeout = setTimeout(function () {
          _this.scrollTop = event.target.scrollTop
          _this.scrollTimeout = null
        },50)
      }
    },
    mounted(){
      const target = this.$el.querySelector('.scrollbar');
      target.addEventListener('scroll', this.scrollEvent, true)  // 监听（绑定）滚轮滚动事件
    },
  }
</script>

<style lang="stylus" scoped>
  .rank-list {
    width 392px
    border-top-right-radius 6px
    border-top-left-radius 6px
    overflow hidden

    &.scroll {
      .top {
        height 150px

        .user,.user.mid {
          bottom 15px
          .nickname {
            display none
          }
          .avatar {
            width 30px
            height 30px
            border 2px solid #fff
          }
          .icon.rank-icon {
            width 24px
            height 24px
            font-size 1em
            left 38px
            top -15px
          }
        }
      }

      .list {
        .body {
          .scrollbar {
            height 580px
            overflow-y scroll
            position relative
          }
        }
      }
    }

    .top {
      height 310px
      border-radius 2px 2px 0 0
      background-size cover
      background-position center
      position relative
      transition-duration .3s

      .title {
        padding-top 15px
        text-align center
        font-size 16px
        color #fff
        font-weight bold
      }

      .user {
        position absolute
        bottom 30px
        width 100px
        text-align center
        color #fff
        transition-duration .3s

        .avatar {
          width 68px
          height 68px
          background: #fff;
          box-shadow: 0 3px 6px 0 rgba(0,47,79,0.30);
          border 3px solid #fff
          border-radius 50%
          transition-duration .3s
        }

        .nickname {
          margin-top 10px
          height 20px
          line-height 20px
          font-size 14px
          font-weight bold
          text-overflow ellipsis
          white-space nowrap
          color #fff
          overflow hidden
          opacity 1
        }

        .fruit {
          height 16px
          line-height 16px
          margin-top 10px
          font-size 13px
          font-family: TradeGothicLT
          font-weight bold

          .icon {
            margin-right 3px
          }
        }

        .percentage {
          height 16px
          line-height 16px
          font-size 12px
          margin-top 4px
        }

        .icon.rank-icon {
          position absolute
          width 30px
          font-size 1.2em
          height 30px
          top -17px
          left 35px
          transition-duration .3s
        }

        &.left {
          left 20px
        }

        &.right {
          right 20px
        }

        &.mid {
          left 50%
          margin-left -50px
          bottom 55px

          .avatar {
            width 88px
            height 88px
          }
        }

      }
    }

    &.blue {
      .top {
        background-image url('/static/images/bet/bg-blue.png')
      }
      .list {
        /*border 1px solid rgba(11, 132, 224, 0.3)*/
        .body {
          > .row {
            background #F7FBFF
            /*border-top 1px solid #A8D8FF
            border-bottom 1px solid #A8D8FF
            box-shadow 0 1px 4px 0 rgba(3,17,27,0.12)*/
            .col.index,.col.user {
              /*color #0C9DFC*/
            }
          }
        }
      }
    }
    &.violet {
      .top {
        background-image url('/static/images/bet/bg-violet.png')
      }
      .list {
       /* border 1px solid rgba(89, 112, 194, 0.3)*/
        .body {
          > .row {
            /*border-top 1px solid #A9AEFF
            border-bottom 1px solid #A9AEFF*/
            .col.index,.col.user {
              /*color #6263CB*/
            }
          }
        }
      }
    }
    &.red {
      .top {
        background-image url('/static/images/bet/bg-red.png')
      }
      .list {
        /*border 1px solid rgba(207, 76, 55, 0.3)*/
        .body {
          > .row {
            /*border-top 1px solid #FFB6B0*/
            /*border-bottom 1px solid #FFB6B0*/
            .col.index,.col.user {
              /*color #ED362E*/
            }
          }
        }
      }
    }

    .list {
      background-color #fff
      border-top none !important

      .col {
        float left
        height 30px
        line-height 30px
        text-align center

        colWidths = 16% 40% 20% 20%
        for colWidth, col in colWidths {
          &:nth-of-type({col + 1}) {
            width colWidth
          }
        }

        &.user {
          text-align left
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        }

        &.fruit {
          font-family: TradeGothicLT
          /*font-weight bold*/
          font-size: 13px;
          text-align right
          padding-right 10px

          color: #FFA646

          .icon {
            margin-left 7px
          }
        }

        &.percentage {
          opacity: 0.96;
          font-family: TradeGothicLT
          /*font-weight bold*/
          font-size: 13px;
          color: #0C9DFC;
          letter-spacing: 0;
        }
      }

      .head {
        height 30px
        font-weight bold
        font-size 13px
        border-bottom 1px solid #e7edf1

        .col.user {
          padding-left 51px
        }
      }

      .body {
        font-size 13px
        color #333

        > .row {
          background #F7FBFF
          /*box-shadow 0 1px 4px 0 rgba(3,17,27,0.12)*/
          .col.index,.col.user {
            /*font-weight bold*/
          }
        }

        .scrollbar {
          height 420px
          overflow-y scroll
          transition-duration .3s
        }

        .row {
          height 60px

          + .row {
            border-top: 1px solid #e7edf1;
          }

          .col {
            height 60px
            line-height 60px
          }

          &:nth-child(even) {
            background-color #FAFBFD
          }

          img {
            width 40px
            height 40px
            border-radius 50%
            display inline-block
            vertical-align middle
            margin-right 11px
            border 1px solid #ccc
          }

        }

      }
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px){
    .rank-list {
      width calc((100% - 24px)/3)

    }
  }

  @media screen and (max-width: 768px) {
    .rank-list {
      width 100%
    }
  }
</style>
