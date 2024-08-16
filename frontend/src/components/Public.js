import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
  const content = (
    <section className="public">
        <header>
            <h1>
                Welcome to <span className="nowrap">ArmanRuhit Repairs</span>
            </h1>
        </header>
        <main className="public_main">
            <p>Located in Beautiful Downtown Foo City, ArmanRuht Repairs provides a trained staff ready to meet your tech repair needs.</p>
            <address className="public__addr">
                ArmanRuhit Repairs<br />
                Dhaka<br />
                Bagladesh<br />
                <a href="tel:+8801222222222">+8801222222222</a>
            </address>
            <br/>
            <p>Owner: Ruhit Arman</p>
        </main>
        <footer>
            <Link to="/login">Employee Login</Link>
        </footer>
    </section>
  );
  return content;
}

export default Public