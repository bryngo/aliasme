import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

export function PostDetailPage(props) {
  return (
    <div>
      <Helmet title={props.post.org} />
      <p className={styles['post-desc']}>Organization: {props.post.org}</p>
      <p className={styles['post-desc']}>Redirect Domain: {props.post.redirectDomain}</p>
      <p className={styles['post-desc']}>Custom Domain: {props.post.customDomain}</p>
      <p className={styles['post-desc']}>Custom URL: {props.post.customURL}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    paramCuid: props.params.cuid,
  };
}

// these are parameters passed to this component
PostDetailPage.propTypes = {
  post: PropTypes.shape({
    org: PropTypes.string.isRequired,
    redirectDomain: PropTypes.string.isRequired,
    customDomain: PropTypes.string.isRequired,
    customURL: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  paramCuid: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
