import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class BuscaMenu extends Component {
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
          <h1 className="title">Busca el Phishing</h1>
          <div className="columns single-column">
            <div className="column page-content">
              <ul className="menu-list">
                <li><Link to="/awareness/busca/1">Ejercicio 1</Link></li>
                <li><Link to="/awareness/busca/2">Ejercicio 2</Link></li>
                <li><Link to="/awareness/busca/3">Ejercicio 3</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { setLoading };
export default connect(mapStateToProps, mapDispatchToProps)(BuscaMenu);
