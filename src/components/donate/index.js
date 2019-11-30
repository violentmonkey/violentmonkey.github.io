import React, { useState } from 'react';
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

export default function Donate() {
  const [active, setActive] = useState(null);
  const handleShowAlipay = () => { setActive(ALIPAY); };
  const handleShowWechat = () => { setActive(WECHAT); };
  return (
    <main>
      <section>
        <h1>Donate</h1>
        <p>
          If you enjoyed surfing the Internet with Violentmonkey, and wanna buy me a coffee,
          please follow one of the links below...
        </p>
        <p>Thanks. 😏</p>
      </section>
      <section>
        <div className="donate">
          <a className="donate-group" href="https://www.paypal.me/gera2ld/5" target="_blank" rel="noopener noreferrer">
            <img src={paypal} />
          </a>
          <a
            className={`donate-group ${active === ALIPAY ? 'active' : ''}`}
            href="#"
            onClick={handleShowAlipay}
          >
            <img src={alipay} />
          </a>
          <a
            className={`donate-group ${active === WECHAT ? 'active' : ''}`}
            href="#"
            onClick={handleShowWechat}
          >
            <img src={wechat} />
          </a>
        </div>
        {active && (
          <div className="donate-image" onClick={() => { setActive(null); }}>
            <img src={qrcodes[active]} />
          </div>
        )}
      </section>
    </main>
  );
}
