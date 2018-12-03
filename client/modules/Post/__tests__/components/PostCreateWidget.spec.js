import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { PostCreateWidget } from '../../components/PostCreateWidget/PostCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addPost: () => {},
  showAddPost: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PostCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewPost" />));
  t.is(wrapper.find('input').length, 3);
});

test('hide when showAddPost is false', t => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  wrapper.setProps({ showAddPost: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PostCreateWidget {...props} />
  );

  t.is(wrapper.prop('addPost'), props.addPost);
  t.is(wrapper.prop('showAddPost'), props.showAddPost);
});

test('calls addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.ref('org').value = 'DCSC';
  wrapper.ref('redirectDomain').value = 'https://bryngo.me/';
  wrapper.ref('customDomain').value = 'bryan';

  wrapper.find('a').first().simulate('click');
  t.truthy(addPost.calledOnce);
  t.truthy(addPost.calledWith('DCSC', 'https://bryngo.me/', 'bryan'));
});

test('empty form doesn\'t call addPost', t => {
  const addPost = sinon.spy();
  const wrapper = mountWithIntl(
    <PostCreateWidget addPost={addPost} showAddPost />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addPost.called);
});
