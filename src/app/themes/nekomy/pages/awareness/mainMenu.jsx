import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class MainMenu extends Component {

  componentDidMount() {
    const el = document.querySelector('.js-main');
    this.props.setLoading(false);
    el.classList = '';
    el.classList.add('main', 'js-main', 'awareness-page');
  }

  render() {
    return (
      <section className="awareness page static-page">
        <div className="page-wrapper">
          <h1 className="title">Menu Principal</h1>
          <div className="columns single-column">
            <div className="column page-content">
              <ul className="menu-list">
                <li><Link to="/awareness/trivia">Trivia de seguridad</Link></li>
                <li><Link to="/awareness/aprende">Aprende</Link></li>
                <li><Link to="/awareness/busca">Busca el Phishing</Link></li>
                <li><Link to="/awareness/reporta">Reporta una URL</Link></li>
                <li><Link to="/awareness/config">Configuraciones</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = {
  setLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
