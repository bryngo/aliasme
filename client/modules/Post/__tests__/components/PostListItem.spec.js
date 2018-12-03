import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import PostListItem from '../../components/PostListItem/PostListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';


const post = { org: 'DCSC', redirectDomain: 'https://bryngo.me/', customDomain: 'bryan', customURL: 'http://localhost:8000/DCSC/bryan', cuid: 'cikqgkv4q01ck7453ualdn3hd' };
const props = {
  post,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <PostListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-post'));
  t.is(wrapper.find('Link').first().prop('children'), post.org);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <PostListItem {...props} />
  );

  t.deepEqual(wrapper.prop('post'), props.post);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <PostListItem post={post} onDelete={onDelete} />
  );

  wrapper.find('.post-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
