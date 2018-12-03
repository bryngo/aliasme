import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostCreateWidget.css';

export class PostCreateWidget extends Component {
  addPost = () => {
    const orgRef = this.refs.org;
    const redirectDomainRef = this.refs.redirectDomain;
    const customDomainRef = this.refs.customDomain;
    const customURL = `${window.location.hostname}:8000/${orgRef.value}/${customDomainRef.value}`;

    if (orgRef.value && redirectDomainRef.value && customDomainRef.value) {
      this.props.addPost(orgRef.value, redirectDomainRef.value, customDomainRef.value, customURL);
      orgRef.value = redirectDomainRef.value = customDomainRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.org} className={styles['form-field']} ref="org" />
          <input placeholder={this.props.intl.messages.redirectDomain} className={styles['form-field']} ref="redirectDomain" />
          <input placeholder={this.props.intl.messages.customDomain} className={styles['form-field']} ref="customDomain" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCreateWidget);
