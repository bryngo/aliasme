import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPostbyOrgDom } from '../../PostActions';

// Import Selectors
import { getPostbyOrgDom } from '../../PostReducer';

export function RedirectURLPage(props) {
  window.location = props.post.redirectDomain;
  return (
    <div>
      <Helmet title={props._org} />
      <p className={styles['post-desc']}>REQUESTING ORGA: {props._org}</p>
      <p className={styles['post-desc']}>REDIRECT TO: {props.post.redirectDomain}</p>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
RedirectURLPage.need = [params => {
  return fetchPostbyOrgDom(params.org, params.customDomain);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPostbyOrgDom(state, props.params.org, props.params.customDomain),
    _org: props.params.org,
    _customDomain: props.params.customDomain,
  };
}

// these are parameters passed to this component
RedirectURLPage.propTypes = {
  post: PropTypes.shape({
    org: PropTypes.string.isRequired,
    redirectDomain: PropTypes.string.isRequired,
    customDomain: PropTypes.string.isRequired,
    customURL: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  _org: PropTypes.string.isRequired,
  _customDomain: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(RedirectURLPage);
