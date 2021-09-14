import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchSinglePost, searchByName } from '../../actions/posts';
import AddPosts from './addPosts';
import M from 'materialize-css/dist/js/materialize.min.js';
import $ from 'jquery';

class WordList extends React.Component {
  state = { search: '' };
  componentDidMount() {
    this.props.fetchPosts();
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});

    $('.search').on('click', function () {
      $('.show').fadeToggle(100);
      $('.times').slideToggle(0);
      $('.fa-search').slideToggle(0);
    });
  }

  renderListItems() {
    if (this.props.posts.length === 0) {
      return (
        <div className='loadingio-spinner-eclipse-eczlyem2fg'>
          <div className='ldio-tetx6q21b6'>
            <div></div>
          </div>
        </div>
      );
    } else {
      return this.props.posts.map(post => {
        return (
          <li
            className='collection-item grey lighten-4 waves-effect waves-grey modal-trigger'
            href='#modal1'
            onClick={() => this.props.fetchSinglePost(post.searchTerm)}
            key={post._id}
            style={{ width: '100%' }}
          >
            <h6 style={{ textTransform: 'capitalize' }}>
              <b>{post.searchTerm}</b>
            </h6>
            <span>
              <span>({post.speech}) </span>
              {post.definitions[0]}
            </span>
          </li>
        );
      });
    }
  }

  renderDef() {
    if (this.props.post.length === 0) {
      return null;
    } else {
      return this.props.post.definitions.map(def => (
        <li key={def}>
          <b>{def}</b>
        </li>
      ));
    }
  }

  renderShortDef() {
    if (this.props.post.length === 0) {
      return null;
    } else {
      return this.props.post.shortDef.map(def => (
        <li key={def}>
          <b>{def}</b>
        </li>
      ));
    }
  }
  render() {
    console.log(this.props.posts);
    return (
      <div>
        {/* Navbar starts here */}
        <div className=' navbar-fixed'>
          <nav className='pink darken-4'>
            <div className='container'>
              <a href='#' className='brand-logo left'>
                Vocab
              </a>
              <ul className='right'>
                <li>
                  <input
                    type='text'
                    className='show'
                    required
                    autoComplete='off'
                    value={this.state.search}
                    onChange={e => {
                      this.setState({ search: e.target.value });
                      this.props.searchByName(e.target.value);
                    }}
                    placeholder='Search Here...'
                  />
                </li>
                <li className='search'>
                  <a>
                    <i className='fas fa-search'></i>
                  </a>
                  <a>
                    <i className='fas fa-times times'></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {/* Navbar ends here */}

        <div>
          <div className='background'>
            <div className='word'>
              <h6>
                <b>Words List</b>
              </h6>
            </div>
          </div>
          <ul style={{ transform: 'translateY(-0.5%)' }} className='collection'>
            {this.renderListItems()}
          </ul>

          <AddPosts />

          {/* Modal content comes here */}
          <div className='modal' id='modal1'>
            <div className='modal-content'>
              <span className='modal-close right'>
                <i className='fas fa-2x fa-times right-align'></i>
              </span>
              <h6 style={{ textTransform: 'capitalize' }}>
                <b>{this.props.post.searchTerm}</b>
              </h6>
              <div className='divider'></div>
              <span>{this.props.post.language} </span>
              <i> {this.props.post.speech}</i>
              <div>
                <h6>Definitions</h6>
                <b>{this.renderDef()}</b>
              </div>
              <p>{this.props.post.pronunciations}</p>
              <div>
                <h6>Short Definitions</h6>
                {this.renderShortDef()}
              </div>
            </div>
          </div>
          {/* Modal content ends here. */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // Receiving the data from the reducers.
  return {
    posts: state.posts,
    post: state.post,
  };
};

export default connect(mapStateToProps, { fetchPosts, fetchSinglePost, searchByName })(WordList);
