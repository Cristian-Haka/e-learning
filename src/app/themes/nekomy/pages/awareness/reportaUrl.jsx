import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class ReportaUrl extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const el = document.querySelector('.js-main');
    this.props.setLoading(false);
    el.classList = '';
    el.classList.add('main', 'js-main', 'awareness-page');
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    alert(`URL enviada: ${this.state.url}`); // simple feedback
    this.setState({ url: '' });
  }

  render() {
    return (
      <section className="awareness page static-page">
        <div className="page-wrapper">
          <h1 className="title">Reporta una URL</h1>
          <div className="columns single-column">
            <div className="column page-content">
              <form onSubmit={this.handleSubmit} className="report-form">
                <input
                  type="text"
                  value={this.state.url}
                  onChange={this.handleChange}
                  placeholder="https://"
                />
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { setLoading };
export default connect(mapStateToProps, mapDispatchToProps)(ReportaUrl);
