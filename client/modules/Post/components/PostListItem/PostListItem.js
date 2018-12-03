import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

function PostListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`} >
          {props.post.org}
        </Link>
      </h3>

      <p className={styles['post-desc']}>Organization: {props.post.org}</p>
      <p className={styles['post-desc']}>Redirect Domain: {props.post.redirectDomain}</p>
      <p className={styles['post-desc']}>Custom Domain: {props.post.customDomain}</p>
      <p className={styles['post-desc']}>Custom URL: {props.post.customURL}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a></p>

      <hr className={styles.divider} />
    </div>
  );
}

// these are parameters passed to this component
PostListItem.propTypes = {
  post: PropTypes.shape({
    org: PropTypes.string.isRequired,
    redirectDomain: PropTypes.string.isRequired,
    customDomain: PropTypes.string.isRequired,
    customURL: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
