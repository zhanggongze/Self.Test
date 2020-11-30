
import React from 'react';
import fetchService from './../http/fetch';
import html2canvas from 'html2canvas';
import wx from 'weixin-js-sdk';
import './pageA.scss';
import environment from './../environments/environments'

class PageA extends React.Component {

  activeIndex = 0;//当前自测项

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      imgBase64: null,
      startGo: false,
      resultGo: false,
      config: null,
      configLoading: false,
      activeIndex: 0,
      btntext: "下一步",
      navigatorApple: false,
      pointTotal: 0
    }

    this.get();
  }

  start() {
    this.setState({
      startGo: true
    });
  }

  next() {
    let { project } = this.state.config;

    let actItem = project[this.activeIndex];

    if (!actItem.point && actItem.point !== 0) {
      alert("请选择" + actItem.name + "!");
      return
    }

    if (this.activeIndex < project.length - 1) {

      this.activeIndex++
      this.setState({ activeIndex: this.activeIndex });

      if (this.activeIndex === project.length - 1) {
        this.setState({ btntext: "提交" });
      }

    } else {

      let { project } = this.state.config;
      let _pointTotal = 0;
      project.map(item => {
        _pointTotal += item.point;
      });

      this.setState({
        resultGo: true,
        pointTotal: _pointTotal
      });
    }
  }

  showImage() {

    wx.previewImage({
      urls: [this.state.imgBase64]
    })
  }

  navigateTo() {

    let url = '/pages/launch/main?targetUrl=%2Fpages%2FaskSpecialist%2Fmain'
    wx.miniProgram.navigateTo({
      url: url
    });

  }

  html2canvas() {

    html2canvas(document.getElementById("share"), { useCORS: true, logging: true }).then((canvas) => {
      document.body.appendChild(canvas);
      let base64url = canvas.toDataURL('image/jpeg', 1.0);
      this.setState({
        imgBase64: base64url
      });
      this.showImage();

    });
  }

  get() {

    let url = environment.FILEBASEURL + "/config.json"
    fetchService.get(
      url,
      {}).then((res) => {

        let user_agent = navigator.userAgent;//获取机型信息

        this.setState({
          config: res,
          configLoading: true,
          navigatorApple: user_agent.indexOf("iPhone") !== -1 ? true : false
        })

      });
  }

  checkReadio(item, _item) {
    item.point = _item.value;
  }

  render() {

    let startGo = this.state.startGo;
    let resultGo = this.state.resultGo;

    let listItems = null;
    let project = null;
    let level = null;
    let description = null;
    let activityName = null;

    if (this.state.config) {

      project = this.state.config.project;
      activityName = this.state.config.activityName;

      listItems = project.map((item, index) => {

        <div>{this.activeIndex}</div>

        if (this.activeIndex === index) {

          return <div className="item" key={index.toString()}>
            <p className="pName">{item.name}</p>
            <div className="radio">
              {
                item.items.map((_item, _index) =>
                  <label key={_index.toString()} onClick={() => this.checkReadio(item, _item)}>
                    <input type="radio" name="rdSpeed" value={_item.value} />&nbsp;&nbsp;{_item.key}
                  </label>
                )
              }
            </div>
          </div>
        }
      });

      level = this.state.config.results.level.map((item, index) => {
        return <p key={index.toString()}>{item.points}%--{item.mean}</p>;
      });

      description = this.state.config.results.description
    }
    //iphone 不能转发朋友圈 可以保存图片
    let btnSaveImg = null;
    if (this.state.navigatorApple) {
      btnSaveImg = <div className="saveImg"> <a onClick={() => this.html2canvas()}>保存图片</a></div>;
    }

    return (
      !this.state.configLoading ? <p className="loading">loading</p> : (
        <div className="App">
          <section className="leadPage" style={{ "backgroundImage": "url(" + environment.FILEBASEURL + "/startbg.png)" }}>
            <div className="start-btn" onClick={() => { this.start() }}>开始评估</div>
          </section>
          <section className={startGo ? "project animate__animated animate__top starttop" : "project animate__animated"}>

            <p className="tip"><b>{this.activeIndex + 1}</b>/{project.length}</p>

            {listItems}

            <div className="btncontent">

              <div className="btn" onClick={() => this.next()}>{this.state.btntext}</div>
            </div>
          </section>

          <section className={resultGo ? "result animate__animated animate__top starttop" : "result animate__animated"} style={{ "backgroundImage": "url(" + environment.FILEBASEURL + "/result_bg.png)" }}>

            <div className="content">
              <p>{this.state.pointTotal}%</p>
              <p>您的风险值</p>
              {level}
              <p>{description}</p>
            </div>

            <div className="active">
              <div className="btn" onClick={() => this.navigateTo()}>去咨询</div>
            </div>
            {btnSaveImg}


          </section>

          <section id="share" className="share" style={{ "backgroundImage": "url(" + environment.FILEBASEURL + "/share_bg.png)" }}>
            <div className="p1">{activityName}10年发病危险度评估</div>
            <div className="content">
              <p>{this.state.pointTotal}%</p>
              <p>您的风险值</p>
              {level}
              <p>{description}</p>
            </div>
          </section>
        </div>
      )
    );
  }
}

export default PageA;
