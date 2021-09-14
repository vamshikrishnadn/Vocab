import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts';

class AddPosts extends Component {
  state = { word: '' };
  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }
  onSubmit(e) {
    e.preventDefault();
    // Adding the word onsubmit
    this.props.addPost(this.state.word);
    this.setState({ word: '' });
  }

  renderClass() {
    return !this.state.word ? '' : 'modal-close';
  }

  render() {
    return (
      <div>
        <div className='fixed-action-btn '>
          <a href='#modal' className='modal-trigger btn-floating btn-large'>
            <i className='fas fa-plus pink  darken-4'></i>
          </a>
        </div>
        <div id='modal' className='modal'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='modal-content'>
              <h5>Add To Dictionary</h5>
              <div className='input-field '>
                <input
                  id='word'
                  type='text'
                  required
                  autoComplete='off'
                  value={this.state.word}
                  onChange={e => this.setState({ word: e.target.value })}
                />
                <label htmlFor='word'>New Word</label>
              </div>
            </div>
            <div className='modal-footer'>
              <a href='#!' className='modal-close waves-effect waves-grey btn-flat'>
                Cancel
              </a>
              <button
                type='submit'
                className={`waves-effect waves-grey btn-flat ${this.renderClass()}`}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { addPost })(AddPosts);
