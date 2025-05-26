import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class Configuracion extends Component {
  constructor(props) {
    super(props);
    this.state = { dark: false };
    this.toggleDark = this.toggleDark.bind(this);
  }

  componentDidMount() {
    const el = document.querySelector('.js-main');
    this.props.setLoading(false);
    el.classList = '';
    el.classList.add('main', 'js-main', 'awareness-page');
  }

  toggleDark() {
    this.setState(prev => ({ dark: !prev.dark }), () => {
      if (this.state.dark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    });
  }

  render() {
    return (
      <section className="awareness page static-page">
        <div className="page-wrapper">
          <h1 className="title">Configuraciones</h1>
          <div className="columns single-column">
            <div className="column page-content">
              <label className="dark-mode-toggle">
                <input
                  type="checkbox"
                  checked={this.state.dark}
                  onChange={this.toggleDark}
                />
                Modo oscuro
              </label>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { setLoading };
export default connect(mapStateToProps, mapDispatchToProps)(Configuracion);
