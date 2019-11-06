import React from 'react';
import paypal from './assets/paypal.svg';
import alipay from './assets/alipay.svg';
import wechat from './assets/wechat.svg';
import qrAlipay from './assets/qr_alipay.png';
import qrWechat from './assets/qr_wechat.png';
import './style.css';

const ALIPAY = 'ap';
const WECHAT = 'we';
const qrcodes = {
  [ALIPAY]: qrAlipay,
  [WECHAT]: qrWechat,
};

export default class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
    };
  }

  handleShowAlipay = () => {
    this.setState({ active: ALIPAY });
  }

  handleShowWechat = () => {
    this.setState({ active: WECHAT });
  }

  render() {
    const { active } = this.state;
    return (
      <main>
        <h1>Donate</h1>
        <p>
          If you enjoyed surfing the Internet with Violentmonkey, and wanna buy me a coffee,
          please follow one of the links below...
        </p>
        <p>Thanks. 😏</p>
        <div className="donate">
          <a className="donate-group" href="https://www.paypal.me/gera2ld/5" target="_blank" rel="noopener noreferrer">
            <img src={paypal} />
          </a>
          <a
            className={`donate-group ${active === ALIPAY ? 'active' : ''}`}
            href="#"
            onClick={this.handleShowAlipay}
          >
            <img src={alipay} />
          </a>
          <a
            className={`donate-group ${active === WECHAT ? 'active' : ''}`}
            href="#"
            onClick={this.handleShowWechat}
          >
            <img src={wechat} />
          </a>
        </div>
        {active && (
          <div className="donate-image" onClick={() => { this.setState({ active: null }); }}>
            <img src={qrcodes[active]} />
          </div>
        )}
      </main>
    );
  }
}
